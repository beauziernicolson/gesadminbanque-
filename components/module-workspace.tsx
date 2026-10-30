"use client";

import { useState } from "react";
import Image from "next/image";
import { InterfaceStateGallery } from "@/components/interface-state-gallery";

type ModulePage = {
  columns: string[];
  empty: string;
  emptyDescription?: string;
  filters: string[];
  description: string;
  title?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  toolbarTitle?: boolean;
  variant?: string;
  tabs?: string[];
};

const pages: Record<string, ModulePage> = {
  membres: { description: "Consultez les comptes membres retournés par une source GES autorisée.", filters: ["Tous les statuts", "Tous les états KYC", "Trier par"], columns: ["MEMBRE", "STATUT DU COMPTE", "STATUT KYC", "DATE D’ADHÉSION", "PORTEFEUILLE", "ACTIONS"], empty: "Données de membre indisponibles" },
  kyc: { description: "Consultez les dossiers de vérification retournés par une source GES autorisée.", filters: ["Tous les dossiers", "Tous les statuts"], columns: ["PRIORITÉ", "DOSSIER", "DATE DE SOUMISSION", "RÉVISEUR", "STATUT", "ACTIONS"], empty: "Données KYC indisponibles" },
  transactions: { description: "Consultez les transactions retournées par une source GES autorisée.", searchPlaceholder: "Rechercher une transaction…", filters: ["Tous les types", "Tous les statuts", "Sélectionner une période"], columns: ["Date", "Référence", "Membre", "Type", "Montant (HTG)", "Statut", "Actions"], empty: "Données de transaction indisponibles" },
  "depots-retraits": { description: "Suivez les dépôts et retraits liés aux opérations GES.", filters: ["Tous les statuts", "Période"], tabs: ["Toutes les opérations", "Dépôts", "Retraits"], columns: ["DATE", "RÉFÉRENCE", "MEMBRE", "TYPE", "MONTANT (HTG)", "STATUT"], empty: "Données opérationnelles indisponibles" },
  plans: { description: "Catalogue des plans d’investissement autorisés sur GES Admin.", filters: ["Tous les statuts", "Trier par"], columns: ["PLAN", "DEVISE", "RENDEMENT", "DURÉE", "STATUT", "ACTIONS"], empty: "Données des plans indisponibles" },
  souscriptions: { description: "Consultez les souscriptions retournées par une source GES autorisée.", searchPlaceholder: "Rechercher une souscription…", filters: ["Tous les statuts", "Tous les plans"], columns: ["Date", "Plan", "Membre", "Montant investi (HTG)", "Statut", "Actions"], empty: "Données de souscription indisponibles" },
  contrats: { description: "Registre des contrats d’investissement retournés par une source GES autorisée.", searchPlaceholder: "Rechercher un contrat…", filters: ["Tous les statuts", "Tous les plans", "Sélectionner une période"], columns: ["Contrat", "Membre", "Plan", "Principal (HTG)", "Date de début", "Échéance", "Statut", "Documents"], empty: "Aucun contrat à afficher" },
  financements: { description: "Dossiers de financement relevant de GES.", searchPlaceholder: "Rechercher un financement…", filters: ["Tous les statuts", "Tous les types"], columns: ["Projet ou bénéficiaire", "Montant proposé (HTG)", "Évaluation du risque", "Documents", "Statut", "Étapes"], empty: "Aucune demande de financement", emptyDescription: "Les dossiers apparaîtront ici lorsqu’ils seront disponibles." },
  litiges: { title: "File des litiges", description: "Examen des contestations liees aux operations GES.", searchPlaceholder: "Rechercher un litige...", filters: ["Tous les types", "Tous les statuts", "Toutes les priorites"], columns: ["REFERENCE", "OPERATION", "MEMBRE", "MONTANT CONTESTE (HTG)", "PRIORITE", "STATUT", "ACTIONS"], empty: "Aucun litige disponible", emptyDescription: "Les dossiers apparaitront lorsqu une source GES autorisee les fournira." },
  recuperations: { title: "File des recuperations", description: "Examen des demandes avec une seconde validation.", searchPlaceholder: "Rechercher une demande...", filters: ["Tous les statuts", "Tous les modes", "Toutes les etapes"], columns: ["REFERENCE", "MEMBRE", "MODE", "ETAPE DE VALIDATION", "DATE DE SOUMISSION", "STATUT", "ACTIONS"], empty: "Aucune demande disponible", emptyDescription: "Les demandes apparaitront lorsqu une source GES autorisee les fournira." },
  risques: { description: "Surveillez les risques et alertes disponibles pour GES.", searchPlaceholder: "Rechercher une alerte…", filters: ["Toutes les catégories", "Toutes les sévérités", "Tous les statuts"], columns: ["Sévérité", "Catégorie", "Entité GES", "Analyste assigné", "Statut", "Actions"], empty: "Aucune alerte disponible", emptyDescription: "Les alertes confirmées apparaîtront ici lorsqu’elles seront disponibles." },
  documents: { description: "Documents disponibles dans les espaces GES autorisés.", filters: ["Tous les types"], columns: ["DOCUMENT", "CATÉGORIE", "LIÉ À", "MODIFIÉ LE", "ÉTAT"], empty: "Données documentaires indisponibles" },
  support: { description: "Demandes d’assistance GES disponibles.", title: "Liste des tickets", toolbarTitle: true, searchPlaceholder: "Rechercher un ticket…", filters: ["Tous les statuts", "Toutes les catégories", "Toutes les priorités"], columns: ["Sujet", "Membre", "Catégorie", "Priorité", "Statut", "Dernière mise à jour", "Actions"], empty: "Aucun ticket à afficher", emptyDescription: "Les demandes d’assistance apparaîtront ici lorsqu’elles seront disponibles." },
  equipe: { description: "Gestion des administrateurs et de leurs permissions dans GES Admin.", searchPlaceholder: "Rechercher un administrateur…", filters: ["Tous les rôles", "Tous les statuts"], columns: ["Administrateur", "Rôle", "Permissions", "Statut", "Dernière connexion", "Actions"], empty: "Aucun administrateur à afficher", emptyDescription: "Les comptes autorisés apparaîtront ici lorsqu’ils seront disponibles.", variant: "team-list-panel" },
  audit: { description: "Journal des événements administratifs disponibles.", searchPlaceholder: "Rechercher un événement…", filters: ["Toutes les actions", "Tous les acteurs", "Période non sélectionnée"], columns: ["Date et heure", "Acteur", "Action", "Entité concernée", "Résultat", "Détails"], empty: "Aucun événement d’audit disponible", emptyDescription: "Les événements autorisés apparaîtront ici lorsqu’ils seront disponibles.", variant: "audit-list-panel" },
};

function EmptyState({ title, searching, description }: { title: string; searching: boolean; description?: string }) {
  return <div className="module-empty"><div className="module-empty-icon"><Image src={`/assets/icons/${searching ? "search" : "document"}.webp`} alt="" width={20} height={20}/></div><h2>{searching ? "Résultats de recherche indisponibles" : title}</h2><p>{searching ? "Aucune source GES autorisée n’a fourni de données à filtrer." : description ?? "Les données apparaîtront ici lorsqu’une source GES autorisée les fournira."}</p></div>;
}

function InitialValueCard({ label }: { label: string }) {
  return <section className="metric-card"><div className="metric-top"><span>{label}</span><span className="metric-symbol">HTG</span></div><strong>0 HTG</strong><small>Valeur initiale — à confirmer</small></section>;
}

function DistributionValueCard({ label, icon }: { label: string; icon: string }) {
  return <section className="panel distribution-value-card"><div className="distribution-value-icon"><Image src={`/assets/icons/${icon}.webp`} alt="" width={28} height={28}/></div><div><span>{label}</span><strong>0 HTG</strong></div><small>Valeur initiale</small></section>;
}

export function ModuleWorkspace({ sectionKey, query, onQueryChange }: { sectionKey: string; query: string; onQueryChange: (value: string) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const page = pages[sectionKey];
  if (sectionKey === "etats-interface") return <InterfaceStateGallery/>;
  if (sectionKey === "documents") return <>
    <section className="panel communications-panel">
      <div className="communications-header"><h2>Documents</h2><label className="filter-search"><Image src="/assets/icons/search.webp" alt="" width={16} height={16}/><input aria-label="Rechercher un document" placeholder="Rechercher un document…" value={query} onChange={(event) => onQueryChange(event.target.value)}/></label><button className="filter-button" disabled>Tous les types <span>⌄</span></button></div>
      <div className="communications-empty"><div className="communications-empty-icon"><Image src="/assets/icons/document.webp" alt="" width={32} height={32}/></div><h3>{query.trim() ? "Résultats de recherche indisponibles" : "Aucun document disponible"}</h3><p>{query.trim() ? "Aucune source GES autorisée n’a fourni de documents à filtrer." : "Les documents apparaîtront ici lorsqu’ils seront disponibles."}</p></div>
    </section>
    <section className="panel communications-panel">
      <div className="communications-header"><h2>Notifications</h2><button className="filter-button" disabled>Toutes les notifications <span>⌄</span></button></div>
      <div className="communications-empty"><div className="communications-empty-icon"><Image src="/assets/icons/notification.webp" alt="" width={32} height={32}/></div><h3>Aucune notification disponible</h3><p>Les notifications apparaîtront ici lorsqu’elles seront disponibles.</p></div>
    </section>
  </>;
  if (sectionKey === "tresorerie") return <>
    <div className="module-notice">Valeurs initiales — les données réelles restent à confirmer. Aucun montant affiché ici ne constitue un solde vérifié.</div>
    <div className="metric-grid treasury-metrics"><InitialValueCard label="Disponible"/><InitialValueCard label="Réservé"/><InitialValueCard label="Entrées"/><InitialValueCard label="Sorties"/></div>
    <section className="panel currency-unavailable"><div className="currency-symbol">$</div><div><h2>Position en USD</h2><p>Données indisponibles</p><small>Aucun taux de change ou montant n’est affiché.</small></div></section>
    <div className="module-two-panels"><section className="panel module-subpanel"><h2>Prévision de liquidité</h2><EmptyState title="Données de prévision indisponibles" searching={false}/></section><section className="panel module-subpanel"><h2>Historique des mouvements</h2><EmptyState title="Données de mouvement indisponibles" searching={false}/></section></div>
    <section className="panel module-subpanel"><h2>Alertes de trésorerie</h2><EmptyState title="Données d’alerte indisponibles" searching={false}/></section>
  </>;
  if (sectionKey === "grand-livre") return <>
    <div className="module-notice">Valeurs initiales — soldes comptables et rapprochés non confirmés.</div>
    <div className="module-two-panels ledger-metrics"><InitialValueCard label="Solde comptable"/><InitialValueCard label="Solde rapproché"/></div>
    <GenericTable sectionKey={sectionKey} page={{ description: "Écritures et rapprochements disponibles.", filters: ["Toutes les périodes"], columns: ["DATE", "RÉFÉRENCE D’ÉCRITURE", "DESCRIPTION", "DÉBIT (HTG)", "CRÉDIT (HTG)", "STATUT"], tabs: ["Grand livre", "Rapprochement"], empty: "Données de grand livre indisponibles" }} query={query} onQueryChange={onQueryChange} activeTab={activeTab} setActiveTab={setActiveTab}/>
    <section className="panel module-subpanel"><h2>Rapprochement des soldes</h2><EmptyState title="Données de rapprochement indisponibles" searching={false}/></section>
  </>;
  if (sectionKey === "echeances") return <>
    <div className="module-notice">Valeurs initiales — données réelles à confirmer.</div>
    <div className="module-two-panels distribution-values"><DistributionValueCard label="Capital à distribuer" icon="treasury"/><DistributionValueCard label="Intérêts à distribuer" icon="interest"/></div>
    <section className="panel module-subpanel calendar-panel"><div className="module-panel-header"><h2>Calendrier des échéances</h2><div className="calendar-period-controls"><button type="button" disabled aria-label="Période précédente">‹</button><button type="button" disabled>Période non sélectionnée</button><button type="button" disabled aria-label="Période suivante">›</button></div></div><div className="calendar-empty"><div className="calendar-weekdays">{["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-blank-grid" aria-hidden="true">{Array.from({length:35}, (_, index) => <span key={index}/>)}</div><EmptyState title="Aucune échéance disponible" description="Les échéances apparaîtront ici lorsqu’elles seront disponibles." searching={false}/></div></section>
    <GenericTable sectionKey={sectionKey} page={{ title: "Liste des échéances", description: "", filters: [], showSearch: false, columns: ["Échéance", "Type", "Bénéficiaire", "Montant (HTG)", "Statut"], empty: "Aucune échéance disponible", emptyDescription: "Les échéances apparaîtront ici lorsqu’elles seront disponibles." }} query={query} onQueryChange={onQueryChange} activeTab={activeTab} setActiveTab={setActiveTab}/>
  </>;
if (sectionKey === "rapports") return <>
    <section className="panel module-subpanel reports-analysis-panel"><h2>Vue analytique</h2><div className="reports-empty-state"><div className="reports-empty-icon"><Image src="/assets/icons/analytics.webp" alt="" width={30} height={30}/></div><strong>Aucune donnée de rapport disponible</strong><p>Les analyses apparaîtront ici lorsqu’une source autorisée sera disponible.</p></div></section>
    <section className="panel module-subpanel reports-list-panel"><h2>Rapports disponibles</h2><div className="reports-empty-state"><div className="reports-empty-icon"><Image src="/assets/icons/document.webp" alt="" width={30} height={30}/></div><strong>Aucun rapport disponible</strong><p>Les rapports apparaîtront ici lorsqu’une source autorisée sera disponible.</p></div></section>
  </>;
  if (sectionKey === "parametres") return <>
    <div className="settings-unavailable-notice"><Image src="/assets/icons/info.webp" alt="" width={28} height={28}/><strong>Paramètres indisponibles sans source autorisée.</strong></div>
    <div className="module-settings-grid settings-card-grid">{["Profil de l’organisation", "Préférences financières", "Sécurité", "Notifications administratives"].map((title) => <section className="panel module-subpanel settings-card" key={title}><h2>{title}</h2><div className="settings-empty"><div className="settings-empty-icon"><Image src="/assets/icons/document.webp" alt="" width={28} height={28}/></div><strong>Données indisponibles</strong><p>Les paramètres seront disponibles après le branchement à une source autorisée.</p></div></section>)}</div>
    <section className="panel settings-save-panel"><button className="primary-button" disabled><Image src="/assets/icons/document.webp" alt="" width={18} height={18}/>Enregistrer les modifications</button><p>Modifications indisponibles sans contrat d’administration confirmé.</p></section>
  </>;
    if (sectionKey === "integrations-flexicash") return <>
    <div className="integration-separation-notice"><Image src="/assets/icons/info.webp" alt="" width={28} height={28}/><strong>Les espaces d’administration GES et FlexiCash restent séparés.</strong></div>
    <div className="module-two-panels integration-panels"><section className="panel module-subpanel integration-card"><h2>État de l’intégration</h2><div className="integration-empty"><div className="settings-empty-icon"><Image src="/assets/icons/document.webp" alt="" width={32} height={32}/></div><strong>Données d’intégration indisponibles</strong><p>Les données d’intégration apparaîtront ici lorsqu’elles seront disponibles.</p></div></section><section className="panel module-subpanel integration-card"><h2>Opérations GES liées</h2><div className="integration-empty"><div className="settings-empty-icon"><Image src="/assets/icons/document.webp" alt="" width={32} height={32}/></div><strong>Aucune opération disponible</strong><p>Les opérations liées à cette intégration apparaîtront ici lorsqu’elles seront disponibles.</p></div></section></div>
  </>;
  if (!page) return <GenericTable sectionKey={sectionKey} page={{ description: "Données GES disponibles.", filters: ["Filtres", "Période"], columns: ["RÉFÉRENCE", "DESCRIPTION", "DATE", "STATUT", "MONTANT (HTG)"], empty: "Aucune donnée disponible" }} query={query} onQueryChange={onQueryChange} activeTab={activeTab} setActiveTab={setActiveTab}/>;
  return <GenericTable sectionKey={sectionKey} page={page} query={query} onQueryChange={onQueryChange} activeTab={activeTab} setActiveTab={setActiveTab}/>;
}

function GenericTable({ sectionKey, page, query, onQueryChange, activeTab, setActiveTab }: { sectionKey: string; page: ModulePage; query: string; onQueryChange: (value: string) => void; activeTab: number; setActiveTab: (value: number) => void }) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const optionsFor = (filter: string) => {
    const normalized = filter.toLowerCase();
    if (normalized.includes("priorit")) return [filter, "Faible", "Normale", "Haute", "Urgente"];
    if (normalized.includes("mode")) return [filter, "Verification identite", "Revue manuelle"];
    if (normalized.includes("etape")) return [filter, "Premiere revue", "Seconde revue"];
    if (normalized.includes("periode") || normalized.includes("period")) return [filter, "Aujourd hui", "7 jours", "30 jours"];
    if (normalized.includes("type")) return [filter, "Depot", "Retrait", "Souscription", "Remboursement"];
    if (normalized.includes("statut") || normalized.includes("status")) return [filter, "En attente", "Confirme", "Rejete"];
    if (normalized.includes("severit") || normalized.includes("severity")) return [filter, "Faible", "Moyenne", "Haute", "Critique"];
    if (normalized.includes("kyc")) return [filter, "A verifier", "Verifie", "Refuse"];
    return [filter, "Actif", "Inactif"];
  };
  const hasActiveFilter = Object.entries(selectedFilters).some(([filter, value]) => value && value !== filter);
  return <section className={`panel list-panel module-list-panel ${page.showSearch === false ? "no-list-search" : ""} ${page.variant ?? ""}`}>{page.title && !page.toolbarTitle && <div className="module-panel-header"><div><h2>{page.title}</h2>{page.description && <p>{page.description}</p>}</div></div>}{page.tabs && <div className="module-tabs">{page.tabs.map((tab, index) => <button key={tab} className={activeTab === index ? "selected" : ""} onClick={() => setActiveTab(index)}>{tab}</button>)}</div>}{page.showSearch !== false && <div className={`module-toolbar ${page.toolbarTitle ? "module-toolbar-titled" : ""}`}>{page.toolbarTitle && <h2>{page.title}</h2>}<label className="filter-search"><Image src="/assets/icons/search.webp" alt="" width={16} height={16}/><input aria-label={`Rechercher dans ${sectionKey}`} placeholder={page.searchPlaceholder ?? `Rechercher ${sectionKey.replaceAll("-", " ")}…`} value={query} onChange={(event) => onQueryChange(event.target.value)}/></label><div className="module-filter-row">{page.filters.map((filter) => <label key={filter} className="filter-button filter-select-label">{(filter.startsWith("Sélectionner une période") || filter.startsWith("Période non sélectionnée")) && <Image className="period-filter-icon" src="/assets/icons/calendar.webp" alt="" width={16} height={16}/>}<select aria-label={filter} value={selectedFilters[filter] ?? filter} onChange={(event) => setSelectedFilters((current) => ({ ...current, [filter]: event.target.value }))}>{optionsFor(filter).map((option) => <option key={option}>{option}</option>)}</select><span className="filter-label">{selectedFilters[filter] ?? filter}</span><span aria-hidden="true">⌄</span></label>)}</div></div>}{hasActiveFilter && <p className="local-filter-note">Filtres d’aperçu uniquement : aucune donnée GES n’est connectée.</p>}<div className="table-wrap"><table><thead><tr>{page.columns.map((column, index) => <th key={column} className={column.includes("HTG") ? "align-right" : ""}>{column}</th>)}</tr></thead><tbody><tr><td colSpan={page.columns.length}><EmptyState title={page.empty} description={page.emptyDescription} searching={query.trim().length > 0 || hasActiveFilter}/></td></tr></tbody></table></div></section>;
}
