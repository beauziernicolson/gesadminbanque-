# GES Admin — direction visuelle v1 (proposition)

**Statut :** direction artistique et Master Shell MF-00 v3 approuvés et verrouillés le 27 octobre 2026; les autres écrans restent des références de travail.
**Périmètre :** frontend uniquement.  
**Devise des devis et valeurs financières par défaut :** HTG.  
**Règle de données :** valeurs numériques initiales à zéro; aucune donnée de démonstration chiffrée.

## Référence de marque et limites de l'audit

Le brief donne les tokens de départ suivants : violet principal `#625DFA`, violet actif `#514BE6`, accent `#C85EFA`, encre `#07161A`, fond `#F7F9FC`, surface `#FFFFFF`, texte secondaire `#515C5E`, violet doux et bordure légère `#625DFA1A`. La capture locale `Tableau de bord financier GES.png` confirme un shell administratif à sidebar bleu nuit, accent violet, recherche en haut, cartes, graphiques et tableaux.

La capture contient des montants, volumes, dates, taux et identités d'exemple. Ils ne sont pas repris comme contenu ni comme données dans la proposition. L'accès GitHub connecté confirme que `gesbanque` est privé et contient une application Next.js, et que `main` ainsi que `main-backend` existent. L'espace connecté a également permis de lire les pages Notion et les fichiers administratifs de FlexiCash en lecture seule. La documentation canonique confirme que l'administration définitive appartient à un dépôt distinct qui réutilise le Supabase GES existant; ne pas créer une nouvelle base ni fusionner les branches frontend et backend.

L'audit typographique a trouvé une divergence à résoudre dans le design system local : `src/app/fonts.ts` charge actuellement Space Grotesk, `src/fonts` contient aussi Switzer et Space Grotesk, tandis que le contrat historique GES-00 décrit Lato et une source Bdo Grotesk. La direction du Master Shell doit privilégier les fontes et tokens réellement versionnés, puis faire valider toute divergence au regard du contrat GES-00. La présence de Bdo Grotesk seule ne prouve ni son usage actuel ni sa licence pour le nouvel espace.

## Proposition de système

- **Direction :** fintech institutionnelle, calme, lisible, axée opérations; reprendre le violet GES et le contraste du shell local.
- **Typographie :** prendre Space Grotesk comme référence actuelle du frontend GES observé; vérifier la licence des fichiers locaux du dépôt distinct avant réutilisation. Documenter la divergence avec le contrat GES-00 historique (Lato/Bdo Grotesk) et ne pas modifier les tokens globaux du dépôt GES existant. Utiliser des chiffres tabulaires pour les valeurs financières.
- **Géométrie de départ à consolider :** canvas desktop du brief, sidebar fixe, topbar, grille responsive, espacements cohérents et cartes aux bordures fines. Les mesures restent indicatives jusqu'à validation du Master Shell.
- **États :** succès, erreur, avertissement et information utilisent des couleurs sobres avec libellé textuel; ne jamais coder un statut par couleur seule.
- **Responsive :** sidebar transformée en drawer sur petit écran; cartes empilées; tables défilables ou adaptées; commandes tactiles accessibles.
- **Assets :** les exports finaux du frontend sont en WebP. La maquette PNG présente est un brouillon intermédiaire, pas un asset final verrouillé.

## Contrat d'affichage des données

- Tous les devis et montants affichés dans l'interface utilisent HTG par défaut, notamment les saisies, totaux et récapitulatifs de devis.
- Tant qu'une source réelle n'alimente pas un champ numérique, sa valeur initiale est zéro. Format monétaire : `0 HTG`.
- Aucun membre, transaction, taux, pourcentage, date d'activité, volume ou chiffre KPI fictif ne doit être injecté pour rendre un écran plus rempli.
- Les listes sans données utilisent un état vide explicite; le total numérique associé, lorsqu'il existe, reste zéro.
- Les graphiques ne tracent aucune série simulée. En l'absence de données, afficher un état vide ou une grille sans courbe.
- Une valeur absente n'est pas un succès financier. Les actions sensibles restent reliées aux contrats backend vérifiés et doivent refléter leur résultat réel.
- Les devis sont toujours établis en HTG. Ne pas proposer un autre montant de devise comme valeur par défaut; toute devise additionnelle dans un écran non-devis exige un contrat métier et une source réelle, sans conversion implicite.

## Décisions en attente de validation

La direction artistique globale et le Master Shell MF-00 v3 ont été approuvés par l'utilisateur le 27 octobre 2026. Le frontend de ce workspace a depuis été implémenté pour le shell, les vues de modules, les détails, l'accès et la création locale de plan. Les Master Frames MF-01 et MF-03 à MF-34 ont été appariés à des captures desktop; la revue des différences visibles reste partielle, les variantes responsive de référence ne couvrent pas toutes les pages et MF-02 n'a pas été capturé avec une vraie session MFA. Toute nouvelle divergence majeure du Master Shell doit être validée par l'utilisateur. L'audit du frontend GES existant a trouvé des données de démonstration; elles ne sont pas reprises comme données de ce projet. Les valeurs métier restent vides, les champs numériques du plan commencent à `0`, les devis sont en HTG et les mutations restent désactivées sans contrat autorisé confirmé.
