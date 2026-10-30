# Audit complet du dashboard FlexiCash vers GES Admin

Date : 30 octobre 2026  
Périmètre : audit en lecture seule du frontend d’administration FlexiCash dans GitHub et examen des métadonnées du backend FlexiCash dans Supabase; adaptation des éléments utiles au frontend GES uniquement.

## Sources examinées

- Dépôt privé [`beauziernicolson/FlexiCash`](https://github.com/beauziernicolson/FlexiCash), branche `main`.
- Dépôt public [`beauziernicolson/FlexiCash-Administration`](https://github.com/beauziernicolson/FlexiCash-Administration) : vitrine de revue, pas l’interface d’administration complète.
- Projet Supabase `flexicash-staging` (`kriljwmhofiqblerzgti`) : lecture des métadonnées de schémas, privilèges et fonctions; aucune ligne métier n’a été consultée; aucune mutation ni migration exécutée.
- Dépôt GES Admin [`beauziernicolson/gesadminbanque-`](https://github.com/beauziernicolson/gesadminbanque-), branche `main`.

## Couverture frontend FlexiCash

Le répertoire `admin/` contient 39 entrées : 32 écrans d’administration, manifeste RPC et liste de tâches, ainsi que 5 pages de scénarios E2E/remboursement. Les pages de production partagent un shell et un initialiseur communs; les écrans métier réels sont rendus par `assets/js/pages/admin-pages.js` et des modules spécialisés. Les styles d’administration résident dans `assets/css/admin.css` et les feuilles adaptatives associées.

| Espace FlexiCash audité | Parcours / contrôles observés | Correspondance GES |
| --- | --- | --- |
| Tableau de bord | Fenêtres aujourd’hui / 7 jours / 30 jours, indicateurs, file « à traiter », activité administrative récente, recherche globale et accès par indicateur. | Vue générale et vue financière; période locale, raccourcis KPI et recherche locale de rubriques GES. |
| Utilisateurs, profils, portefeuilles | Recherche et filtres de statut/KYC/role, pagination, détails, état du compte, environnement financier, appareils et révocation. | Membres, fiche membre, KYC et onglets de sécurité/documents; aucune fiche ou donnée membre inventée. |
| Équipe et accès | Gestion des administrateurs, niveau d’accès, MFA, vérification de permission avant affichage des contrôles d’équipe. | Équipe, rôles et permissions; présentation seulement, toute mutation reste dépendante d’une autorisation backend GES. |
| Transactions, dépôts/retraits, activations, grand livre, rapprochement | Files par statut, période et type; détails, export CSV, preuves temporaires, rapprochement et alertes. | Transactions, dépôts/retraits, trésorerie et grand livre; files vides tant que la source GES ne fournit rien. |
| KYC et limites Basic | Assignation, filtres de dossier/document/completude, comparaison d’informations, révision avec preuve et décision. | File KYC, détail de dossier et conformité; les décisions restent désactivées sans API et autorisation GES. |
| Litiges, incidents, risques et récupérations | Priorité, sévérité, assignation, pièces de preuve, chronologie, motif de décision et seconde validation de récupération. | Risques, fiche incident, support et audit; motifs et états de revue peuvent inspirer le parcours, mais aucune action sensible n’est activée. |
| Support, notifications, annonces | Tickets assignés, notes internes séparées des réponses client; création et diffusion d’annonces. | Support, documents et notifications; aucun ticket ni destinataire fictif. |
| Produits et opérations de portefeuille | Profils, devises, niveaux, activation, ordre, niveaux par défaut; frais, plafonds, règles par opération, documents requis, promotions, demandes d’évolution et ajustements. | Nouveau plan GES : seul le principe utile de versionnage des conditions avec date d’effet est repris; les options propres aux wallets ne sont pas transposées. |
| Fournisseurs, marchands, clés, webhooks, récompenses | Comptes partenaires, clés API/secrets, événements webhook, paiements et retraits sandbox, récompenses/parrainages. | Pas de correspondance suffisamment justifiée dans le périmètre GES actuel; non repris. |

### Architecture et visuel observés

- Le shell partagé fournit navigation par groupes, profil d’administrateur, recherche globale, badge de tâches en attente, modales, confirmations, toasts et états de chargement/erreur/absence.
- Les pages utilisent tableaux, filtres et détails, avec des adaptations mobiles et états visuels de statut.
- Les actions sensibles demandent un motif, une authentification MFA ou un identifiant d’intention; les documents privés sont ouverts via un lien temporaire.
- Le langage visuel FlexiCash et ses couleurs de marque restent propres à FlexiCash. GES conserve ses composants, sa palette et ses libellés.

## Fonctions adaptées au frontend GES

- Les KPI du tableau de bord ouvrent les rubriques GES correspondantes.
- Le choix local de période propose Aujourd’hui, 7 jours et 30 jours.
- La recherche globale retrouve les rubriques GES du menu; elle ne cherche pas de membres ou d’opérations, car aucun index GES n’est connecté.
- Les filtres de file du tableau de bord et des listes permettent de parcourir les options de l’aperçu; ils ne prétendent pas filtrer des dossiers réels.
- Les onglets de fiche membre naviguent entre aperçu, investissements, transactions, contrats, sécurité, documents et assistance; chaque panneau non alimenté indique clairement l’indisponibilité.
- Le formulaire de plan GES comprend un champ vide de date de prise d’effet et explique le versionnage des conditions; il reste un aperçu local et n’enregistre pas la date.
- Les rubriques GES gardent leurs états vides, sans valeurs d’exemple.

## Frontières de données et sécurité

- Aucune fonction RPC, clé, webhook, action de wallet ou logique financière FlexiCash n’est réutilisée dans GES.
- Les actions GES qui demandent une source et une permission restent désactivées.
- La devise financière du formulaire GES reste HTG; les champs numériques initiaux restent à zéro et les dates à blanc.
- Aucun membre, transaction, solde, tendance, échéance, dossier ou événement fictif n’est ajouté.

## Observations Supabase

- 338 fonctions `public.admin_*` ont été recensées. Leur présence ne signifie pas qu’elles sont destinées à GES ou autorisées depuis un client GES.
- Les tables du schéma `public` examinées ont RLS activé, sauf `public.user_legal_consents`.
- Pour `user_legal_consents`, RLS est désactivé, mais les rôles `anon` et `authenticated` n’ont pas de privilège SELECT; cette vérification n’établit pas d’accès direct client.
- Les schémas internes examinés n’ont pas le privilège USAGE pour les rôles clients. L’examen exhaustif des droits table par table sur chaque schéma interne n’était pas l’objet de l’adaptation frontend.
- Les outils MCP de listing des Edge Functions et des advisories n’étaient pas disponibles pendant l’audit.

## Fichiers GES concernés

- `components/admin-shell.tsx` : navigation globale, période du dashboard et KPI.
- `components/module-workspace.tsx` : filtres locaux et états vides des files.
- `components/detail-workspace.tsx` : onglets du dossier membre.
- `components/plan-form.tsx` : aperçu de la version et de la date d’effet.
- `app/globals.css` : styles des recherches et filtres.

Les contrôles de démonstration devront être reliés à des API et permissions GES validées avant toute utilisation opérationnelle.
