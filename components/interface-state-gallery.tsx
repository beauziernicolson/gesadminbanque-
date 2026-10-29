import Image from "next/image";

const states = [
  { title: "Chargement", type: "loading" },
  { title: "Liste vide", type: "empty" },
  { title: "Aucun résultat", type: "no-results" },
  { title: "Ligne sélectionnée", type: "selected" },
  { title: "Menu ouvert", type: "menu" },
  { title: "Confirmation", type: "confirmation" },
  { title: "Formulaire invalide", type: "invalid" },
  { title: "Action en cours", type: "pending" },
  { title: "Action désactivée", type: "disabled" },
  { title: "Succès", type: "success" },
  { title: "Erreur", type: "error" },
  { title: "Accès refusé", type: "denied" },
];

function StatePreview({ type }: { type: string }) {
  if (type === "loading") return <div className="state-preview skeleton-demo" aria-label="Chargement"><i/><span/><span/><span/></div>;
  if (type === "empty") return <div className="state-preview state-empty"><Image src="/assets/icons/document.webp" alt="" width={48} height={48}/><p>Aucun élément à afficher</p></div>;
  if (type === "no-results") return <div className="state-preview state-no-results"><Image src="/assets/icons/search.webp" alt="" width={48} height={48}/><p>Aucun résultat ne correspond aux filtres</p></div>;
  if (type === "selected") return <div className="state-preview selected-rows"><div className="selected-row-sample"><i/><span/><span/></div><div className="selected-row-sample muted"><i/><span/><span/></div><div className="selected-row-sample muted"><i/><span/><span/></div></div>;
  if (type === "menu") return <div className="state-preview open-menu-demo"><button className="menu-trigger" disabled>···</button><div className="state-menu-items"><button disabled><Image src="/assets/icons/view.webp" alt="" width={17} height={17}/>Consulter</button><button disabled><Image src="/assets/icons/edit.webp" alt="" width={17} height={17}/>Modifier</button><button disabled><Image src="/assets/icons/close.webp" alt="" width={17} height={17}/>Fermer</button></div></div>;
  if (type === "confirmation") return <div className="state-preview confirmation-demo"><div className="confirmation-mark">?</div><p>Confirmer cette action&nbsp;?</p><div><button disabled>Annuler</button><button disabled>Confirmer</button></div></div>;
  if (type === "invalid") return <div className="state-preview invalid-demo"><input aria-label="Champ obligatoire" aria-invalid="true" readOnly value=""/><p><Image src="/assets/icons/error.webp" alt="" width={18} height={18}/>Ce champ est requis</p></div>;
  if (type === "pending") return <div className="state-preview pending-demo"><button disabled><span className="state-spinner"/>Enregistrement…</button></div>;
  if (type === "disabled") return <div className="state-preview disabled-demo"><button disabled>Action indisponible</button><p>Cette action n’est pas disponible pour le moment.</p></div>;
  if (type === "success") return <div className="state-preview result-demo success-demo"><Image src="/assets/icons/success.webp" alt="" width={30} height={30}/><strong>Exemple de succès</strong><span>Aucun changement réel effectué.</span></div>;
  if (type === "error") return <div className="state-preview result-demo error-demo"><Image src="/assets/icons/error.webp" alt="" width={24} height={24}/><span>Une erreur est survenue. Réessayez.</span></div>;
  return <div className="state-preview denied-demo"><Image src="/assets/icons/security.webp" alt="" width={50} height={50}/><p>Permission requise</p></div>;
}

export function InterfaceStateGallery() {
  return <div className="state-gallery">
    <div className="state-grid">{states.map((state) => <section className="panel state-card" key={state.type}><h2>{state.title}</h2><StatePreview type={state.type}/></section>)}</div>
    <section className="panel state-session-strip">
      <div className="state-session-item"><Image src="/assets/icons/identity.webp" alt="" width={40} height={40}/><div><strong>Session expirée</strong><span>Reconnectez-vous pour continuer.</span></div></div>
      <div className="state-session-item"><Image src="/assets/icons/alert.webp" alt="" width={40} height={40}/><div><strong>Service indisponible</strong><span>Les données ne sont pas disponibles pour le moment.</span></div></div>
    </section>
  </div>;
}
