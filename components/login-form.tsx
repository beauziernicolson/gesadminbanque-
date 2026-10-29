"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [factorId, setFactorId] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [stage, setStage] = useState<"credentials" | "mfa">("credentials");

  async function submitCredentials(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const supabase = createClient();
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (loginError) throw new Error("Identifiants non reconnus.");

      const { data: aal, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aalError) throw new Error("Le niveau de sécurité n’a pas pu être confirmé.");
      if (aal.currentLevel === "aal2") {
        router.replace("/admin/vue-generale");
        router.refresh();
        return;
      }

      const { data: factors, error: factorError } = await supabase.auth.mfa.listFactors();
      if (factorError) throw new Error("Les facteurs de sécurité n’ont pas pu être vérifiés.");
      const totp = factors.totp.find((factor) => factor.status === "verified");
      if (!totp) throw new Error("Aucun facteur MFA TOTP vérifié n’est associé à ce compte. Contactez l’administrateur GES.");

      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: totp.id });
      if (challengeError) throw new Error("La vérification MFA n’a pas pu démarrer.");
      setFactorId(totp.id);
      setChallengeId(challenge.id);
      setStage("mfa");
    } catch (cause) {
      await supabase.auth.signOut();
      setError(cause instanceof Error ? cause.message : "Connexion indisponible.");
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.mfa.verify({ factorId, challengeId, code: code.replace(/\s/g, "") });
      if (verifyError) throw new Error("Code de vérification invalide ou expiré.");
      router.replace("/admin/vue-generale");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "La vérification MFA a échoué.");
    } finally {
      setBusy(false);
    }
  }

  async function returnToCredentials() {
    setBusy(true);
    setError("");
    try {
      const { error: signOutError } = await createClient().auth.signOut();
      if (signOutError) throw signOutError;
      setStage("credentials");
      setCode("");
      setFactorId("");
      setChallengeId("");
    } catch {
      setError("La session de vérification n’a pas pu être fermée. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return <section className="gate-card">
    <div className="gate-mark"><Image src="/assets/brand/ges-logo.webp" alt="GES S.A." width={48} height={48} priority /></div>
    <div className="eyebrow">ESPACE ADMINISTRATEUR</div>
    <h1>{stage === "credentials" ? "Connexion sécurisée" : "Vérification MFA"}</h1>
    <p>{stage === "credentials" ? "Connectez-vous avec votre compte GES autorisé." : "Saisissez le code temporaire de votre application d’authentification."}</p>
    {stage === "credentials" ? <form className="auth-form" onSubmit={submitCredentials}>
      <label>Adresse courriel<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
      <label>Mot de passe<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
      <button className="gate-button" disabled={busy}>{busy ? "Vérification…" : "Se connecter"}</button>
    </form> : <form className="auth-form" onSubmit={submitCode}>
      <label>Code d’authentification<input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} /></label>
      <button className="gate-button" disabled={busy}>{busy ? "Vérification…" : "Vérifier le code"}</button>
      <button type="button" className="auth-back" disabled={busy} onClick={returnToCredentials}>Retour à la connexion</button>
    </form>}
    {error && <p className="auth-error" role="alert">{error}</p>}
    <small>La connexion ne confère pas à elle seule les permissions administrateur GES.</small>
  </section>;
}
