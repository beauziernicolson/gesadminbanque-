import { createClient } from "@/lib/supabase/server";

type AccessResult =
  | { allowed: true }
  | { allowed: false; reason: string; login?: boolean };

/**
 * Confirme l'accès de la session courante avec les RPC GES existantes.
 * La console entière exige les mêmes permissions que le snapshot admin
 * temporaire backend : users:manage + transactions:manage, ainsi que AAL2.
 */
export async function checkAdminAccess(): Promise<AccessResult> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return {
      allowed: false,
      reason: "La connexion au service GES n’est pas configurée.",
      login: true,
    };
  }

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims) {
    return {
      allowed: false,
      reason: "Connectez-vous avec un compte GES autorisé.",
      login: true,
    };
  }

  const { data: assurance, error: assuranceError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assuranceError || assurance?.currentLevel !== "aal2") {
    return {
      allowed: false,
      reason: "Une vérification multifacteur est requise avant l’accès administrateur.",
      login: true,
    };
  }

  const [stateResult, permissionsResult] = await Promise.all([
    supabase.rpc("get_my_access_state"),
    supabase.rpc("get_my_permissions"),
  ]);

  if (stateResult.error || permissionsResult.error) {
    return {
      allowed: false,
      reason: "Les autorisations GES n’ont pas pu être vérifiées.",
    };
  }

  const state = Array.isArray(stateResult.data)
    ? stateResult.data[0]
    : stateResult.data;
  if (!state || state.account_status !== "active") {
    return {
      allowed: false,
      reason: "Le compte GES n’est pas actif ou son état est indisponible.",
    };
  }

  const permissions = permissionsResult.data;
  if (
    !Array.isArray(permissions) ||
    !permissions.includes("users:manage") ||
    !permissions.includes("transactions:manage")
  ) {
    return {
      allowed: false,
      reason: "Les permissions requises pour l’administration GES ne sont pas accordées.",
    };
  }

  return { allowed: true };
}

export function isLocalDesignPreview() {
  const previewEnabled = process.env.GES_ADMIN_DEMO_MODE === "true";
  const localPreview = process.env.NODE_ENV !== "production";
  const protectedVercelProduction =
    process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";

  return previewEnabled && (localPreview || protectedVercelProduction);
}
