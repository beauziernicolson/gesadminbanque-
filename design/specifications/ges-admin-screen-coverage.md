# Couverture des écrans GES Admin

**Source des exigences :** brief intégral joint, sections 12 à 17 et 21.  
**Application inspectée :** ce workspace `ges-admin`, application Next.js indépendante. Les routes observées ici ne sont pas celles de `gesbanque/main` et ne prouvent pas l’existence d’un contrat backend.  
**Règle de contenu :** aucun enregistrement, montant, personne, date ou état d’opération inventé. Les montants de devis et champs de saisie monétaires sont HTG; les champs numériques de plan sont initialisés à zéro.

| ID | Écran | Route ou composant actuel | Couverture et limite vérifiée |
|---|---|---|---|
| MF-00 | Shell et design system | Toutes les routes admin | Référence v3 approuvée; 32 routes MF-03 à MF-34 capturées en mobile 390×844 et desktop 1440×1000 sans débordement hors zones de défilement; revue des écarts et audit accessibilité encore partiels. |
| MF-01 | Connexion administrateur | `/connexion` | Formulaire Supabase; aucun identifiant prérempli. |
| MF-02 | Vérification MFA | Étape TOTP dans `/connexion` | Challenge TOTP vérifié; pas de route MFA distincte. |
| MF-03 | Centre de commandement | `/admin/vue-generale` | Quatre KPI `0 HTG` explicitement initiaux/non confirmés, graphiques et activité vides. |
| MF-04 | Liste des membres | `/admin/membres` | Liste vide, recherche sans fixtures. |
| MF-05 | Fiche membre | `/admin/membres/dossier` | Détail vide; solde initial `0 HTG` non confirmé, USD indisponible. |
| MF-06 | File KYC | `/admin/kyc` | File vide. |
| MF-07 | Dossier KYC | `/admin/kyc/dossier` | Données indisponibles; décisions désactivées. |
| MF-08 | Vue financière | `/admin/vue-financiere` | Valeurs HTG initiales et données analytiques vides; USD indisponible. |
| MF-09 | Trésorerie | `/admin/tresorerie` | Soldes initiaux non confirmés; mouvements vides. |
| MF-10 | Transactions | `/admin/transactions` | Table vide; montants en HTG. |
| MF-11 | Détail transaction | `/admin/transactions/dossier` | Détail indisponible sans transaction réelle; aucune action financière. |
| MF-12 | Dépôts et retraits | `/admin/depots-retraits` | Liste vide; aucune opération déclenchable. |
| MF-13 | Grand livre et rapprochement | `/admin/grand-livre` | Écritures vides; soldes initiaux HTG non confirmés. |
| MF-14 | Catalogue des plans | `/admin/plans` | Catalogue vide; aucun terme d’investissement fictif. |
| MF-15 | Création de plan | `/admin/plans/nouveau` | Formulaire local avec généralités, éligibilité, échéancier, contrat et aperçu; six entrées numériques à `0`, valeurs monétaires HTG; enregistrement/publication désactivés. |
| MF-16 | Souscriptions | `/admin/souscriptions` | Liste vide; montants HTG. |
| MF-17 | Détail de souscription | `/admin/souscriptions/dossier` | Détail indisponible sans demande réelle. |
| MF-18 | Contrats | `/admin/contrats` | Registre vide; principal HTG. |
| MF-19 | Détail de contrat | `/admin/contrats/dossier` | Valeurs indisponibles sans contrat sélectionné; aucune mutation. |
| MF-20 | Échéances et distributions | `/admin/echeances` | Liste vide; zéros HTG initiaux non confirmés; aucune date inventée. |
| MF-21 | Financements | `/admin/financements` | Dossiers vides; montants HTG. |
| MF-22 | Risques et alertes | `/admin/risques` | Liste vide; aucune alerte ou sévérité fictive. |
| MF-23 | Détail d’incident | `/admin/risques/incident` | Détail indisponible; mutations désactivées. |
| MF-24 | Assistance | `/admin/support` | File vide. |
| MF-25 | Conversation support | `/admin/support/conversation` | Aucune conversation; compositeur et envoi désactivés. |
| MF-26 | Documents et notifications | `/admin/documents`, `/admin/notifications` | Deux routes distinctes; états vides. |
| MF-27 | Rapports et analyses | `/admin/rapports` | Rapports et mesures indisponibles; aucun agrégat simulé. |
| MF-28 | Équipe et administrateurs | `/admin/equipe` | Liste vide; aucune identité ou permission fictive. |
| MF-29 | Rôles et permissions | `/admin/roles-permissions` | État vide; permissions effectives serveur non raccordées. |
| MF-30 | Audit administratif | `/admin/audit` | Journal vide. |
| MF-31 | Paramètres GES | `/admin/parametres` | Valeurs indisponibles; aucune écriture activée. |
| MF-32 | Intégration FlexiCash | `/admin/integrations-flexicash` | État indisponible; pas d’action ni de donnée FlexiCash simulée. |
| MF-33 | Notifications administratives | `/admin/notifications` | Boîte vide; filtres neutralisés; aucune donnée ou badge fictif. |
| MF-34 | États globaux | `/admin/etats-interface` | Galerie des états visuels avec ligne sélectionnée, menu ouvert, succès explicitement illustratif et confirmations sans action déclenchée. |

## État transversal et limites

- Le mode aperçu est strictement sans fixture et sans écriture. Le mode normal échoue fermé lorsque Supabase n’est pas configuré.
- Après authentification, le serveur exige `aal2`, un compte actif, et les RPC GES doivent confirmer `users:manage` et `transactions:manage`. Si la configuration ou les RPC échouent, l’accès est refusé. Ces contrôles n'autorisent pas le chargement d'une donnée métier.
- Aucune API durable d’administration GES n’est confirmée; les listes restent vides et les mutations sont désactivées.
- Une valeur initiale `0 HTG` est étiquetée non confirmée. Une source absente ou une erreur ne doit jamais être interprétée comme un solde vérifié nul.
- Captures desktop/mobile présentes pour les 32 routes MF-03 à MF-34; MF-01 est aussi capturé aux deux tailles et MF-02 attend une vraie session MFA. Les 34 Master Frames ont une référence mobile ou une planche responsive; les variantes non réelles restent non verrouillées. Les planches desktop appairent MF-01 et MF-03 à MF-34; la revue visuelle est terminée et les écarts de densité/géométrie sont documentés. L’audit automatisé navigateur a couvert 33 routes à cinq largeurs sans trouver d’écart dans les contrôles exécutés; un lecteur d’écran, le zoom natif et une vraie session MFA restent à valider. Voir `design/qa/README.md` et `design/project-status.md`.
