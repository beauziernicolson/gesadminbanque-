# Audit des sources GES Admin

**Date de consultation :** 26 octobre 2026.  
**Mode :** lecture seule; aucune branche, donnée, configuration ou backend modifié.  
**Périmètre :** identité frontend GES, référence UX FlexiCash, décision d'architecture et garde-fous de données.

## Architecture et périmètre retenus

La page Notion « GES — Architecture Canonique — V1 » précise que l'administration définitive doit être construite dans un dépôt GitHub distinct, sur le même projet Supabase GES; l'administration multipage de `main-backend` est provisoire. Cela concorde avec le dossier de travail indépendant et le brief fourni. Ne pas créer de second projet Supabase, ne pas modifier le frontend de `main`, et ne pas intégrer de règle métier financière dans le nouveau frontend. Sources : [architecture canonique](https://app.notion.com/p/3fd9a163207e8126962ec6e41b58df26), [règles d'architecture](https://app.notion.com/p/3fb9a163207e812cb033e070cc6db6bb).

Le dépôt `beauziernicolson/gesbanque` est privé et possède les branches `main`, `main-backend` et `integration/ges-auth-frontend-main-20261020`. Le navigateur public ne montrait pas son contenu; l'accès GitHub connecté a permis de lire les arbres et fichiers sans écriture. `main` est le frontend existant; `main-backend` contient aussi des pages administratives temporaires et des contrats d'API. Source : [dépôt GES](https://github.com/beauziernicolson/gesbanque).

## Identité visuelle vérifiée

- Tokens GES actuellement versionnés dans `src/styles/tokens.css` : primaire `#625DFA`, survol `#514BE6`, fin de dégradé `#C85EFA`, encre `#07161A`, surface `#F7F9FC`, texte `#515C5E`, bordure et accent doux `#625DFA1A`.
- Chiffres financiers : token `lining-nums tabular-nums`; cartes arrondies et espacements fluides déjà utilisés.
- `src/app/fonts.ts` charge Space Grotesk. Le dépôt contient également Switzer et Space Grotesk; le contrat historique `docs/contracts/design-system.md` décrit Lato et évoque une référence Bdo Grotesk. Il existe donc une divergence documentaire à résoudre avant de verrouiller la police du nouvel admin.
- Le contrat GES-00 décrit les composants de base (boutons, champs, états de feedback, badges et formatage monétaire). Il indique que les montants sont formatés côté interface seulement et ne constituent pas une opération financière.
- Les routes admin de `main` réutilisent `WorkspaceShell`, dont la navigation est une colonne de contenu adaptable; ce n'est pas la sidebar fixe sombre de l'image locale. L'écran de référence local reste utile comme direction de composition, tandis que la maquette future doit confirmer explicitement son shell dédié.
- Le dépôt contient `public/images/ges-logo-transparent.png` (1402 × 1122 px, PNG transparent), copié sans modification dans `design/assets/source/ges-logo-transparent.png`. `docs/HEADER_DESIGN_DECISION.md` confirme que ce fichier est le logo fourni par l'utilisateur et que le frontend GES le préserve. Il affiche un emblème bancaire vert/jaune et le texte « GES S.A. — Inclusion Financière ». La capture locale affiche une variante violette « GES — Global Economic Services »; cette capture est une référence de composition et contient des contenus de démonstration, donc le logo ne doit pas être découpé depuis celle-ci. Pour le Master Shell, l'asset utilisateur du dépôt est retenu comme source officielle; sa palette peut coexister avec les tokens applicatifs violets sans recolorer le logo. Le PNG est une source, pas un asset final; il reste à exporter en WebP si cette version est approuvée.

Sources frontend : [`src/styles/tokens.css`](https://github.com/beauziernicolson/gesbanque/blob/main/src/styles/tokens.css), [`src/app/fonts.ts`](https://github.com/beauziernicolson/gesbanque/blob/main/src/app/fonts.ts), [`docs/contracts/design-system.md`](https://github.com/beauziernicolson/gesbanque/blob/main/docs/contracts/design-system.md), [`src/components/layouts/workspace-shell.tsx`](https://github.com/beauziernicolson/gesbanque/blob/main/src/components/layouts/workspace-shell.tsx).

## Données à ne pas reprendre dans le nouveau projet

Le tableau de bord existant de `main` définit en dur des files, des courbes et des cartes de démonstration non nulles; il affiche un bandeau « Données fictives — environnement de démonstration ». Cette transparence ne suffit pas pour le nouveau mandat : **aucun chiffre fictif ne doit être repris**, même étiqueté Démo. Les états initiaux financiers seront zéro HTG; les événements et listes seront vides tant qu'une source réelle ne les fournit pas. La capture `Tableau de bord financier GES.png` contient également des valeurs et des identités d'exemple; ne pas les réutiliser ni les transmettre au générateur d'images.

La passation canonique du 26 octobre indique que certains rails GES Sandbox sont HTG-only, que USD n'est pas validé de bout en bout et qu'il ne faut pas convertir une devise implicitement. Le devis du nouvel admin doit rester en HTG conformément à la demande utilisateur; toute autre présentation monétaire attend un contrat fonctionnel réel et ne change pas cette règle de devis. Sources : [passation prioritaire du 26 octobre](https://app.notion.com/p/4059a163207e8141bf67e9fa31e081a6), [contrat de tableau de bord](https://github.com/beauziernicolson/gesbanque/blob/main/src/components/pages/admin-dashboard/dashboard.tsx).

### Contrats administratifs read-only examinés sur `main-backend`

- `GET /api/ges/demo/admin/temporary` est une route de lecture seule pour l'administration provisoire. Elle vérifie côté serveur `users:manage` et `transactions:manage`, session admin et MFA AAL2; l'option sécurité exige aussi `audit:view`. La clé service-role ne quitte jamais le serveur. Les réponses ont `private, no-store`; aucune méthode POST n'est exposée par cette route.
- Les pages temporaires documentées couvrent vue générale, membres/modes, opérations, investissements, sécurité et système. Elles lisent les lignes persistées et séparent les statuts fournisseur, crédit GES réellement confirmé et mouvement réellement comptabilisé. En erreur, elles effacent les valeurs précédentes.
- La route est expressément temporaire et supprimable lorsque l'admin définitif sera prêt. Il s'agit donc d'une preuve de contrat existant, pas d'une API durable garantie pour le nouveau dépôt. Avant intégration, le propriétaire du backend doit confirmer la route de lecture finale ou publier un contrat stable; ne pas copier la clé serveur, les fonctions financières ni les migrations.
- Le contrat mode compte prévoit `GET/POST /api/ges/demo/admin` pour lire le snapshot d'un membre ou basculer le mode entier avec autorisations et garde-fous. Cette action change l'environnement du compte et ne déplace pas d'argent; elle ne doit être implémentée que si la portée métier de l'admin final la demande. Cette mission n'a apporté aucune mutation backend.

Sources : [contrat de l'admin technique provisoire](https://github.com/beauziernicolson/gesbanque/blob/main-backend/docs/backend/GES_TEMPORARY_ADMIN_MAIN_BACKEND_20261025.md), [route temporaire read-only](https://github.com/beauziernicolson/gesbanque/blob/main-backend/src/app/api/ges/demo/admin/temporary/route.ts), [contrat de bascule du mode financier](https://github.com/beauziernicolson/gesbanque/blob/main-backend/docs/backend/GES_ADMIN_FINANCIAL_MODE_SIMPLE_SWITCH_20261025.md).

## Référence UX FlexiCash

L'administration FlexiCash utilise un shell dense de type SaaS : sidebar de largeur constante, topbar collante avec recherche et profil, filtres et tables opérationnelles, files de travail et états distincts. Son CSS desktop documente une sidebar de 252 px et une topbar de 64 px. Ces motifs sont des références fonctionnelles seulement. L'identité GES garde sa palette et son style propres; les couleurs vert/émeraude de FlexiCash ne sont pas importées.

Sources : [`admin/dashboard.html`](https://github.com/beauziernicolson/Flexicash/blob/main/admin/dashboard.html), [`assets/css/admin.css`](https://github.com/beauziernicolson/Flexicash/blob/main/assets/css/admin.css). La page charge des données de démonstration et ne constitue pas une source de chiffres GES.

## Conséquences pour le Master Shell

1. Conserver les tokens violets GES et ses chiffres tabulaires; traiter Space Grotesk comme la piste actuelle, avec divergence Lato/Bdo consignée.
2. Afficher le montant `0 HTG` par défaut, sans USD, séries, taux, périodes chiffrées, statuts d'opérations ou compteurs inventés.
3. Utiliser des listes vides et des graphiques sans série lorsque l'API ne fournit aucune donnée.
4. Présenter le Master Shell comme brouillon; le logo provisoire de v1/v2 a été remplacé dans v3 par le logo officiel fourni. Aucun contrôle d'opération financière n'est présenté.
5. Utiliser le logo fourni et enregistré dans le dépôt comme source officielle; ne pas extraire la marque de la capture de dashboard. Ne pas coder les écrans jusqu'à validation explicite du Master Shell, puis raccorder seulement les contrats backend autorisés et documentés.

## Éléments non vérifiés

Les sources Notion sont des passations d'état; leurs instantanés décrivent un moment donné et ne prouvent pas l'état backend actuel. Une vérification Supabase en lecture seule a confirmé que le projet `jaxljncwyivnpgfoniij` est sain et que les RPC `get_my_access_state()`/`get_my_permissions()` sont exécutables par `authenticated`; les RPC admin de snapshot sont réservés à `service_role`. Aucune donnée métier n'a été interrogée ou modifiée. L'URL et la clé publiable sont configurées dans `.env.local` local ignoré par Git. Aucun compte administrateur réel n'a été utilisé; aucun flux financier, connexion AAL2, ni endpoint temporaire depuis le domaine admin n'a été testé. Aucune route API métier n'est déclarée intégrée ou opérationnelle sur la seule base de ces lectures.
