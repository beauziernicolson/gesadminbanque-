const states = [
  { title: "Chargement", type: "skeleton", copy: "Contenu en cours de chargement" },
  { title: "Liste vide", type: "empty", copy: "Aucune donnée reçue de la source" },
  { title: "Aucun résultat", type: "empty", copy: "Aucun élément ne correspond aux filtres" },
  { title: "Ligne sélectionnée", type: "selected", copy: "Exemple visuel : aucune ligne métier n’est associée" },
  { title: "Menu ouvert", type: "menu", copy: "Exemple visuel : actions désactivées sans dossier réel" },
  { title: "Formulaire invalide", type: "blocked", copy: "Exemple visuel : corrigez les champs signalés" },
  { title: "Action en cours", type: "skeleton", copy: "Exemple visuel : traitement en cours" },
  { title: "Confirmation", type: "success", copy: "Exemple visuel uniquement — aucune action exécutée" },
  { title: "Confirmation d’action sensible", type: "confirm", copy: "Exemple visuel : une confirmation explicite précède l’action" },
  { title: "Accès refusé", type: "blocked", copy: "Une permission serveur est requise" },
  { title: "Session expirée", type: "blocked", copy: "Reconnectez-vous pour continuer" },
  { title: "Service indisponible", type: "blocked", copy: "Les données ne sont pas disponibles" },
  { title: "Erreur", type: "blocked", copy: "L’action n’a pas été confirmée" },
  { title: "Action désactivée", type: "blocked", copy: "Aucune mutation backend n’est raccordée" },
];

export function InterfaceStateGallery() {
  return <main className="state-gallery"><div className="eyebrow">SYSTÈME DE DESIGN · APERÇU</div><h1>États de l’interface</h1><p className="state-note">Exemples visuels uniquement. Ils ne représentent ni une opération ni un statut réel. Aucun état de succès n’est généré par une action backend.</p><div className="state-grid">{states.map((state) => <section className="panel state-card" key={state.title}><h2>{state.title}</h2>{state.type === "skeleton" ? <><div className="skeleton-demo" aria-hidden="true"><i/><span/><span/><span/></div><p className="state-caption">{state.copy}</p></> : state.type === "confirm" ? <div className="state-demo blocked"><div className="state-mark">!</div><p>{state.copy}</p><div className="state-confirm-actions"><button disabled>Annuler</button><button disabled>Confirmer</button></div></div> : state.type === "selected" ? <div className="state-demo selected-row-demo"><div className="selected-row-sample" aria-hidden="true"><i/><span/><span/></div><p>{state.copy}</p></div> : state.type === "menu" ? <div className="state-demo menu-demo"><div className="state-menu-items"><button disabled>Consulter</button><button disabled>Modifier</button><button disabled>Fermer</button></div><p>{state.copy}</p></div> : <div className={`state-demo ${state.type}`}><div className="state-mark">{state.type === "empty" ? "⌕" : state.type === "success" ? "✓" : "!"}</div><p>{state.copy}</p></div>}</section>)}</div></main>;
}
