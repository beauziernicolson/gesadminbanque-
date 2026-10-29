# Dépendances de données — GES Admin

**Audit en lecture seule du code de `main-backend` :** 29 octobre 2026.  
**Règle :** le nouveau projet reste frontend. Aucun endpoint, SQL, Edge Function, schéma ou secret backend n'est créé ou modifié ici.

## Contrats administratifs observés

Le shell de cette application vérifie maintenant la session Supabase avec AAL2 et les RPC `get_my_access_state()` et `get_my_permissions()`. Il n'affiche les écrans admin que si le compte retourné est actif et possède `users:manage` ainsi que `transactions:manage`, comme le contrat du snapshot temporaire ci-dessous. Ces RPC ne chargent aucune donnée métier. L'URL GES et la clé publiable sont configurées localement dans `.env.local`, ignoré par Git. Aucun accès avec un compte réel ni aucun chargement métier n'a été testé; en l'absence de configuration ou de session, l'application échoue fermé.

| Contrat | Ce qu'il expose | Limite pour le futur admin |
|---|---|---|
| `GET /api/ges/demo/admin/temporary` | Snapshot agrégé GES temporaire en lecture seule; session et permissions admin serveur, MFA AAL2, `private/no-store`; une vue sécurité demande aussi `audit:view` | Explicitement temporaire et supprimable; le propriétaire backend doit confirmer une route stable pour le dépôt définitif |
| `GET /api/ges/demo/admin/members` | Annuaire restreint pour le sélecteur admin, session + `users:manage` + `transactions:manage` + AAL2 | Contrat seulement pour la console provisoire; ne donne pas accès à un dossier membre complet |
| `GET /api/ges/demo/admin?memberId=…` | Snapshot et préconditions du mode financier d'un membre sélectionné | Données limitées au mode et préconditions décrits par le contrat; ne remplace pas une fiche membre/KYC |
| `POST /api/ges/demo/admin` | Bascule administrative du compte complet entre Démo et Production, avec contrôles backend | Action privilégiée et mutante; aucun mouvement d'argent. N'exposer que si le périmètre final la demande et après confirmation de sa présence sur l'hébergement cible |

Le RPC `ges_service_temp_admin_snapshot_v1(integer)` mentionné dans la migration d'implémentation est accordé uniquement à `service_role`; le RPC sécurité a la même restriction. Le navigateur ne doit donc jamais appeler ces fonctions directement. L'API `GET /api/ges/demo/admin/temporary` vérifie la session et les permissions côté serveur, puis l'appelle avec sa clé privée. Cette API est marquée temporaire et n'est pas raccordée depuis le nouveau projet.

## Endpoints observés qui ne constituent pas des API d'administration

Les routes `/api/ges/demo/wallet`, `/api/ges/demo/investments`, `/api/ges/demo/plans`, `/api/ges/demo/journey`, `/api/ges/demo/withdrawals` et `/api/ges/topups` sont authentifiées pour le **membre** et son propre parcours. Elles ne doivent pas servir d'API d'administration ni être appelées avec un `memberId` choisi par le navigateur. Certaines acceptent des POST métier côté membre; elles ne sont pas autorisées par ce travail comme fonctions financières de back-office.

## Modules sans contrat d'administration confirmé

L'inventaire d'API de `main-backend` contient seulement les routes GES listées dans ce document; aucun contrat admin autonome n'a été trouvé pour une file de KYC, un détail KYC, la trésorerie, un grand livre administrable, un rapprochement, les alertes/risques, les incidents, les documents, les notifications, les rapports, l'équipe/RBAC ou les paramètres organisationnels. Les pages prévues pour ces besoins peuvent recevoir leurs états visuels et vides, mais leurs actions restent désactivées et leur disponibilité documentée jusqu'à publication de contrats approuvés.

Le snapshot temporaire expose quelques agrégats d'opérations, contrats, wallets et états système; cela ne prouve pas que chaque module d'une administration complète dispose de données détaillées, de pagination, de filtres, de droits ni d'actions.

## États de données imposés au frontend

- Avant réponse d'une source confirmée : chaque montant numérique par défaut vaut zéro HTG; les listes sont vides et les graphiques ne tracent rien.
- Réponse authentifiée vide : présenter l'état vide réel et le zéro retourné, sans fabriquer des enregistrements.
- Chargement : skeleton neutre; ne pas montrer une ancienne valeur comme actuelle.
- Erreur/permission manquante/backend non déployé : état d'indisponibilité ou accès refusé. Ne pas substituer un zéro non vérifié à une erreur; ne pas afficher de faux succès.
- Les devis sont exclusivement en HTG. Pas de taux, commission, projection, pourcentage ni conversion implicitement calculés dans le client.
- Les réponses Demo persistées peuvent être affichées seulement si elles proviennent du contrat autorisé et si le mode Demo est clairement identifié. Aucun montant de fixture ou de seed local.

## Sources examinées

- [Route temporaire de snapshot admin](https://github.com/beauziernicolson/gesbanque/blob/main-backend/src/app/api/ges/demo/admin/temporary/route.ts)
- [Route du mode financier membre](https://github.com/beauziernicolson/gesbanque/blob/main-backend/src/app/api/ges/demo/admin/route.ts)
- [Route sélecteur de membres](https://github.com/beauziernicolson/gesbanque/blob/main-backend/src/app/api/ges/demo/admin/members/route.ts)
- [Contrat de l'administration technique provisoire](https://github.com/beauziernicolson/gesbanque/blob/main-backend/docs/backend/GES_TEMPORARY_ADMIN_MAIN_BACKEND_20261025.md)
- [Contrat de bascule du mode financier](https://github.com/beauziernicolson/gesbanque/blob/main-backend/docs/backend/GES_ADMIN_FINANCIAL_MODE_SIMPLE_SWITCH_20261025.md)
- [Migration des permissions effectives lues pour la session courante](https://github.com/beauziernicolson/gesbanque/blob/main-backend/supabase/migrations/20261017223000_ges_be07_authorization_rls.sql)
- [Migration du snapshot temporaire, fonctions réservées à `service_role`](https://github.com/beauziernicolson/gesbanque/blob/main-backend/supabase/migrations/20261025194000_ges_temporary_admin_read_only_ops_v1.sql)

**Non vérifié :** URL du backend canonique, déploiement courant de ses routes, appels réseau authentifiés depuis le domaine admin, configuration URL/clé publishable Supabase de ce workspace et données au moment d'exécution. La lecture de code ne constitue pas une recette d'intégration. L'API administrative observée étant temporaire, elle ne sera pas câblée dans l'application finale avant confirmation d'un contrat stable et du mode de transfert de session entre origines.
