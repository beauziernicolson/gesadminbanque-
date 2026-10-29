# Captures QA

Captures réelles du mode aperçu vide :

- `admin-vue-generale-1440x1000.png` — desktop.
- `admin-vue-generale-834x1112.png` — tablette.
- `admin-vue-generale-390x844.png` — mobile.
- `admin-plans-nouveau-1440x1000.png` et `admin-plans-nouveau-390x844.png` — formulaire multi-section dans le shell MF-00; captures de production locale sans données.
- Une capture mobile 390×844 existe pour chacune des 32 routes d’administration MF-03 à MF-34; chaque capture rapporte `scrollWidth` égal au viewport et aucun élément débordant hors des zones de défilement prévues.
- `admin-*-1440x1000.png` — captures desktop des mêmes 32 routes; Chrome DevTools ne signale aucun débordement hors des zones de défilement prévues.
- `connexion-1440x1000.png` et `connexion-390x844.png` — connexion, sans identifiants préremplis.
- `admin-notifications-1440x1000.png` — écran notifications desktop, mode aperçu sans données.
- `admin-notifications-390x844.png` — écran notifications mobile, filtres neutres et sans débordement viewport.
- `admin-notifications-720x900.png` — reflow Notifications après correction; recherche et trois filtres passent sur deux rangées sans débordement.
- `admin-membres-1440x1000.png` et `admin-membres-390x844.png` — liste vide.
- `admin-tresorerie-1440x1000.png` et `admin-tresorerie-390x844.png` — quatre valeurs initiales à `0 HTG`, non confirmées.
- `admin-grand-livre-1440x1000.png` et `admin-grand-livre-390x844.png` — soldes initiaux à `0 HTG`, non confirmés.
- `admin-echeances-1440x1000.png` et `admin-echeances-390x844.png` — valeurs initiales à `0 HTG`, sans date d’échéance.
- `admin-plans-1440x1000.png` et `admin-plans-390x844.png` — catalogue sans plan fictif.
- `admin-roles-permissions-1440x1000.png` et `admin-roles-permissions-390x844.png` — rôles et permissions vides.
- Les routes dossier ont aussi des captures bureau; membre, KYC et support ont des captures mobiles.

Chrome DevTools confirme que le formulaire de plan ne déborde pas du viewport à 1440 × 1000 ni à 390 × 844. Les six champs numériques rendus valent `0`; les montants sont en HTG. MF-15 est inclus dans la planche de comparaison desktop avec ses sections avancées repliées, état par défaut de l’application. Les 34 écrans de MF-01 à MF-34 ont une référence mobile ou une planche responsive; MF-02, MF-05, MF-06 et MF-07 restent des propositions non verrouillées. Aucun enregistrement utilisateur ou financier n’est présent.

Le build final sans `NEXT_PUBLIC_GES_PREVIEW_MODE=true` a aussi été lancé localement : `/admin/plans/nouveau` répond avec la barrière « Accès non disponible » tant que l’autorisation GES n’est pas confirmée.

`check-empty-search.cjs` saisit une recherche dans la liste des membres et confirme l’état « Aucun résultat » sans créer de ligne.

`contact-sheets.cjs` produit les planches de contrôle visuel des Master Frames dans `frame-review/`; MF-33 v1 a été rejeté pour incohérence de marque et de filtre présélectionné, puis corrigé en v2.

`app-desktop-contact-sheets.cjs` compose deux planches pour comparer les captures desktop du frontend entre elles (`frame-review/app-desktop-01.png` et `app-desktop-02.png`). L’étape MFA n’est pas capturée avec une session simulée; son affichage attend la configuration Supabase et un facteur réel.

`compare-master-frames.cjs` apparie 33 captures desktop avec leurs références MF-01 et MF-03 à MF-34; les planches de comparaison se trouvent dans `frame-review/app-vs-reference/`. MF-21 v2 corrige l’item actif de la sidebar, désormais « Financements », puis la planche `comparison-05.png` a été régénérée et inspectée. MF-34 a aussi été mis à jour pour inclure la ligne sélectionnée et le menu ouvert, sans action réelle. La revue a entraîné des ajustements MF-08 (6 KPI en 3×2 et devise USD indisponible), MF-13 (panneau de rapprochement), MF-20 (calendrier sans dates fictives), MF-29 (rôles et matrice visibles ensemble) et MF-01 (logo officiel). La revue visuelle des neuf planches est terminée; MF-02 reste non comparé en navigateur sans session MFA réelle.

`repair-master-readme-encoding.cjs` vérifie et corrige l’encodage français du registre `master-frames/README.md` sans modifier les sources déjà accentuées correctement. Exécution : `node design/qa/repair-master-readme-encoding.cjs`; résultat courant : zéro marqueur suspect.

## Audit d’accessibilité — première passe complète automatisée

La passe a contrôlé 33 routes (connexion et les parcours MF-03 à MF-34) à 320, 390, 720, 834 et 1440 px. Le rapport `accessibility-audit-latest.json` consigne zéro contraste de texte sous les seuils calculés, zéro contrôle sans nom dans l’arbre d’accessibilité Chromium, zéro valeur numérique différente de `0` et zéro débordement hors des zones défilables prévues. Le contrôle `check-mobile-drawer.cjs` vérifie à 390 px le dialogue modal, l’inertie du fond, le piège Tab/Maj+Tab, les fermetures Échap et fond, la restauration du focus et un ratio de 5,56:1 sur l’état vide. `audit-accessibility.cjs` est le contrôle reproductible.

Cette passe ne remplace pas une validation manuelle avec lecteur d’écran. Le vrai écran MFA et les états d’erreur après authentification n’ont pas été ouverts sans compte et facteur TOTP configurés; le zoom natif du navigateur n’a pas été piloté (720 px CSS sert de contrôle de reflow équivalent). Les annonces des états dynamiques restent à examiner avec un lecteur d’écran.

Pour reprendre une capture, ouvrir la route cible dans Chrome avec le port de débogage activé et lancer :

```powershell
& 'design/tooling/node-runtime/node-v24.22.1-win-x64/node.exe' 'design/qa/capture-mobile.cjs' '/admin/vue-generale' 9223 390 844
```

Le script reçoit la route, le port DevTools, la largeur puis la hauteur, et accepte un cinquième argument facultatif pour le port de l’application (3010 par défaut); il enregistre un PNG et affiche les métriques, débordements hors viewport et valeurs numériques par défaut.

## Reprise du 28 octobre 2026

Les neuf planches comparison-01.png a comparison-09.png ont ete regenerees apres la capture actualisee de MF-08 v2. comparison-02.png a ete inspectee : les six montants initiaux sont 0 HTG a confirmer; USD, la tendance, les obligations et les alertes de rapprochement restent indisponibles faute de source. La comparaison montre encore des ecarts de geometrie et de densite sur plusieurs ecrans; la regeneration des planches ne vaut pas validation visuelle complete.

Verification finale : npm run typecheck et npm run build ont reussi le 28 octobre 2026, avec le mode preview non active. Les actions restent fermees sans autorisation serveur confirmee.

Audit des sources TypeScript : aucun montant metier positif ni aucune date d operation ne sont codes en dur dans les routes, composants et adaptateurs. Les six champs numeriques du formulaire de plan ont defaultValue=0; sa devise est HTG. Les autres nombres reperes sont des dimensions d interface ou des parametres de formatage.

References responsive ajoutees ensuite : MF-09 v2 Tresorerie et MF-10 Transactions. La capture mobile MF-10 apres correction rapporte largeur et scrollWidth de 390 px et aucun debordement. La comparaison design/application est dans frame-review/MF-10-transactions-mobile-review.png; l etat affiche Donnees de transaction indisponibles car aucune source autorisee n est connectee. Ces propositions restent non verrouillees. MF-09 a quatre cartes 0 HTG non confirmees; sa capture et sa comparaison sont dans admin-tresorerie-390x844.png et frame-review/MF-09-treasury-mobile-review.png.

MF-11 possede maintenant une proposition mobile, comparee a la capture admin-transactions-dossier-390x844.png dans frame-review/MF-11-transaction-detail-mobile-review.png. La proposition reprend le detail indisponible, le retour aux transactions, l avertissement d autorisation et les sections du Master Frame; elle ne montre aucune transaction selectionnee ni montant fictif. La reference reste a verrouiller.

MF-12 depots et retraits a une proposition mobile WebP et une comparaison visuelle dans frame-review/MF-12-deposits-withdrawals-mobile-review.png. La capture admin-depots-retraits-390x844.png rapporte largeur et scrollWidth de 390 px, sans debordement. Le texte vide a ete remplace par Donnees operationnelles indisponibles pour distinguer un backend absent d un registre reellement sans operation. La table indique les montants en HTG et ne contient aucune ligne fictive. La reference reste a verrouiller.

MF-13 Grand livre et rapprochement a une proposition mobile et une comparaison dans frame-review/MF-13-ledger-reconciliation-mobile-review.png. La capture admin-grand-livre-390x844.png rapporte 390 px de largeur et aucun debordement. Les deux soldes visibles sont 0 HTG et etiquetes Valeur initiale a confirmer; le tableau ne contient aucune ecriture et les colonnes debit/credit sont en HTG. Le titre de page a ete aligne sur le Master Frame.

MF-14 Catalogue des plans a une proposition responsive et comparaison dans frame-review/MF-14-plans-catalog-mobile-review.png. L etat vide a ete aligne sur Donnees des plans indisponibles; aucun rendement, duree, plan ou montant fictif n est affiche. Le CTA Nouveau plan reste visible. La saisie de plan est separee, en HTG, avec ses six champs numeriques a zero. La reference reste non verrouillee.

MF-16 Souscriptions a une proposition mobile comparee dans frame-review/MF-16-subscriptions-mobile-review.png. La capture rapporte 390 px de largeur et aucun debordement lors de la capture initiale; apres le changement du texte de description, une nouvelle capture visuelle confirme la structure et le message Donnees de souscription indisponibles. La table nomme MONTANT INVESTI (HTG) et ne montre aucun plan, membre, date, souscription ou montant fictif. Reference non verrouillee.

MF-17 Detail de souscription v2 a ete revue cote a cote avec admin-souscriptions-dossier-390x844.png dans frame-review/MF-17-subscription-detail-mobile-review-v2.png. La v2 respecte le defilement mobile et montre les premieres sections sans compresser tout le detail. L engagement financier est indique HTG mais laisse indisponible, sans le transformer en zero; aucune identite, date, montant, document ou statut n est invente. Les actions restent indisponibles sans souscription reelle et autorisation confirmee.

MF-18 Contrats d investissement a une proposition mobile et une comparaison dans frame-review/MF-18-contracts-mobile-review.png. Chrome DevTools rapporte 390 px de largeur, scrollWidth 390 px et aucun debordement hors zones defilables. Le principal est libelle HTG; aucun contrat, membre, plan, montant, date ou statut fictif n est present. Le titre correspond maintenant au Master Frame et l etat vide precise la dependance a une source autorisee.


MF-19 Détail de contrat a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-19-contract-detail-mobile-review.png, à partir de admin-contrats-dossier-390x844.png. Les sections du Master Frame sont conservées, dont le capital en HTG; aucun contrat n’est sélectionné et aucun montant, taux, date, durée ou intérêt fictif n’est affiché. La proposition reste non verrouillée.


MF-22 Risques et alertes a une proposition mobile de 852 × 1846 px et une comparaison visuelle dans frame-review/MF-22-risks-alerts-mobile-review.png, à partir de admin-risques-390x844.png. Les filtres sont neutres et l’état indique que les données de risque sont indisponibles. Aucune alerte, sévérité, identité, date, opération ou somme fictive n’est affichée; la proposition reste non verrouillée.


MF-23 Détail d’incident a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-23-incident-detail-mobile-review.png, à partir de admin-risques-incident-390x844.png. L’état précise qu’aucun incident n’est sélectionné; les premières sections n’affichent aucune sévérité ni donnée fictive. La proposition reste non verrouillée.


MF-24 Assistance et tickets a une proposition mobile de 852 × 1846 px et une comparaison visuelle dans frame-review/MF-24-support-tickets-mobile-review.png, à partir de admin-support-390x844.png. Les filtres restent neutres et l’état précise que les données d’assistance sont indisponibles faute de source autorisée; aucun ticket fictif n’est affiché. La proposition reste non verrouillée.


MF-25 Conversation d’assistance a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-25-support-conversation-mobile-review.png, à partir de admin-support-conversation-390x844.png. Aucun ticket n’est sélectionné; la réponse est désactivée et les données client, références GES, notes, affectation et actions de résolution restent indisponibles. Aucun message ou détail fictif n’est affiché. La proposition reste non verrouillée.


MF-26 Documents et notifications a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-26-documents-notifications-mobile-review.png, à partir de admin-documents-390x844.png pour la section documentaire. Les sections Documents et Notifications sont séparées; leurs états indiquent que les données sont indisponibles sans source autorisée. Aucun document ou message fictif n’est affiché. La proposition reste non verrouillée.


MF-27 Rapports et analyses a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-27-reports-mobile-review.png, à partir de admin-rapports-390x844.png. Les sélecteurs de rapport et de période restent neutres; les données analytiques et rapports sont indisponibles. Aucun chiffre, graphique, date ou montant fictif n’est affiché. La proposition reste non verrouillée.


MF-28 Équipe et administrateurs a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-28-team-mobile-review.png, à partir de admin-equipe-390x844.png. Elle reprend les informations MFA, date d’invitation et activité récente tout en les laissant indisponibles, comme les comptes, faute de source autorisée. Aucun utilisateur ou état d’accès fictif n’est affiché. La proposition reste non verrouillée.


MF-29 Rôles et permissions a une proposition mobile de 830 × 1894 px et une comparaison visuelle dans frame-review/MF-29-roles-permissions-mobile-review.png, à partir de admin-roles-permissions-390x844.png. Les rôles et capacités restent indisponibles; aucun droit n’est simulé et la vérification par le serveur est rappelée. La proposition reste non verrouillée.


MF-30 Audit administratif a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-30-audit-mobile-review.png, à partir de admin-audit-390x844.png. La recherche et les filtres d’action, d’acteur et de période restent neutres; les événements sont indisponibles faute de source autorisée. Aucun acteur, événement, résultat ou horodatage fictif n’est affiché. La proposition reste non verrouillée.


MF-31 Paramètres GES a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-31-settings-mobile-review.png, à partir de admin-parametres-390x844.png. Les catégories prévues au brief sont incluses; valeurs et actions restent indisponibles sans source autorisée ni contrat d’administration confirmé. Aucun réglage fictif n’est activé. La proposition reste non verrouillée.


MF-32 Intégration FlexiCash a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-32-flexicash-mobile-review.png, à partir de admin-integrations-flexicash-390x844.png. Le périmètre ne comprend que les liens et opérations GES; comptes, dépôts, retraits, rapprochement, webhooks et erreurs restent indisponibles. Aucune activité FlexiCash interne ou opération fictive n’est affichée. La proposition reste non verrouillée.


MF-33 Notifications administratives a une proposition mobile de 853 × 1844 px et une comparaison visuelle dans frame-review/MF-33-notifications-mobile-review.png, à partir de admin-notifications-390x844.png. Les filtres sont neutres et l’état indique que les données de notification sont indisponibles; aucun contenu, état de lecture, horodatage ou décompte fictif n’est affiché. La proposition reste non verrouillée.


MF-34 États globaux a une proposition mobile de 853 × 1844 px et une comparaison du premier viewport dans frame-review/MF-34-interface-states-mobile-review.png, à partir de admin-etats-interface-390x844.png. Les quatre premiers états restent lisibles et la page indique que d’autres états continuent au défilement. Les confirmations et succès sont des exemples uniquement; aucune opération réelle n’est exécutée. La proposition reste non verrouillée.

Le 29 octobre 2026, la revue de la planche `app-vs-reference/comparison-02.png` a repéré deux états trompeurs : les pages Membres et KYC présentaient leurs listes indisponibles comme « aucun membre/dossier ». Les titres et descriptions indiquent maintenant que les données sont indisponibles faute de source GES autorisée. `npm run typecheck` et `npm run build` ont réussi après les corrections des états vides; le build n’active pas l’aperçu ni ne raccorde de backend. La comparaison manuelle des écarts et l’audit complet d’accessibilité restent ouverts.

Audit clavier/contraste ciblé du 29 octobre : le drawer mobile est maintenant un dialogue modal nommé; le fond devient inerte, le défilement de page est bloqué et le focus reste dans le menu. Échap, le bouton interne et le fond ferment le dialogue; le focus retourne ensuite au bouton d’ouverture. Le contrôle navigateur reproductible `check-mobile-drawer.cjs` a réussi à 390 px : focus initial, bouclage Tab/Maj+Tab, fermeture par Échap/fond et largeur sans débordement. Le texte secondaire de l’état vide mesuré est `rgb(94, 107, 104)` sur blanc, soit 5,56:1. Les petits textes secondaires sur surfaces claires ont été relevés vers cette couleur; cette passe ciblée ne remplace pas encore l’audit complet de contraste, zoom et lecteur d’écran.

Revue MF-01 du 29 octobre : la carte de connexion a été élargie à 650 px, le logo officiel agrandi, les champs et le bouton remontés à l’échelle de la référence, et le CTA renommé « Se connecter ». Le formulaire conserve uniquement le courriel et le mot de passe; aucun faux lien de récupération ni mémorisation de session n’a été ajouté. Les captures de production locale sont `connexion-1440x1000.png` et `connexion-390x844.png`; les deux ont un `scrollWidth` égal au viewport et aucun débordement détecté. La comparaison mise à jour est dans `frame-review/app-vs-reference/comparison-01.png` et confirme une échelle de carte proche du Master Frame MF-01. La capture mobile/desktop actuelle de Membres et KYC est aussi régénérée; largeur 390 px sans débordement.

Reprise QA du 29 octobre : les 32 parcours MF-03 à MF-34 ont été capturés de nouveau en mode aperçu local sans données à `1440 × 1000` et `390 × 844`, puis les neuf planches `frame-review/app-vs-reference/comparison-01.png` à `comparison-09.png` ont été régénérées. Le serveur HTTP a été contrôlé avant capture; toutes les routes ont rendu l’application, et le script a signalé zéro élément débordant. Chaque capture mobile rapporte une largeur de document de 390 px. Les six champs numériques du brouillon de plan valent `0` aux deux tailles; les montants restent en HTG. Le build final a ensuite été reconstruit sans `NEXT_PUBLIC_GES_PREVIEW_MODE=true`; une requête de production à `/admin/plans/nouveau` retourne la barrière « Accès non disponible », tandis que `/connexion` répond normalement. Le build et `typecheck` réussissent. Les planches montrent encore des différences de densité et de géométrie à revoir; ces captures ne constituent pas une validation visuelle complète.

Audit automatisé du 29 octobre, après correction des filtres Notifications : `audit-accessibility.cjs` a visité 33 routes à `320`, `390`, `720`, `834` et `1440` px. Rapport `accessibility-audit-latest.json` : aucune alerte de contraste textuel selon les seuils calculés, de nom manquant dans l’arbre d’accessibilité Chromium, de défaut de landmark/titre, de valeur numérique différente de zéro, de débordement ou de page absente. Les textes secondaires des onglets et de la connexion ainsi que les libellés HTG et Retour aux plans ont été assombris; les filtres Notifications se replient sous `1050` px. La capture 720 px confirme la nouvelle disposition. `check-mobile-drawer.cjs` réussit à nouveau; le formulaire conserve ses six champs à `0`. `tsc --noEmit` et `next build` réussissent avec le mode aperçu désactivé. Sur le serveur de production local, `/admin/plans/nouveau` retourne l’écran « Accès non disponible » et `/connexion` répond 200. Limites restantes : pas de lecteur d’écran réel, de zoom natif navigateur ni de vraie session/facteur MFA.

Références responsive du 29 octobre : MF-01, MF-02, MF-05, MF-06 et MF-07 ont maintenant des sources PNG et des exports WebP listés dans `design/responsive/README.md`. MF-01 reprend la capture réelle mobile de l’application, sans récupération ni mémorisation de session. Les différences mobiles restantes les plus nettes concernent les onglets MF-05 et l’en-tête MF-06; MF-07 garde les décisions désactivées sans dossier confirmé. L’audit automatisé d’accessibilité, la revue desktop des neuf planches et la comparaison des propositions mobiles sont terminés. Restent l’essai au lecteur d’écran, le zoom natif et une session MFA réelle.

Revue visuelle des neuf planches desktop du 29 octobre : `frame-review/app-vs-reference/comparison-01.png` à `comparison-09.png` couvrent MF-01 et MF-03 à MF-34. Les vues de listes et de détail montrent des sources absentes comme indisponibles, sans records ou identités fabriqués; les métriques initiales restent à `0 HTG` avec leur statut de confirmation, et le brouillon de plan garde ses six entrées numériques à zéro avec devise HTG. Les actions de mutation observées restent désactivées tant que les données, l’API et l’autorisation ne sont pas confirmées. Écarts visuels qui subsistent : les panneaux de l’application sont généralement moins hauts et moins denses que dans certaines références, avec une géométrie plus compacte; aucune divergence ne justifie d’ajouter des valeurs ou contenus illustratifs. MF-02 n’a pas de comparaison applicative, car le parcours MFA exige une session et un facteur réels.

Audit de conformité des données du 29 octobre : inspection visuelle du Master Shell v3, des références MF-01 à MF-34 et de leurs états remplacés/actualisés, plus recherche dans `app/`, `components/` et `lib/` pour les champs numériques, valeurs par défaut et jeux d’exemple. Les références financières actives et le formulaire montrent des valeurs `0 HTG` seulement; le brouillon de plan démarre ses six entrées numériques à zéro; aucun taux, montant, date, volume ou identité d’exemple non nul n’est codé comme donnée GES. L’image source `Tableau de bord financier GES.png` contient encore des exemples fictifs en euros, dates et identités; elle sert uniquement de repère visuel, ses exemples ne sont ni repris dans le frontend ni dans les Master Frames livrés. Les anciens brouillons MF-00 restent de l’historique de conception; v3 est la seule version approuvée.

Références révisées le 29 octobre : MF-01 v3 reprend la capture réelle desktop de connexion; MF-01 mobile reprend aussi sa capture réelle 390 × 844, avec les libellés et notes de sécurité exacts, deux champs vides et sans contrôle de récupération/mémorisation. La proposition d’erreur v2 reste à vérifier en capture réelle. MF-15 v2 ajoute le montant maximum et les sections avancées exigées par le brief, avec un état par défaut replié et un état complet ouvert. Les six valeurs numériques (minimum, maximum, taux, durée, frais, intervalle) sont `0`; chaque montant est en HTG, le texte reste vide, la catégorie non choisie et les actions désactivées. `comparison-01.png`, `comparison-04.png`, `comparison-mf15-default.png` et `comparison-mf15-open.png` ont été vérifiées. La référence mobile pleine page MF-15 v2 est comparée à la capture réelle; les différences de shell et de typographie sont consignées. Les propositions restent non verrouillées.

Contrôle d’accès du 29 octobre : le shell admin exige une session `getClaims` valide, AAL2, un compte GES actif et les permissions effectives `users:manage` + `transactions:manage` obtenues via RPC GES; les pages n’utilisent aucune clé privilégiée. L’URL et la clé publiable du projet GES actif sont dans `.env.local`, ignoré par Git. TypeScript et le build Next 16.4.3 passent. Les requêtes HTTP locales `/admin/vue-generale`, `/admin/plans/nouveau` et `/admin/etats-interface` retournent la barrière sans session et sans chiffre; `/connexion` reste accessible. Aucun scénario authentifié n’a été simulé.


Revue MF-15 ouverte du 29 octobre 2026 : le formulaire aligne les six paramètres financiers en trois colonnes, garde HTG et des valeurs initiales 0, et présente les cartes Éligibilité, Échéancier et Modèle de contrat sur une rangée. Aperçu et publication occupent la rangée suivante; les deux actions restent désactivées. Capture réelle : admin-plans-nouveau-expanded-1440x1350.png; comparaison avec la référence : comparison-mf15-open.png. Contrôle navigateur : quatre sections ouvertes, six paramètres financiers à 0, texte libre vide, HTG, actions désactivées, largeur de page 1440 px sans débordement horizontal. Les éléments shell et certains espacements restent différents de la référence, donc MF-15 n’est pas verrouillé.

MF-15 mobile pleine page en état par défaut : la nouvelle référence v2 est `../responsive/exports-webp/MF-15-plan-form-responsive-v2.webp`; comparaison du frame complet et de la capture navigateur dans `frame-review/MF-15-mobile-fullpage-comparison.png`. La capture réelle fait 390 × 1367 px; les six contrôles numériques, dont l’intervalle caché dans son panneau fermé, valent `0`, la devise est HTG, les champs texte restent vides et les deux actions sont visibles et désactivées. Le document mesure 375 px sur le viewport client de 375 px, sans débordement horizontal.

Révision MF-10 du 29 octobre : le panneau de liste ne répète plus le titre et la description, les filtres et l’en-tête de tableau reprennent les libellés de la référence, et l’état vide conserve explicitement l’indisponibilité des transactions. Captures de l’application : `admin-transactions-1440x1000.png` et `admin-transactions-390x844.png`; comparaisons desktop dans `frame-review/app-vs-reference/comparison-03.png` et mobile dans `frame-review/MF-10-transactions-mobile-review.png`. Le contrôle Chrome rapporte un titre « Transactions », l’état de données indisponibles, `scrollWidth` égal à 1440 px et 390 px respectivement; les montants de tableau restent libellés en HTG et aucune transaction n’est inventée. La comparaison mobile laisse des écarts de shell et de copie avec la proposition; MF-10 reste à revoir, non verrouillé.

Reverification MF-15 du 29 octobre : états desktop replié (1440 × 1100), ouvert (1440 × 1350) et mobile pleine page (390 × 1367) capturés. Comparaisons desktop `comparison-mf15-default.png` et `comparison-mf15-open.png`; comparaison mobile `frame-review/MF-15-mobile-fullpage-comparison.png`. Le navigateur confirme HTG, six valeurs numériques à zéro, saisies textuelles vides, exactement deux actions visibles et désactivées, et les quatre panneaux dans l’état attendu. Pas de débordement horizontal; shell et typographie conservent des écarts visuels, les références restent proposées.


Revue MF-14 : les captures admin-plans-1440x1000.png et admin-plans-390x844.png couvrent le catalogue vide. Le filtre secondaire est Trier par, aucun plan fictif n'est affiche, et Chrome DevTools confirme l'absence de debordement de page aux deux largeurs. Sur 390 px, le tableau possede un defilement horizontal interne.

Captures MF-16 : admin-souscriptions-1440x1000.png et admin-souscriptions-390x844.png. La liste reste vide tant qu'aucune source GES autorisee ne fournit les donnees; les montants sont libelles en HTG. Les neuf planches MF-01 a MF-34 ont ete regenerees apres les changements de MF-14/MF-16.

Captures MF-17 mises a jour : admin-souscriptions-dossier-1440x1000.png et admin-souscriptions-dossier-390x844.png. Le retour precede le titre; huit panneaux restent indisponibles sans souscription reelle et les actions sont inactives. Aucun engagement ni montant fictif.

Captures MF-18 : admin-contrats-1440x1000.png et admin-contrats-390x844.png. Le registre est vide, le principal est libelle en HTG et les filtres de statut, plan et periode restent inactifs sans source de donnees.

Captures MF-19 : admin-contrats-dossier-1440x1000.png et admin-contrats-dossier-390x844.png. Les termes, montants, dates, restrictions, documents et evenements restent indisponibles sans contrat selectionne; aucun chiffre fictif n'est affiche.

Captures MF-20 : admin-echeances-1440x1000.png et admin-echeances-390x844.png. Les deux valeurs financieres sont 0 HTG, marquees valeur initiale; calendrier et liste restent sans date, echeance ni mouvement fictif. La periode n'est pas selectionnee et ses commandes sont desactivees.

Le controle hasUnavailableState de capture-route.cjs reconnait aussi les libelles explicites du catalogue vide (ex. aucun contrat/aucune echeance a afficher), et pas uniquement le mot Donnees.

Captures MF-21 : admin-financements-1440x1000.png et admin-financements-390x844.png. Recherche et filtres restent neutres; aucun dossier de financement fictif. Montant propose identifie en HTG.

Captures MF-22 : admin-risques-1440x1000.png et admin-risques-390x844.png. Aucun risque ou analyste fictif; les filtres restent desactives sans source autorisee.

Captures MF-23 : admin-risques-incident-1440x1000.png et admin-risques-incident-390x844.png. Les donnees d'incident restent indisponibles; notes, escalade et cloture ne permettent aucune saisie ou action sans dossier reel.

Captures MF-24 : admin-support-1440x1000.png et admin-support-390x844.png. Aucun ticket de demonstration, identite ou message; les filtres restent neutres sans source GES autorisee.
Captures MF-25 : admin-support-conversation-1440x1000.png et admin-support-conversation-390x844.png. La conversation vide indique clairement les tickets et details indisponibles; reponse desactivee sans conversation et autorisation confirmees. Aucun identifiant, message, statut, date ou montant fictif.
Captures MF-26 : admin-documents-notifications-1440x1000.png et admin-documents-notifications-390x844.png. La route Documents presente les deux panneaux de la reference; recherche documentaire active, filtre de type et filtre de notifications inactifs faute de source GES. Aucun fichier, notification, identite, date ou montant fictif.
Captures MF-27 : admin-rapports-1440x1000.png et admin-rapports-390x844.png. Rapports et analyses utilisent des filtres inactifs faute de source autorisee; vues analytiques et catalogue restent vides. Aucun chiffre, periode, rapport ou statut fictif.
Captures MF-28 : admin-equipe-1440x1000.png et admin-equipe-390x844.png. Colonnes conformes au Master Frame; aucun administrateur, role, permission ou acces fictif. Recherche disponible, filtres inactifs sans source GES; tableau vide et defilable sur mobile.
Captures MF-29 : admin-roles-permissions-1440x1000.png et admin-roles-permissions-390x844.png. Onglets navigables vers le catalogue et la matrice; aucun role ou droit n'est preconfigure. Les decisions effectives restent sous controle serveur.
Captures MF-30 : admin-audit-1440x1000.png et admin-audit-390x844.png. Recherche et filtres sont visibles, sans date preselectionnee. Le journal reste vide sans evenement autorise; aucun acteur, horodatage ou resultat n'est invente.
Captures MF-31 : admin-parametres-1440x1000.png et admin-parametres-390x844.png. Les quatre groupes restent indisponibles sans source autorisee; Enregistrer est desactive sans contrat confirme. Aucun taux, devise ou reglage fictif.
Captures MF-32 : admin-integrations-flexicash-1440x1000.png et admin-integrations-flexicash-390x844.png. Seules les donnees d’integration et operations GES sont prevues; aucun controle interne FlexiCash, compte, webhook, statut ou transaction fictif.
