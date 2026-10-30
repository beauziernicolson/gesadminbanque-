import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Unavailable({ title, description = "Données indisponibles sans enregistrement réel." }: { title: string; description?: string }) {
  return <section className="panel detail-data-card"><div className="detail-data-icon"><Image src="/assets/icons/document.webp" alt="" width={18} height={18}/></div><h2>{title}</h2><p>{description}</p></section>;
}

function BackLink({ href, label }: { href: string; label: string }) {
  return <Link className="detail-back" href={href}>← {label}</Link>;
}

export function DetailWorkspace({ sectionKey }: { sectionKey: string }) {
  const [memberTab, setMemberTab] = useState("Vue d’ensemble");
  const [supportMode, setSupportMode] = useState("reply");
  if (sectionKey === "membres/dossier") return <>
    <BackLink href="/admin/membres" label="Retour aux membres"/>
    <Unavailable title="Données de membre indisponibles" description="Les informations du membre apparaîtront après sélection d’un dossier autorisé."/>
    <div className="module-tabs detail-tabs" role="tablist" aria-label="Rubriques du dossier membre">{["Vue d’ensemble", "Investissements", "Transactions", "Contrats", "Sécurité", "Documents", "Assistance"].map((tab) => <button type="button" role="tab" aria-selected={memberTab === tab} className={memberTab === tab ? "selected" : ""} key={tab} onClick={() => setMemberTab(tab)}>{tab}</button>)}</div>
    <section className="panel module-subpanel" role="tabpanel"><h2>{memberTab}</h2>{memberTab === "Vue d’ensemble" ? <><div className="module-two-panels member-portfolio"><InitialBalance label="HTG"/><Unavailable title="Données indisponibles en USD"/></div><Unavailable title="Données d’activité indisponibles"/></> : <Unavailable title={`Données ${memberTab.toLowerCase()} indisponibles`} description={`Aucune information de ${memberTab.toLowerCase()} n’est disponible sans dossier membre autorisé.`}/>}</section>
  </>;
  if (sectionKey === "kyc/dossier") return <>
    <BackLink href="/admin/kyc" label="Retour à la file KYC"/>
    <div className="module-two-panels"><Unavailable title="Données d’identité indisponibles"/><Unavailable title="Données documentaires indisponibles"/></div>
    <div className="module-two-panels"><section className="panel module-subpanel"><h2>Liste de vérification</h2><ul className="checklist-unavailable"><li>Document d’identité <span>Indisponible</span></li><li>Preuve de résidence <span>Indisponible</span></li><li>Cohérence des informations <span>Indisponible</span></li></ul></section><Unavailable title="Aucun historique de vérification"/></div>
    <section className="panel module-subpanel"><h2>Notes internes</h2><textarea disabled placeholder="Les notes sont indisponibles sans dossier KYC réel."/><div className="detail-actions"><button disabled>Approuver</button><button disabled>Demander des corrections</button><button disabled>Rejeter</button><span>Décisions indisponibles sans dossier ni autorisation confirmés.</span></div></section>
  </>;
  if (sectionKey === "transactions/dossier") return <>
    <BackLink href="/admin/transactions" label="Retour aux transactions"/>
    <div className="detail-notice">Aucune action financière disponible sans transaction réelle et autorisation confirmée.</div>
    <Unavailable title="Données de transaction indisponibles" description="Les détails apparaîtront après sélection d’une transaction réelle."/>
    <div className="module-two-panels"><Unavailable title="Informations générales"/><Unavailable title="Origine et destination"/></div>
    <div className="module-two-panels"><Unavailable title="Historique de traitement"/><Unavailable title="Journal d’audit"/></div>
  </>;
  if (sectionKey === "souscriptions/dossier") return <>
    <div className="module-detail-grid subscription-detail-grid">{[
      ["Membre", "members"], ["Plan sélectionné", "plan"], ["Engagement financier (HTG)", "investment"],
      ["Vérification du financement", "risk"], ["Prérequis KYC", "identity"], ["État du contrat", "contract"],
      ["Étapes du traitement", "subscription"], ["Documents justificatifs", "document"],
    ].map(([title, icon]) => <article className="panel detail-data-card" key={title}><h2>{title}</h2><div className="subscription-detail-state"><div className="detail-data-icon"><Image src={`/assets/icons/${icon}.webp`} alt="" width={28} height={28}/></div><strong>{title === "Documents justificatifs" ? "Aucun document disponible" : "Données indisponibles"}</strong><p>Aucune souscription sélectionnée.</p></div></article>)}</div>
    <section className="panel subscription-actions-panel"><h2>Actions suivantes autorisées</h2><div className="subscription-actions-empty"><Image src="/assets/icons/security.webp" alt="" width={34} height={34}/><strong>Actions indisponibles sans souscription réelle et autorisation confirmées.</strong><p>Veuillez sélectionner une souscription existante et confirmer l’autorisation pour activer les actions.</p></div></section>
  </>;
  if (sectionKey === "contrats/dossier") return <>
    <section className="panel contract-terms-card"><h2>Conditions financières versionnées</h2><div className="contract-terms-state"><div className="detail-data-icon"><Image src="/assets/icons/document.webp" alt="" width={30} height={30}/></div><strong>Données indisponibles</strong><p>Les conditions financières du contrat seront affichées ici lorsqu’un contrat sera sélectionné.</p></div></section>
    <div className="contract-value-grid">{[
      ["Capital initial (HTG)", "wallet", "Le capital initial du contrat sera affiché ici lorsqu’un contrat sera sélectionné."],
      ["Taux applicable", "analytics", "Le taux applicable sera affiché ici lorsqu’un contrat sera sélectionné."],
      ["Date de début", "calendar", "La date de début sera affichée ici lorsqu’un contrat sera sélectionné."],
      ["Durée", "calendar", "La durée du contrat sera affichée ici lorsqu’un contrat sera sélectionné."],
      ["Prochaine échéance", "calendar", "La prochaine échéance sera affichée ici lorsqu’un contrat sera sélectionné."],
      ["Intérêts courus", "interest", "Les intérêts courus seront affichés ici lorsqu’un contrat sera sélectionné."],
      ["Intérêts à payer", "investment", "Les intérêts à payer seront affichés ici lorsqu’un contrat sera sélectionné."],
      ["Intérêts versés", "analytics", "Les intérêts versés seront affichés ici lorsqu’un contrat sera sélectionné."],
    ].map(([title, icon, description]) => <article className="panel contract-value-card" key={title}><div className="contract-value-head"><div className="contract-value-icon"><Image src={`/assets/icons/${icon}.webp`} alt="" width={30} height={30}/></div><h2>{title}</h2></div><div className="contract-value-state"><strong>Données indisponibles</strong><p>{description}</p></div></article>)}</div>
    <div className="contract-secondary-grid">{[
      ["Restrictions sur le capital", "security", "Les restrictions sur le capital seront affichées ici lorsqu’un contrat sera sélectionné."],
      ["Documents du contrat", "document", "Les documents du contrat apparaîtront ici lorsqu’un contrat sera sélectionné."],
    ].map(([title, icon, description]) => <article className="panel contract-secondary-card" key={title}><h2>{title}</h2><div className="contract-secondary-state"><div className="detail-data-icon"><Image src={`/assets/icons/${icon}.webp`} alt="" width={30} height={30}/></div><strong>{title.startsWith("Documents") ? "Aucun document disponible" : "Données indisponibles"}</strong><p>{description}</p></div></article>)}</div>
    <section className="panel contract-events-card"><h2>Événements du contrat</h2><div className="contract-event-state"><div className="detail-data-icon"><Image src="/assets/icons/ledger.webp" alt="" width={30} height={30}/></div><div><strong>Données indisponibles</strong><p>Les événements du contrat seront affichés ici lorsqu’un contrat sera sélectionné.</p></div></div></section>
  </>;
  if (sectionKey === "litiges/dossier") return <>
    <BackLink href="/admin/litiges" label="Retour aux litiges"/>
    <div className="detail-notice">Aucun dossier GES n'est connecte. Les decisions sont desactivees.</div>
    <div className="incident-detail-grid incident-primary-grid">{[["Operation concernee", "transactions", "Reference et nature de l'operation indisponibles."], ["Membre", "members", "Identite du membre indisponible."], ["Montant conteste (HTG)", "wallet", "Montant indisponible."]].map(([title, icon, description]) => <IncidentCard key={title} title={title} icon={icon} description={description}/>)}</div>
    <div className="incident-detail-grid incident-secondary-grid"><IncidentCard title="Elements de preuve" icon="document" description="Aucune piece disponible sans litige selectionne."/><IncidentCard title="Reponse et echanges" icon="support" description="Les echanges apparaitront avec un dossier reel."/></div>
    <div className="incident-detail-grid incident-activity-grid"><IncidentCard title="Chronologie" icon="audit" description="Aucun evenement disponible."/><section className="panel incident-notes"><h2>Motif de decision</h2><textarea disabled placeholder="Indisponible sans dossier autorise."/></section></div>
    <section className="panel incident-actions"><button disabled>Accepter</button><button disabled>Rejeter</button><button disabled>Demander des informations</button><span className="incident-actions-note">Actions desactivees sans dossier reel et autorisation confirmee.</span></section>
  </>;
  if (sectionKey === "recuperations/dossier") return <>
    <BackLink href="/admin/recuperations" label="Retour aux recuperations"/>
    <div className="detail-notice">Aucune demande GES n'est connectee. La recuperation et sa validation restent desactivees.</div>
    <div className="incident-detail-grid incident-primary-grid">{[["Compte concerne", "members", "Identite et coordonnees indisponibles."], ["Methode de verification", "security", "Methode indisponible."], ["Etat de la demande", "analytics", "Etat indisponible."]].map(([title, icon, description]) => <IncidentCard key={title} title={title} icon={icon} description={description}/>)}</div>
    <div className="incident-detail-grid incident-secondary-grid"><IncidentCard title="Preuves d'identite" icon="document" description="Aucun justificatif sans demande selectionnee."/><IncidentCard title="Premiere verification" icon="security" description="Revue et resultat indisponibles."/></div>
    <div className="incident-detail-grid incident-activity-grid"><IncidentCard title="Seconde validation" icon="permissions" description="Second reviseur et resultat indisponibles."/><IncidentCard title="Historique et securite du compte" icon="audit" description="Aucun historique ou etat de securite disponible."/></div>
    <section className="panel incident-actions"><button disabled>Approuver</button><button disabled>Refuser</button><button disabled>Demander des justificatifs</button><span className="incident-actions-note">Deux revues distinctes et une autorisation GES seront requises.</span></section>
  </>;
  if (sectionKey === "risques/incident") return <>
    <div className="incident-detail-grid incident-primary-grid">{[
      ["Sévérité", "warning", "Les informations de sévérité apparaîtront ici lorsqu’un incident sera sélectionné."],
      ["Description", "document", "La description de l’incident apparaîtra ici lorsqu’un incident sera sélectionné."],
      ["Opération concernée", "transactions", "L’opération associée à l’incident apparaîtra ici lorsqu’un incident sera sélectionné."],
    ].map(([title, icon, description]) => <IncidentCard key={title} title={title} icon={icon} description={description}/>)}</div>
    <div className="incident-detail-grid incident-secondary-grid">{[
      ["Résumé des preuves", "document", "Les preuves collectées apparaîtront ici lorsqu’un incident sera sélectionné."],
      ["Enquêteur assigné", "members", "L’enquêteur assigné apparaîtra ici lorsqu’un incident sera sélectionné."],
    ].map(([title, icon, description]) => <IncidentCard key={title} title={title} icon={icon} description={description}/>)}</div>
    <div className="incident-detail-grid incident-activity-grid"><IncidentCard title="Chronologie" icon="audit" description="La chronologie de l’incident apparaîtra ici lorsqu’un incident sera sélectionné."/><section className="panel incident-notes"><h2>Notes internes</h2><textarea disabled placeholder="Aucune note disponible."/></section></div>
    <section className="panel incident-resolution"><h2>Historique de résolution</h2><div className="incident-resolution-state"><div className="detail-data-icon"><Image src="/assets/icons/document.webp" alt="" width={24} height={24}/></div><div><strong>Données indisponibles</strong><p>L’historique de résolution apparaîtra ici lorsqu’un incident sera sélectionné.</p></div></div></section>
    <section className="panel incident-actions"><button disabled><Image src="/assets/icons/next.webp" alt="" width={14} height={14}/> Escalader</button><button disabled><Image src="/assets/icons/success.webp" alt="" width={14} height={14}/> Clôturer</button><span className="incident-actions-note"><Image src="/assets/icons/info.webp" alt="" width={18} height={18}/>Actions indisponibles sans incident et autorisation confirmés.</span></section>
  </>;
  if (sectionKey === "support/conversation") return <>
    <div className="support-workspace"><section className="panel support-list"><h2>Liste des tickets</h2><label className="filter-search support-ticket-search"><Image src="/assets/icons/search.webp" alt="" width={14} height={14}/><input placeholder="Rechercher un ticket…" aria-label="Rechercher un ticket"/></label><div className="support-empty-state"><Image src="/assets/icons/document.webp" alt="" width={32} height={32}/><strong>Aucun ticket disponible</strong><p>Les tickets d’assistance apparaîtront ici lorsqu’ils seront disponibles.</p></div></section><section className="panel support-thread"><h2>Aucune conversation sélectionnée</h2><div className="support-no-selection"><div className="support-no-selection-icon"><Image src="/assets/icons/support.webp" alt="" width={32} height={32}/></div><strong>Aucune conversation sélectionnée</strong><p>Sélectionnez un ticket dans la liste pour afficher la conversation d’assistance.</p></div><div className="module-tabs" role="tablist" aria-label="Mode de message"><button type="button" role="tab" aria-selected={supportMode === "reply"} className={supportMode === "reply" ? "selected" : ""} onClick={() => setSupportMode("reply")}>Reponse au membre</button><button type="button" role="tab" aria-selected={supportMode === "note"} className={supportMode === "note" ? "selected" : ""} onClick={() => setSupportMode("note")}>Note interne</button></div><div className="support-composer"><textarea disabled placeholder={supportMode === "reply" ? "Reponse indisponible..." : "Note interne indisponible..."}/><button disabled aria-label="Envoyer un message"><Image src="/assets/icons/next.webp" alt="" width={14} height={14}/>Envoyer</button></div><div className="support-reply-note"><Image src="/assets/icons/info.webp" alt="" width={16} height={16}/>{supportMode === "reply" ? "Envoi indisponible sans conversation et autorisation confirmees." : "Note interne indisponible sans ticket et autorisation confirmes."}</div></section><section className="panel support-details"><h2>Détails du ticket</h2><div className="support-details-list">{[["Sujet", "document"], ["Membre", "members"], ["Statut", "analytics"], ["Catégorie", "view"]].map(([title, icon]) => <div className="support-detail-row" key={title}><div className="support-detail-row-icon"><Image src={`/assets/icons/${icon}.webp`} alt="" width={22} height={22}/></div><div><strong>{title}</strong><span>Données indisponibles</span></div></div>)}</div></section></div>
  </>;
  return <Unavailable title="Aucune donnée de dossier disponible"/>;
}

function IncidentCard({ title, icon, description }: { title: string; icon: string; description: string }) {
  return <section className="panel incident-card"><h2>{title}</h2><div className="incident-card-state"><div className="detail-data-icon"><Image src={`/assets/icons/${icon}.webp`} alt="" width={30} height={30}/></div><strong>Données indisponibles</strong><p>{description}</p></div></section>;
}

function InitialBalance({ label }: { label: string }) {
  return <section className="metric-card"><div className="metric-top"><span>Position initiale</span><span className="metric-symbol">{label}</span></div><strong>0 HTG</strong><small>Valeur initiale — non confirmée</small></section>;
}
