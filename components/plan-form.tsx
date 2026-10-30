export function PlanForm() {
  return <div className="plan-form-stack">
    <div className="plan-draft-notice"><span aria-hidden="true">i</span><div><strong>Aperçu local — valeurs initiales</strong><p>Ce plan n’est ni enregistré ni publié. Les champs numériques commencent à zéro; les montants sont en HTG.</p></div></div>

    <section className="panel plan-form">
      <div className="panel-head"><div><h2>Informations générales</h2></div><span className="status-pill preview-pill"><i/> Aperçu local</span></div>
      <div className="plan-fields">
        <label>Nom du plan *<input required placeholder="Entrez le nom du plan..."/></label>
        <label>Catégorie *<select required defaultValue=""><option value="" disabled>Sélectionnez une catégorie...</option><option>Obligations</option><option>Placements</option><option>ETF</option><option>Premium</option></select></label>
        <label className="plan-full-width">Description<textarea placeholder="Entrez une description du plan..."/></label>
      </div>
    </section>

    <section className="panel plan-form">
      <div className="panel-head"><div><h2>Paramètres du plan</h2><p>Les termes financiers ne seront publiés qu’après approbation.</p></div></div>
      <div className="plan-fields plan-financial-fields">
        <label>Devise *<select defaultValue="HTG" disabled><option value="HTG">HTG</option></select></label>
        <label>Montant minimum *<input required type="number" min="0" step="1" defaultValue="0"/></label>
        <label>Montant maximum *<input required type="number" min="0" step="1" defaultValue="0"/></label>
        <label>Taux de rendement approuvé *<input required type="number" min="0" step="0.01" defaultValue="0"/></label>
        <label>Durée *<input required type="number" min="0" step="1" defaultValue="0"/></label>
        <label>Frais *<input required type="number" min="0" step="1" defaultValue="0"/></label>
      </div>
    </section>

    <div className="plan-advanced-grid">
    <details className="panel plan-advanced-section">
      <summary>Éligibilité</summary>
      <p>Définissez les critères uniquement à partir des règles GES approuvées.</p>
      <label className="plan-wide-field">Critères d’éligibilité<textarea placeholder="Aucun critère défini"/></label>
    </details>

    <details className="panel plan-advanced-section">
      <summary>Échéancier des intérêts</summary>
      <p>La fréquence et les modalités restent à confirmer.</p>
      <div className="plan-fields">
        <label>Fréquence de versement *<select required defaultValue=""><option value="" disabled>À définir</option></select></label>
        <label>Intervalle (mois)<input type="number" min="0" step="1" defaultValue="0"/></label>
      </div>
      <div className="plan-inline-empty">Aucun échéancier calculé. Les projections ne sont pas disponibles sans modalités approuvées.</div>
    </details>

    <details className="panel plan-advanced-section">
      <summary>Modèle de contrat</summary>
      <p>Aucun modèle GES n’est connecté à cet aperçu.</p>
      <div className="plan-fields">
        <label>Modèle<select defaultValue=""><option value="" disabled>À définir</option></select></label>
        <label className="plan-full-width">Conditions du contrat<textarea placeholder="Aucune information sur le modèle de contrat"/></label>
      </div>
    </details>
    <details className="panel plan-advanced-section">
      <summary>Version et prise d’effet</summary>
      <p>Les conditions approuvées doivent être versionnées pour préserver les modalités déjà associées aux contrats.</p>
      <div className="plan-fields">
        <label>Date et heure de prise d’effet<input type="datetime-local"/></label>
      </div>
      <div className="plan-inline-empty">Aucun historique de version disponible. Cette date reste dans l’aperçu et n’est pas enregistrée.</div>
    </details>
    <details className="panel plan-advanced-section plan-preview-section">
      <summary>Aperçu et publication</summary>
      <p>Les termes saisis ne sont ni enregistrés ni publiés.</p>
      <div className="plan-inline-empty">L’aperçu des conditions financières sera disponible après confirmation des règles et de l’API d’administration.</div>
    </details>
    </div>
    <div className="plan-publication-footer"><p>Actions indisponibles sans contrat d’administration API confirmé et autorisation.</p><button disabled>Enregistrer le brouillon</button><button disabled>Publier le plan</button></div>
  </div>;
}
