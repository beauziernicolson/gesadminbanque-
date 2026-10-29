import Link from "next/link";
import Image from "next/image";

export function AccessGate({ reason, login = false }: { reason: string; login?: boolean }) {
  return <main className="gate"><div className="gate-card"><div className="gate-mark"><Image src="/assets/brand/ges-logo.webp" alt="GES S.A." width={48} height={48}/></div><div className="eyebrow">ESPACE ADMINISTRATEUR</div><h1>Accès non disponible</h1><p>{reason}</p>{login && <Link href="/connexion" className="gate-button">Se connecter</Link>}<small>Aucune donnée financière n’a été chargée.</small></div></main>;
}
