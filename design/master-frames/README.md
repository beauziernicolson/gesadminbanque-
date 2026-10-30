# Registre des Master Frames
MF-00 v3 est approuvé et verrouillé. MF-01 à MF-34 ont été relus visuellement en planches, contrôlés pour les données fictives et harmonisés avec le Master Shell approuvé avant intégration. MF-33 v1 a été remplacé par v2 après correction de marque et de filtres présélectionnés. Les PNG restent des sources de travail; le frontend référence les exports WebP.
Les images générées et auditées sont conservées comme références de travail. Les PNG sont des sources; les assets graphiques livrés dans le frontend sont en WebP.

| ID | Écran | Version | Statut | Fichier | Devise / données |
|---|---|---|---|---|---|
| MF-00 | Master Shell et système visuel | v3 | Validé et verrouillé le 27 octobre 2026 | [GES-Admin-MF-00-v3-draft.png](drafts/GES-Admin-MF-00-v3-draft.png) | HTG; valeurs financières initiales à zéro; aucune série fictive |
| MF-01 | Connexion administrateur | v3 proposée | Capture desktop réelle pour l’état par défaut; variante d’erreur v2 conservée comme proposition non vérifiée | [Écran par défaut](drafts/GES-Admin-MF-01-login-default-v3.png), [proposition d’erreur](drafts/GES-Admin-MF-01-login-validation-error-v2.png) | Champs vides; copie exacte de l’application; aucun identifiant ni contrôle de récupération fictif |
| MF-02 | Vérification MFA | v1 | Référence par défaut prête; mécanisme réel à confirmer avant intégration | [Écran MFA](drafts/GES-Admin-MF-02-mfa-default.png) | Six champs vides; aucun code de vérification ou de secours affiché |
| MF-02 | Vérification MFA | v1 — erreur | État d'erreur prêt | [Code invalide](drafts/GES-Admin-MF-02-mfa-invalid-code.png) | Aucune valeur de code |
| MF-03 | Centre de commandement | v2 proposée | État vide; recherche globale libellée « Rechercher une rubrique… » pour correspondre à la recherche des rubriques GES | [Référence v2 WebP](exports-webp/GES-Admin-MF-03-command-center-empty-v2.webp) | Cartes `0 HTG`; USD indisponible; aucun historique ou graphique simulé |
| MF-04 | Liste des membres | v1 | État vide prêt | [GES-Admin-MF-04-members-empty.png](drafts/GES-Admin-MF-04-members-empty.png) | Aucune identité, date ou valeur de portefeuille |
| MF-05 | Fiche membre | v1 | État de données indisponibles prêt | [GES-Admin-MF-05-member-detail-empty.png](drafts/GES-Admin-MF-05-member-detail-empty.png) | `0 HTG` explicitement non confirmé; aucune identité ou activité |
| MF-06 | File KYC | v1 | État vide prêt | [GES-Admin-MF-06-kyc-queue-empty.png](drafts/GES-Admin-MF-06-kyc-queue-empty.png) | Aucune personne, demande, date ou priorité fictive |
| MF-07 | Dossier KYC | v1 | État vide prêt | [GES-Admin-MF-07-kyc-case-empty.png](drafts/GES-Admin-MF-07-kyc-case-empty.png) | Aucune preuve ou décision fictive; mutations désactivées |
| MF-08 | Vue générale financière | v2 | États initiaux et indisponibilités sans faux statut | [GES-Admin-MF-08-financial-overview-initial-v2.png](drafts/GES-Admin-MF-08-financial-overview-initial-v2.png) | Six champs HTG à `0 HTG`, marqués initiaux; USD et rapprochement indisponibles |
| MF-09 | Trésorerie | v1 | Valeurs initiales et états vides prêts | [GES-Admin-MF-09-treasury-empty.png](drafts/GES-Admin-MF-09-treasury-empty.png) | Quatre champs HTG à `0 HTG`, marqués initiaux; USD indisponible |
| MF-10 | Transactions | v1 | État vide prêt | [GES-Admin-MF-10-transactions-empty.png](drafts/GES-Admin-MF-10-transactions-empty.png) | Aucune ligne, date, identité, montant ou référence fictive |
| MF-11 | Détail transaction | v1 | État indisponible prêt | [GES-Admin-MF-11-transaction-detail-unavailable.png](drafts/GES-Admin-MF-11-transaction-detail-unavailable.png) | Aucune donnée; aucune action financière |
| MF-12 | Dépôts et retraits | v1 | État vide read-only prêt | [GES-Admin-MF-12-deposits-withdrawals-empty.png](drafts/GES-Admin-MF-12-deposits-withdrawals-empty.png) | Aucune opération, identité, date ou valeur fictive |
| MF-13 | Grand livre et rapprochement | v1 | Valeurs initiales et état vide prêts | [GES-Admin-MF-13-ledger-reconciliation-empty.png](drafts/GES-Admin-MF-13-ledger-reconciliation-empty.png) | Deux soldes initiaux `0 HTG`; écritures vides; rapprochement indisponible |
| MF-14 | Catalogue de plans | v1 | État vide prêt | [GES-Admin-MF-14-plans-empty.png](drafts/GES-Admin-MF-14-plans-empty.png) | Aucun plan, devise, rendement, durée ou tarif d'exemple |
| MF-15 | Création/édition d'un plan | v3 proposée | Référence desktop repliée avec accordéon « Version et prise d'effet »; revue du shell/typo toujours requise avant verrouillage | [Brouillon par défaut v3 WebP](exports-webp/GES-Admin-MF-15-plan-create-draft-default-v3.webp), [sections ouvertes v2](drafts/GES-Admin-MF-15-plan-create-draft-v2.png), [mobile pleine page v2](../responsive/drafts/MF-15-plan-form-responsive-v2.png) | Devise HTG; six champs numériques à zéro; saisies textuelles vides; actions désactivées |
| MF-16 | Souscriptions | v1 | État vide prêt | [GES-Admin-MF-16-subscriptions-empty.png](drafts/GES-Admin-MF-16-subscriptions-empty.png) | Aucun plan, membre, date, montant ou statut fictif |
| MF-17 | Détail souscription | v1 | État indisponible prêt | [GES-Admin-MF-17-subscription-detail-unavailable.png](drafts/GES-Admin-MF-17-subscription-detail-unavailable.png) | Aucun engagement, document, état ou historique fictif |
| MF-18 | Contrats d'investissement | v1 | État vide prêt | [GES-Admin-MF-18-contracts-empty.png](drafts/GES-Admin-MF-18-contracts-empty.png) | Contrats temporaires exclus; aucune donnée fictive |
| MF-19 | Détail d'un contrat | v1 | État indisponible prêt | [GES-Admin-MF-19-contract-detail-unavailable.png](drafts/GES-Admin-MF-19-contract-detail-unavailable.png) | Aucun taux, montant, terme, échéance ou événement fictif |
| MF-20 | Échéances et distributions | v1 | Valeurs initiales et calendrier vide prêts | [GES-Admin-MF-20-maturities-empty.png](drafts/GES-Admin-MF-20-maturities-empty.png) | Deux valeurs initiales `0 HTG`; période non sélectionnée; aucune échéance |
| MF-21 | Financements GES | v2 | État vide corrigé : item Financements actif | [GES-Admin-MF-21-financing-empty-v2.png](drafts/GES-Admin-MF-21-financing-empty-v2.png) | Aucune demande, somme, personne ou évaluation fictive |
| MF-22 | Risques et alertes | v1 | État vide prêt | [GES-Admin-MF-22-risks-alerts-empty.png](drafts/GES-Admin-MF-22-risks-alerts-empty.png) | Aucune alerte, sévérité, entité ou personne fictive |
| MF-23 | Détail d'un incident | v1 | État indisponible prêt | [GES-Admin-MF-23-incident-unavailable.png](drafts/GES-Admin-MF-23-incident-unavailable.png) | Aucune preuve, enquête, date ou résolution fictive; actions désactivées |
| MF-24 | Assistance et tickets | v1 | État vide prêt | [GES-Admin-MF-24-support-tickets-empty.png](drafts/GES-Admin-MF-24-support-tickets-empty.png) | Aucun ticket, identité, date, priorité ou message fictif |
| MF-25 | Conversation d'assistance | v1 | État vide prêt | [GES-Admin-MF-25-support-conversation-empty.png](drafts/GES-Admin-MF-25-support-conversation-empty.png) | Aucun ticket sélectionné, message ou identité fictive |
| MF-26 | Documents et notifications | v1 | Deux états vides distincts prêts | [GES-Admin-MF-26-documents-notifications-empty.png](drafts/GES-Admin-MF-26-documents-notifications-empty.png) | Aucun document, notification, horodatage, badge ou compteur fictif |
| MF-27 | Rapports et analyses | v1 | État analytique et liste vide prêts | [GES-Admin-MF-27-reports-empty.png](drafts/GES-Admin-MF-27-reports-empty.png) | Aucune période, mesure, agrégat ou série fictive |
| MF-28 | Équipe et administrateurs | v1 | État vide prêt | [GES-Admin-MF-28-team-empty.png](drafts/GES-Admin-MF-28-team-empty.png) | Aucune identité, permission, connexion ou rôle fictif |
| MF-29 | Rôles et permissions | v1 | Deux états vides prêts | [GES-Admin-MF-29-roles-permissions-empty.png](drafts/GES-Admin-MF-29-roles-permissions-empty.png) | Aucun rôle/permission d'exemple; aucun contrôle de mutation |
| MF-30 | Audit administratif | v1 | État vide prêt | [GES-Admin-MF-30-audit-empty.png](drafts/GES-Admin-MF-30-audit-empty.png) | Aucun acteur, événement, horodatage ou résultat fictif |
| MF-31 | Paramètres GES | v1 | État indisponible prêt; modifications désactivées | [GES-Admin-MF-31-settings-unavailable.png](drafts/GES-Admin-MF-31-settings-unavailable.png) | Aucune configuration, valeur ou préférence fictive |
| MF-32 | Intégration FlexiCash | v1 | État indisponible/read-only prêt | [GES-Admin-MF-32-flexicash-unavailable.png](drafts/GES-Admin-MF-32-flexicash-unavailable.png) | Aucun état de connexion ni opération fictive; espaces séparés |
| MF-33 | Notifications administratives | v2 | Référence relue, shell MF-00 respecté, recherche et filtres non sélectionnés | [Notifications v2](drafts/GES-Admin-MF-33-notifications-v2.png) | Aucun message, badge, compteur, date, identité ni chiffre fictifs |
| MF-34 | Etats transversaux | v1 | Planche de reference creee | [Etats d interface](drafts/GES-Admin-MF-34-interface-states.png) | Etats generiques; aucun enregistrement fictif |

## MF-00 — Master Shell GES Admin

- **Référence visuelle :** capture locale `Tableau de bord financier GES.png`, utilisée uniquement comme repère de marque et de composition. Ses montants, volumes, dates et identités d'exemple ne sont pas repris.
- **Image desktop :** brouillon v3, 1586 × 992 px. Les brouillons v1 et v2 restent conservés pour l'historique.
- **Prompt :** interface desktop frontale de dashboard GES Admin, navigation latérale groupée, topbar de recherche/profil, composants fondamentaux, données financières exclusivement `0 HTG`, graphiques vides, table vide, palette violette GES.
- **Composants visibles :** sidebar groupée, recherche, profil générique, quatre cartes en `0 HTG`, panneaux de graphique et de répartition en état vide, table filtrable sans lignes, boutons primaire/secondaire, filtre, badges neutre/information/avertissement et skeleton.
- **Corrections v2 :** suppression de l'action financière non confirmée et du symbole de logo inventé; pas de valeurs de démonstration non nulles.
- **Logo :** le logo officiel GES est intégré sans recoloration; la source PNG reste dans design/assets/source et le logo WebP est livré dans public/assets/brand.
- **Validation :** direction visuelle approuvée par l'utilisateur le 27 octobre 2026; v3 est la référence canonique à réutiliser.
- **Textes exacts validés :** aucun; les libellés des écrans restent à relire avec leurs Master Frames.
- **Fidélité / qualité de texte :** inspection visuelle effectuée; l'interface est lisible et complète. La comparaison avec un rendu frontend reste à faire après validation et implémentation.
- **Responsive :** non produit.
- **Historique :** v1 première composition; v2 après audit visuel; v3 avec logo officiel approuvé. La source PNG et son export WebP sont conservés.

## MF-01 — Connexion administrateur

- **Références desktop v2 proposées :** état par défaut et erreur de validation, 1586 × 992 px; exports WebP correspondants dans `exports-webp/`.
- **Textes :** « Connexion administrateur », « Adresse e-mail », « Mot de passe », « Se connecter »; l'état d'erreur précise les champs requis manquants.
- **Données :** champs vides; aucun identifiant, date, montant ou code d'exemple.
- **Sécurité :** la v2 supprime « Se souvenir de moi » et « Mot de passe oublié ? », qui ne sont pas implémentés ni autorisés par un contrat confirmé. Les sources v1 restent conservées comme historique non canonique.
- **Statut :** version proposée; comparer au rendu et verrouiller après la revue du lot sécurité.

## MF-02 — Vérification MFA

- **Référence desktop :** état par défaut, 1586 × 992 px; six cases vides, première case focalisée.
- **Textes :** « Vérification de sécurité », « Code de vérification », « Vérifier », « Retour à la connexion ».
- **Données :** aucun code ou secret affiché. L'interface reste neutre quant au mécanisme, à confirmer dans le contrat d'authentification administrateur.
- **État d'erreur, session expirée et indisponibilité :** à produire si l'interface diffère substantiellement du composant global d'états.
- **Erreur de saisie :** [référence code invalide](drafts/GES-Admin-MF-02-mfa-invalid-code.png); aucune tentative n'est affichée.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-03 — Centre de commandement

- **Référence desktop :** shell approuvé réutilisé, 1586 × 992 px.
- **Valeurs :** quatre indicateurs HTG à `0 HTG`; zone USD distincte en indisponibilité, sans montant.
- **État de données :** tendance, répartition, alertes, tâches et activité récente sont vides; aucun axe, point, ligne, date ou compte d'exemple.
- **Textes :** libellés français vérifiés à la lecture de l'image; revoir les chaînes dans le code source avant implémentation.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-04 — Liste des membres

- **Référence desktop :** état vide avec « Membres » comme seul élément de navigation actif, 1586 × 992 px.
- **Contenu :** recherche, filtres génériques et entêtes Membre, Statut du compte, Statut KYC, Date d'adhésion, Portefeuille et Actions.
- **Données :** aucune ligne, identité, date, valeur de portefeuille, compteur ou pagination d'exemple.
- **État résultat filtré :** à produire depuis une source réelle ou à représenter comme état vide filtré, sans fabriquer un membre.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-05 — Fiche membre

- **Référence desktop :** dossier vide / aucune donnée membre disponible, 1586 × 992 px.
- **Structure :** en-tête, onglets Vue d'ensemble, Investissements, Transactions, Contrats, Sécurité, Documents, Assistance; portefeuille HTG/USD; activité récente vide.
- **Valeurs :** `0 HTG` est explicitement marqué « Valeur initiale — non confirmée »; USD indique indisponibilité sans montant.
- **Données :** aucune identité, date, activité, statut ou document n'est simulé.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-06 — File de vérification KYC

- **Référence desktop :** file vide, 1586 × 992 px, KYC seul onglet de navigation actif.
- **Contenu :** recherche, filtres génériques et colonnes de priorité, dossier, date de soumission, réviseur, statut et actions.
- **Données :** aucun dossier ou candidat, aucune priorité, date, durée, personne assignée ou action simulée.
- **Source :** le contrat d'administration KYC n'est pas confirmé; cette maquette ne suppose donc aucune mutation ni donnée de production.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-07 — Dossier de vérification KYC

- **Référence desktop :** dossier sans demande chargée, 1585 × 992 px.
- **Lecture des preuves :** panneaux d'identité, documents, checklist et historique vides; aucune image ou pièce personnelle inventée.
- **Notes :** champ vide, sans note préremplie.
- **Décisions :** Approuver, Demander des corrections et Rejeter désactivés; la référence indique que le dossier et l'autorisation doivent être confirmés.
- **Source :** aucun contrat admin KYC durable n'est confirmé; aucune mutation n'est autorisée par cette conception.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-08 — Vue financière générale

- **Référence desktop :** shell approuvé, 1586 × 992 px.
- **Valeurs :** six KPI HTG à `0 HTG`, chacun marqué « Valeur initiale »; bandeau informatif précise qu'aucun solde n'est vérifié.
- **USD :** section distincte indiquant indisponibilité, sans montant ni conversion.
- **États vides :** tendance, obligations et alertes de rapprochement indiquées indisponibles; aucune date ou série fabriquée.
- **Export :** la version v2 remplace le statut d’alerte non vérifié par « Données indisponibles ». La v1 reste archivée comme historique.

## MF-09 — Trésorerie

- **Référence desktop :** shell approuvé, 1586 × 992 px.
- **Valeurs :** disponible, réservé, entrées et sorties sont à `0 HTG`, marqués « Valeur initiale » sous un bandeau de données non confirmées.
- **USD :** indisponible sans montant ni conversion.
- **États vides :** prévision, historique des mouvements et alertes; aucune échéance, courbe ou ligne inventée.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-10 — Transactions

- **Référence desktop :** état vide avec filtre de période non renseigné, 1585 × 992 px.
- **Table :** date, référence, membre, type, montant (HTG), statut, actions; aucune ligne ni pagination d'exemple.
- **État vide :** aucun total ajouté; aucune transaction, personne, date ou statut fictif.
- **Contrat :** route admin stable à confirmer avant connexion réelle.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-11 — Détail d'une transaction

- **Référence desktop :** aucune transaction sélectionnée, 1586 × 992 px.
- **Contenu :** informations générales, origine/destination, historique et journal d'audit distingués en états indisponibles.
- **Montant :** champ exprimé en HTG; aucune transaction n'étant disponible, aucune valeur n'est affichée.
- **Actions :** aucun bouton d'approbation, remboursement ou paiement; seules une note d'indisponibilité et le retour à la liste apparaissent.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-12 — Dépôts et retraits

- **Référence desktop :** file read-only vide, 1586 × 992 px.
- **Contenu :** vues Toutes les opérations, Dépôts, Retraits; filtres sans valeurs; montant de table en HTG.
- **Données :** aucune opération, identité, date, référence, valeur ou statut d'exemple.
- **Contrat :** l'API examinée appartient à la console provisoire; contrat durable et mutations non confirmés. Aucun contrôle de mutation n'apparaît.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-13 — Grand livre et rapprochement

- **Référence desktop :** grand livre et rapprochement, 1586 × 992 px.
- **Valeurs initiales :** solde comptable et solde rapproché `0 HTG`, clairement étiquetés « Valeur initiale » et non confirmés.
- **Données :** aucune écriture, date, référence, débit, crédit ou différence simulée; rapprochement indisponible sans source confirmée.
- **Actions :** aucun contrôle de comptabilisation, écriture ou ajustement.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-14 — Catalogue de plans d'investissement

- **Référence desktop :** catalogue vide, 1585 × 992 px.
- **Contenu :** recherche, filtre générique et colonnes plan, devise, rendement, durée, statut, actions.
- **Données :** aucune offre, devise, durée, taux, rendement, tarif ou statut de plan fictif.
- **Actions :** aucun bouton de création, modification, publication ou suppression, faute de contrat admin confirmé.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-15 — Création et édition d'un plan

- **Références desktop v2 proposées :** état par défaut sections repliées et état complet sections ouvertes, 1584 × 993 px; exports WebP correspondants dans `exports-webp/`.
- **Devise :** HTG fixe; aucune autre devise ni conversion.
- **Valeurs :** minimum `0 HTG`, maximum `0 HTG`, taux approuvé `0 %`, durée `0 mois`, frais `0 HTG`, intervalle `0 mois`. Les champs texte restent vides et la fréquence reste « À définir ».
- **Sections :** informations générales, paramètres financiers, éligibilité, échéancier des intérêts, modèle de contrat, aperçu/publication.
- **État :** brouillon non enregistré; sauvegarde et publication désactivées faute de contrat admin confirmé; aucun calcul ou rendement projeté.
- **Écart v1 corrigé :** MF-15 v1 omettait le montant maximum et les sections avancées; elle reste conservée comme historique non canonique.
- **Statut :** version proposée; les états desktop replié et ouvert ont des comparaisons réelles dans `design/qa/comparison-mf15-default.png` et `design/qa/comparison-mf15-open.png`; le mobile pleine page v2 est comparé dans `design/qa/frame-review/MF-15-mobile-fullpage-comparison.png`. Les écarts de shell et de typographie restent visibles; ne pas verrouiller avant validation.

## MF-16 — Souscriptions

- **Référence desktop :** liste vide, 1586 × 992 px.
- **Contenu :** recherche, filtres de statut et plan; colonnes date, plan, membre, montant investi (HTG), statut, actions.
- **Données :** aucune souscription, personne, date, montant, compte ou pagination fictive.
- **Contrat :** endpoints d'administration des souscriptions non confirmés; aucune action n'est présentée dans l'état vide.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-17 — Détail de souscription

- **Référence desktop :** sans souscription sélectionnée, 1586 × 992 px.
- **Panneaux :** membre, plan, engagement financier (HTG), financement, prérequis KYC, état du contrat, étapes du traitement et documents justificatifs.
- **Données :** engagement et autres champs indisponibles, aucun montant, identité, document ou historique inventé.
- **Actions :** aucune action activée sans souscription réelle et autorisation confirmée.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-18 — Registre des contrats d'investissement

- **Référence desktop :** registre vide, 1586 × 992 px.
- **Colonnes :** contrat, membre, plan, principal (HTG), date de début, échéance, statut, documents.
- **Données :** aucune ligne; les contrats de démonstration de l'administration temporaire ne sont pas repris.
- **Filtres :** statut, plan et période sans choix prérempli ni compteur.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-19 — Détail d'un contrat

- **Référence desktop :** aucun contrat sélectionné, 1586 × 992 px.
- **Panneaux :** conditions versionnées, principal en HTG, taux, dates, durée, échéance, intérêts courus/à payer/versés, restrictions, documents et événements.
- **Données :** chaque valeur est indisponible; aucun chiffre ou terme contractuel n'est supposé.
- **Actions :** aucune signature, restriction, libération ou mutation n'apparaît.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-20 — Échéances et distributions

- **Référence desktop :** calendrier et liste vides, 1586 × 992 px; période non sélectionnée, sans date ni jour inventé.
- **Valeurs initiales :** capital et intérêts à distribuer `0 HTG`, marqués « Valeur initiale » sous bandeau de données non confirmées.
- **Données :** aucune échéance, bénéficiaire, obligation, statut ou mouvement de distribution fictif.
- **Actions :** aucun contrôle de paiement ou de libération.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-21 — Financements GES

- **Référence desktop :** liste vide, 1586 × 992 px; l'item « Financements » est actif dans le shell.
- **Colonnes :** projet/bénéficiaire, montant proposé (HTG), risque, documents, statut, étapes.
- **Données :** aucune demande, personne, somme, risque, échéance ou document fictif.
- **Actions :** aucun contrôle de décaissement ou d'exécution directe.
- **Export :** la version corrigée v2 est conservée dans drafts et exportée en WebP dans exports-webp. La v1 reste archivée comme historique.

## MF-22 — Risques et alertes

- **Référence desktop :** liste d'alertes vide, 1586 × 992 px.
- **Colonnes :** sévérité, catégorie, entité GES, analyste assigné, statut, actions.
- **Données :** aucune alerte, personne, catégorie, sévérité, date ou compteur fictif; aucun bandeau rouge d'incident inexistant.
- **Contrat :** aucune API de risque admin n'a été confirmée.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-23 — Détail d'un incident

- **Référence desktop :** aucun incident sélectionné, 1586 × 992 px.
- **Panneaux :** sévérité, description, opération, preuves, enquêteur, chronologie, notes et historique de résolution.
- **Données :** indisponibles; aucune personne, opération, pièce, note ou date fictive.
- **Actions :** escalader et clôturer désactivés faute d'incident et d'autorisation confirmés.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-24 — Assistance et tickets

- **Référence desktop :** liste vide, 1586 × 992 px.
- **Contenu :** recherche et filtres de statut, catégorie et priorité; table de tickets vide.
- **Données :** aucune personne, demande, priorité, statut, date ou message d'exemple.
- **Contrat :** la route support existante doit être vérifiée contre les contrats admin disponibles avant toute intégration.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-25 — Conversation d'assistance

- **Référence desktop :** liste sans ticket, conversation non sélectionnée, 1585 × 992 px.
- **Données :** aucun message, membre, sujet, statut, catégorie, date ou badge inventé.
- **Réponse :** compositeur et envoi désactivés sans conversation et autorisation confirmées.
- **Contrat :** route récupération existante non assimilée à une API de tickets générique.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-26 — Documents et notifications

- **Référence desktop :** deux régions distinctes, chacune avec son état vide, 1586 × 992 px.
- **Données :** aucune pièce, taille de fichier, notification, identité, horodatage, compteur ou badge d'élément non lu.
- **Actions :** aucun téléversement, envoi, suppression ou acquittement sans contrat confirmé.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-27 — Rapports et analyses

- **Référence desktop :** zone analytique et liste des rapports vides, 1585 × 992 px.
- **Filtres :** rapport et période sans dates ni sélection fictives.
- **Données :** aucun graphique, rapport, mesure, agrégat, export ou période inventé.
- **Contrat :** aucune API admin de rapports ou d'analyses confirmée.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-28 — Équipe et administrateurs

- **Référence desktop :** liste vide, Équipe seul item actif, 1586 × 992 px.
- **Colonnes :** administrateur, rôle, permissions, statut, dernière connexion, actions.
- **Données :** aucun nom, compte, rôle, permission, présence ou horodatage d'exemple.
- **Actions :** aucune invitation, modification ou suppression sans contrat de gestion confirmé.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-29 — Rôles et permissions

- **Référence desktop :** liste de rôles vide et matrice de permissions vide, 1586 × 992 px.
- **Données :** aucun nom de rôle, permission, compte ou compteur fictif.
- **Sécurité :** la note rappelle que les permissions effectives sont vérifiées côté serveur; aucun rôle/permission n'est modifiable dans la référence.
- **Contrat :** la page `/admin/parametres` observée n'établit pas que l'administration RBAC est effectivement implémentée.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-30 — Audit administratif

- **Référence desktop :** journal vide, période non sélectionnée, 1585 × 992 px.
- **Colonnes :** date/heure, acteur, action, entité, résultat, détails.
- **Données :** aucun événement, acteur, résultat ou horodatage fictif.
- **Contrat :** route d'audit existante à vérifier contre les contrats et permissions admin cibles.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-31 — Paramètres GES

- **Référence desktop :** quatre sections en indisponibilité, 1586 × 992 px.
- **Sections :** profil de l'organisation, préférences financières, sécurité, notifications administratives.
- **Données :** aucune valeur, bascule, contact, URL ou option fictive.
- **Actions :** enregistrement désactivé en l'absence de contrat admin confirmé.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-32 — Intégration FlexiCash

- **Référence desktop :** état d'intégration et opérations vides, 1585 × 992 px.
- **Séparation :** le bandeau rappelle que les administrations GES et FlexiCash restent séparées; aucune navigation ou action FlexiCash n'est ajoutée.
- **Données :** état de connexion indisponible; aucune opération liée, compte, clé, date, valeur ou compteur fictif.
- **Export :** Les sources PNG sont conservées dans drafts. Les exports finaux WebP sont disponibles dans exports-webp.

## MF-33 — Notifications administratives

- **Référence desktop :** boîte de notifications vide, 1585 × 992 px.
- **Filtres :** recherche, toutes/non lues, type et période sans sélection initiale.
- **Données :** aucun message, badge, compteur, personne ou horodatage fictif.
- **Contrat :** aucune boîte admin dédiée confirmée; rester indisponible/vide sans source autorisée.

## MF-34 — États transversaux

- **Référence desktop :** planche de composants d'état, 1586 × 992 px.
- **États :** chargement, vide, aucun résultat, formulaire invalide, action en cours, succès générique, erreur, permission requise, session expirée et service indisponible.
- **Usage :** les exemples de feedback ne constituent pas la preuve d'une action réelle; afficher succès uniquement après confirmation du serveur.
- **Données :** aucune transaction, personne, date, somme ou ligne fictive.


Mise à jour du 30 octobre 2026 : MF-03 v2 et MF-15 v3 ajoutés en WebP avec leurs sources PNG, sans écraser les références précédentes. Ces versions restent proposées et ne remplacent pas le Master Shell verrouillé. MF-03 affiche les montants à 0 HTG et un état vide; MF-15 conserve les paramètres à zéro et le nouvel accordéon de prise d’effet. Revue d’intégration visuelle encore requise.

