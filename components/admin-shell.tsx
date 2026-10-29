"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ModuleWorkspace } from "./module-workspace";
import { DetailWorkspace } from "./detail-workspace";
import { PlanForm } from "./plan-form";

const iconNames: Record<string, string> = { "Vue générale": "dashboard", Membres: "members", KYC: "identity", "Vue financière": "analytics", Trésorerie: "treasury", Transactions: "transactions", "Dépôts et retraits": "deposit", "Grand livre": "ledger", Plans: "plan", "Nouveau plan": "add", Souscriptions: "subscription", Contrats: "contract", "Rôles et permissions": "permissions", "Échéances": "calendar", Financements: "financing", Risques: "risk", Documents: "document", Support: "support", Rapports: "report", Équipe: "team", Audit: "audit", Paramètres: "settings", "Intégration FlexiCash": "flexicash-link", "États de l’interface": "view", Notifications: "notification" };
function NavIcon({ label }: { label: string }) { return <Image className="nav-icon" src={`/assets/icons/${iconNames[label] ?? "view"}.webp`} alt="" width={18} height={18} />; }
function MetricIcon({ label }: { label: string }) { const icon = label === "Disponibles" ? "wallet" : label === "Réservé" ? "permissions" : label === "Investi" ? "investment" : "transactions"; return <Image src={`/assets/icons/${icon}.webp`} alt="" width={17} height={17}/>; }

const groups = [
  { title: "PILOTAGE", items: [["Vue générale", "vue-generale", "◫"]] },
  { title: "MEMBRES & CONFORMITÉ", items: [["Membres", "membres", "♙"], ["KYC", "kyc", "▤"]] },
  { title: "FINANCE", items: [["Vue financière", "vue-financiere", "◷"], ["Trésorerie", "tresorerie", "▰"], ["Transactions", "transactions", "⇄"], ["Dépôts et retraits", "depots-retraits", "↕"], ["Grand livre", "grand-livre", "▥"]] },
  { title: "INVESTISSEMENTS", items: [["Plans", "plans", "◇"], ["Nouveau plan", "plans/nouveau", "+"], ["Souscriptions", "souscriptions", "▧"], ["Contrats", "contrats", "▤"], ["Échéances", "echeances", "◷"], ["Financements", "financements", "◈"]] },
  { title: "OPÉRATIONS", items: [["Risques", "risques", "△"], ["Documents", "documents", "▱"], ["Support", "support", "◌"], ["Intégration FlexiCash", "integrations-flexicash", "⇄"]] },
  { title: "ADMINISTRATION", items: [["Rapports", "rapports", "▥"], ["Équipe", "equipe", "♧"], ["Rôles et permissions", "roles-permissions", "⚿"], ["Audit", "audit", "◉"], ["Paramètres", "parametres", "⚙"], ["États de l’interface", "etats-interface", "▣"]] },
];

const pages: Record<string, { title: string; subtitle: string }> = {
  "vue-generale": { title: "Centre de commandement", subtitle: "Vue d’ensemble de l’activité financière et opérationnelle de GES Admin." },
  membres: { title: "Membres", subtitle: "Consultez et gérez les comptes membres." }, kyc: { title: "Conformité KYC", subtitle: "Vérification des dossiers" },
  "vue-financiere": { title: "Vue financière générale", subtitle: "Aperçu de la position financière de GES Admin en HTG et USD." }, tresorerie: { title: "Trésorerie", subtitle: "Positions de trésorerie" }, transactions: { title: "Transactions", subtitle: "Consultez et gérez l’ensemble des transactions." },
  "depots-retraits": { title: "Dépôts et retraits", subtitle: "Suivi des mouvements entrants et sortants" }, "grand-livre": { title: "Grand livre et rapprochement", subtitle: "Consultation du grand livre comptable et rapprochement des soldes." }, plans: { title: "Catalogue des plans d’investissement", subtitle: "Vue d’ensemble des plans d’investissement autorisés sur GES Admin." },
  souscriptions: { title: "Souscriptions", subtitle: "Vue d’ensemble des souscriptions effectuées sur GES Admin." }, contrats: { title: "Contrats d’investissement", subtitle: "Liste des contrats d’investissement enregistrés dans GES Admin." }, echeances: { title: "Échéances et distributions", subtitle: "Suivi des échéances et des distributions de capital et d’intérêts." }, financements: { title: "Financements GES", subtitle: "Gestion des dossiers de financement du GES Admin." }, "plans/nouveau": { title: "Nouveau plan d’investissement", subtitle: "Créer un nouveau plan d’investissement (brouillon)." },
  risques: { title: "Risques et alertes", subtitle: "Surveillance des risques et des alertes de GES Admin." }, documents: { title: "Documents et notifications", subtitle: "Consultez les documents et les notifications de GES Admin." }, support: { title: "Assistance et tickets", subtitle: "Liste des demandes d’assistance et de support de GES Admin." }, rapports: { title: "Rapports et analyses", subtitle: "Analysez l’activité de GES Admin grâce à des rapports et des visualisations." }, equipe: { title: "Équipe", subtitle: "Accès et rôles de l’équipe" }, audit: { title: "Audit", subtitle: "Journal des actions administratives" }, parametres: { title: "Paramètres", subtitle: "Configuration de l’espace" }, notifications: { title: "Notifications", subtitle: "Centre de notifications administratives" }, "roles-permissions": { title: "Rôles et permissions", subtitle: "Les permissions effectives sont contrôlées côté serveur" }, "integrations-flexicash": { title: "Intégration FlexiCash", subtitle: "Les espaces GES et FlexiCash restent séparés" },
};

const detailPages: Record<string, { title: string; subtitle: string }> = {
  "membres/dossier": { title: "Fiche membre", subtitle: "Aucun membre sélectionné" },
  "kyc/dossier": { title: "Dossier KYC", subtitle: "Aucun dossier sélectionné" },
  "transactions/dossier": { title: "Détail de transaction", subtitle: "Aucune transaction sélectionnée" },
  "souscriptions/dossier": { title: "Détail de la souscription", subtitle: "Informations détaillées sur la souscription sélectionnée dans GES Admin." },
  "contrats/dossier": { title: "Détail du contrat", subtitle: "Consultez les informations détaillées du contrat d’investissement." },
  "risques/incident": { title: "Détail d’un incident", subtitle: "Consultation complète des informations et de l’enquête associées à un incident." },
  "support/conversation": { title: "Conversation d’assistance", subtitle: "" },
  "etats-interface": { title: "États de l’interface", subtitle: "Références visuelles des états partagés" },
};

function EmptyPanel({ title, searching = false }: { title: string; searching?: boolean }) {
  return <section className="empty-panel"><div className="empty-icon"><Image src="/assets/icons/search.webp" alt="" width={16} height={16}/></div><h3>{searching ? "Résultats de recherche indisponibles" : "Aucune donnée disponible pour " + title}</h3><p>{searching ? "Aucune source GES autorisée n’a fourni de données à filtrer." : "Cette section apparaîtra lorsque des données réelles seront disponibles."}</p></section>;
}

function NotificationsWorkspace({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) {
  return <section className="panel notifications-workspace"><div className="notifications-toolbar"><label className="filter-search"><Image src="/assets/icons/search.webp" alt="" width={16} height={16}/><input aria-label="Rechercher une notification" placeholder="Rechercher une notification…" value={query} onChange={(event) => onQueryChange(event.target.value)}/></label><button className="filter-button" disabled>État de lecture <span>⌄</span></button><button className="filter-button" disabled>Type <span>⌄</span></button><button className="filter-button" disabled>Période <span>⌄</span></button></div><div className="notification-empty"><div className="notification-empty-icon"><Image src="/assets/icons/notification.webp" alt="" width={30} height={30}/></div><h2>Données de notification indisponibles</h2><p>Les notifications apparaîtront ici lorsqu’une source GES autorisée les fournira.</p></div></section>;
}


function MetricCard({ label, value, caption }: { label: string; value: string; caption: string }) {
  if (label === "USD") return <section className="metric-card usd-metric"><div className="metric-top"><span>USD</span><span className="metric-symbol">$</span></div><strong className="unavailable-label">Données indisponibles</strong><small>{caption}</small><div className="metric-foot">Aucun montant affiché</div></section>;
  return <section className="metric-card" key={label}><div className="metric-top"><span>{label}</span><span className="metric-symbol"><MetricIcon label={label}/></span></div><strong>{value}</strong><small>{caption}</small><div className="metric-foot">Valeur initiale · à confirmer</div></section>;
}

function DataColumns({ sectionKey }: { sectionKey: string }) {
  const columns: Record<string, string[]> = {
    membres: ["MEMBRE", "ÉTAT DU COMPTE", "KYC", "ADHÉSION", "PORTEFEUILLE"],
    kyc: ["DOSSIER", "PRIORITÉ", "REÇU LE", "VÉRIFICATION", "RÉVISEUR"],
    tresorerie: ["POSITION", "SOURCE", "DEVISE", "DERNIER MOUVEMENT", "ÉTAT"],
    transactions: ["RÉFÉRENCE", "TYPE", "MEMBRE", "DATE", "MONTANT"],
    "depots-retraits": ["RÉFÉRENCE", "TYPE", "FOURNISSEUR", "ÉTAT", "MONTANT"],
    "grand-livre": ["ÉCRITURE", "DÉBIT", "CRÉDIT", "RAPPROCHEMENT", "DATE"],
    plans: ["PLAN", "CATÉGORIE", "DURÉE", "DEVISE", "ÉTAT"],
    souscriptions: ["DEMANDE", "MEMBRE", "PLAN", "FINANCEMENT", "ÉTAT"],
    contrats: ["CONTRAT", "MEMBRE", "PLAN", "ÉCHÉANCE", "ÉTAT"],
    echeances: ["ÉCHÉANCE", "CONTRAT", "CAPITAL", "INTÉRÊTS", "STATUT"],
    financements: ["DOSSIER", "BÉNÉFICIAIRE", "RISQUE", "MONTANT PROPOSÉ", "ÉTAT"],
    risques: ["ALERTE", "SÉVÉRITÉ", "ENTITÉ", "ASSIGNÉ À", "ÉTAT"],
    documents: ["DOCUMENT", "CATÉGORIE", "LIÉ À", "MODIFIÉ", "ÉTAT"],
    support: ["TICKET", "SUJET", "MEMBRE", "PRIORITÉ", "ÉTAT"],
    rapports: ["RAPPORT", "CATÉGORIE", "PÉRIODE", "DEVISE", "ÉTAT"],
    equipe: ["ADMINISTRATEUR", "RÔLE", "MFA", "ACTIVITÉ RÉCENTE", "ÉTAT"],
    audit: ["ÉVÉNEMENT", "ACTEUR", "RESSOURCE", "RÉSULTAT", "DATE"],
    parametres: ["PARAMÈTRE", "DESCRIPTION", "VALEUR", "ÉTAT", "MODIFIÉ"],
    notifications: ["NOTIFICATION", "CATÉGORIE", "URGENCE", "REÇUE LE", "ÉTAT"],
  };
  return <thead><tr>{(columns[sectionKey] ?? ["RÉFÉRENCE", "DESCRIPTION", "DATE", "STATUT", "MONTANT"]).map((column, index) => <th key={column} className={index === 4 ? "align-right" : ""}>{column}</th>)}</tr></thead>;
}

function UsdUnavailable() {
  return <section className="panel currency-unavailable"><div className="currency-symbol">$</div><div><h2>USD</h2><p>Données indisponibles</p><small>Les informations en USD s’afficheront lorsqu’une source autorisée les fournira.</small></div></section>;
}

function OverviewExtras() {
  return <div className="overview-grid auxiliary-grid"><section className="panel"><div className="panel-head"><div><h2>Alertes prioritaires</h2><p>Incidents nécessitant une revue</p></div></div><EmptyPanel title="Les alertes"/></section><section className="panel"><div className="panel-head"><div><h2>Tâches en attente</h2><p>Actions à traiter par l’équipe</p></div></div><EmptyPanel title="Les tâches"/></section></div>;
}

function ReconciliationUnavailable() {
  return <section className="panel financial-reconciliation"><div className="panel-head"><div><h2>Alertes de rapprochement</h2></div></div><EmptyPanel title="les données de rapprochement"/></section>;
}

export function AdminShell({ section }: { section: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const key = section || "vue-generale";
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);
  useEffect(() => { if (key === "notifications") document.querySelector(".sidebar nav .nav-link.active")?.scrollIntoView({ block: "nearest" }); }, [key]);
  useEffect(() => {
    if (!menuOpen) return;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key === "Tab") {
        const focusable = Array.from(sidebarRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
        if (focusable.length === 0) { event.preventDefault(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !sidebarRef.current?.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !sidebarRef.current?.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [menuOpen, closeMenu]);
  const page = pages[key] ?? detailPages[key] ?? { title: "Espace administrateur", subtitle: "Sélectionnez une rubrique dans le menu" };
  const financial = key === "vue-financiere";
  const overview = key === "vue-generale" || financial;
  const isDetail = detailPages[key] !== undefined;
  const metrics = [["Disponibles", "0 HTG", "Solde disponible"], ["Réservé", "0 HTG", "Fonds réservés"], ["Investi", "0 HTG", "Capital investi"], ["En transit", "0 HTG", "Mouvements en cours"], ...(financial ? [["Intérêts courus", "0 HTG", "Intérêts accumulés"], ["Intérêts à payer", "0 HTG", "Intérêts dus"]] : [])];
  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Aller au contenu principal</a>
    <aside ref={sidebarRef} className={`sidebar ${menuOpen ? "mobile-open" : ""}`} role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen || undefined} aria-label={menuOpen ? "Menu de navigation" : undefined}><button ref={drawerCloseButtonRef} type="button" className="drawer-close" onClick={closeMenu} aria-label="Fermer le menu"><Image src="/assets/icons/close.webp" alt="" width={18} height={18}/></button><Link className="brand" href="/admin/vue-generale" onClick={closeMenu}><Image src="/assets/brand/ges-logo.webp" alt="GES" width={58} height={52} priority/><span><b>GES</b><small>ADMINISTRATION</small></span></Link>
      <div className="workspace"><span className="workspace-dot"/> Espace de gestion <span className="chevron">⌄</span></div>
      <nav id="primary-navigation" aria-label="Navigation principale">{groups.map(group => <div className="nav-group" key={group.title}><div className="nav-heading">{group.title}</div>{group.items.map(([label, slug]) => <Link key={slug} href={`/admin/${slug}`} onClick={closeMenu} className={`nav-link ${key === slug ? "active" : ""}`} aria-current={key === slug ? "page" : undefined}><NavIcon label={label}/>{label}</Link>)}{key === "notifications" && group.title === "OPÉRATIONS" && <Link href="/admin/notifications" onClick={closeMenu} className="nav-link active" aria-current="page"><NavIcon label="Notifications"/>Notifications</Link>}</div>)}</nav>
      <div className="sidebar-bottom"><div className="profile"><div className="avatar"><Image src="/assets/icons/identity.webp" alt="" width={16} height={16}/></div><span><b>Aucun compte connecté</b><small>Aperçu sans données</small></span><span className="more">···</span></div></div>
    </aside>
    {menuOpen && <button className="drawer-backdrop visible" type="button" aria-label="Fermer le menu" tabIndex={-1} onClick={closeMenu}/>}
    <main className="main-area" id="main-content" tabIndex={-1} inert={menuOpen}><header className="topbar"><button ref={menuButtonRef} className="mobile-menu-toggle" onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? <Image src="/assets/icons/close.webp" alt="" width={19} height={19}/> : <span className="menu-bars" aria-hidden="true"/>}</button><div className="breadcrumb">GES <span>/</span> Administration <span>/</span> <b>{page.title}</b></div><div className="top-actions"><label className="search"><Image src="/assets/icons/search.webp" alt="" width={15} height={15}/><input placeholder="Rechercher" aria-label="Rechercher" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/><kbd>⌘ K</kbd></label><Link href="/admin/notifications" className="bell" aria-label="Notifications"><Image src="/assets/icons/notification.webp" alt="" width={19} height={19}/></Link><div className="top-avatar"><Image src="/assets/icons/identity.webp" alt="" width={16} height={16}/></div></div></header>
      <div className={`content ${key === "plans/nouveau" ? "plan-content" : ""}`}>{key === "souscriptions/dossier" && <Link className="detail-back" href="/admin/souscriptions">← Retour aux souscriptions</Link>}{key === "contrats/dossier" && <Link className="detail-back" href="/admin/contrats">← Retour aux contrats</Link>}{key === "risques/incident" && <Link className="detail-back" href="/admin/risques">← Retour aux alertes</Link>}{key === "support/conversation" && <Link className="detail-back" href="/admin/support">← Retour aux tickets</Link>}<div className="page-heading"><div>{key !== "transactions" && key !== "souscriptions/dossier" && key !== "contrats/dossier" && key !== "risques/incident" && key !== "support/conversation" && key !== "documents" && key !== "rapports" && <div className="eyebrow">ESPACE DE GESTION</div>}<h1>{page.title}</h1>{page.subtitle && <p>{page.subtitle}</p>}</div><div className="heading-actions">{key === "rapports" && <div className="reports-page-filters"><button className="filter-button" disabled>Tous les rapports <span>⌄</span></button><button className="filter-button" disabled><Image src="/assets/icons/calendar.webp" alt="" width={16} height={16}/> Période non sélectionnée <span>⌄</span></button></div>}{key !== "souscriptions/dossier" && key !== "contrats/dossier" && key !== "risques/incident" && key !== "support/conversation" && key !== "documents" && key !== "rapports" && <span className="status-pill preview-pill"><i/> Aperçu sans connexion aux données</span>}</div></div>
      {key === "notifications" ? <NotificationsWorkspace query={searchQuery} onQueryChange={setSearchQuery}/> : key === "plans/nouveau" ? <><Link href="/admin/plans" className="plan-back">← Retour aux plans</Link><PlanForm/></> : overview ? <>{financial && <div className="module-notice">Valeurs initiales — les montants affichés sont à confirmer et ne constituent pas des soldes vérifiés.</div>}<div className={`metric-grid ${financial ? "financial-metrics" : ""}`}>{metrics.map(([label,value,caption])=><MetricCard key={label} label={label} value={value} caption={caption}/>)}</div>
      {financial && <UsdUnavailable/>}
      <div className={`overview-grid ${financial ? "financial-overview-grid" : "command-overview-grid"}`}><section className="panel"><div className="panel-head"><div><h2>{financial ? "Tendance de trésorerie" : "Tendance financière"}</h2></div>{financial && <button className="select-button" disabled title="Les données sont indisponibles">Période⌄</button>}</div><div className="chart-empty"><div className="chart-lines"><span/><span/><span/><span/></div><div className="chart-message">Aucune donnée disponible</div></div></section><section className="panel breakdown"><div className="panel-head"><div><h2>{financial ? "Obligations à venir" : "Répartition des investissements"}</h2></div>{financial && <button className="dots" disabled aria-label="Options indisponibles">···</button>}</div>{financial ? <div className="donut-wrap"><p>Aucune donnée disponible</p></div> : <div className="donut-wrap"><div className="donut"><div/></div><p>Aucune donnée disponible</p></div>}</section></div>
      {financial ? <ReconciliationUnavailable/> : <OverviewExtras/>}
      {!financial && <section className="panel table-panel"><div className="panel-head"><div><h2>Activité récente</h2><p>Dernières opérations enregistrées</p></div><Link className="text-link" href="/admin/transactions">Voir les transactions <span>→</span></Link></div><div className="list-toolbar overview-filters"><label className="filter-search"><Image src="/assets/icons/search.webp" alt="" width={15} height={15}/><input aria-label="Rechercher une transaction" placeholder="Rechercher une transaction…" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/></label><button className="filter-button" disabled>Tous les types <span>⌄</span></button><button className="filter-button" disabled>Tous les statuts <span>⌄</span></button></div><div className="table-wrap"><table><thead><tr><th>DATE</th><th>TYPE</th><th>DESCRIPTION</th><th>MONTANT (HTG)</th><th>STATUT</th><th>ACTIONS</th></tr></thead><tbody><tr><td colSpan={6}><EmptyPanel title="l’activité récente" searching={searchQuery.trim().length > 0}/></td></tr></tbody></table></div></section>}</> : isDetail ? <DetailWorkspace sectionKey={key}/> : <ModuleWorkspace sectionKey={key} query={searchQuery} onQueryChange={setSearchQuery}/> }
      <footer className="footer">GES Admin <span>·</span> Les devis sont en HTG. Les valeurs initiales à zéro ne sont pas des soldes vérifiés.</footer>
      </div></main></div>;
}
