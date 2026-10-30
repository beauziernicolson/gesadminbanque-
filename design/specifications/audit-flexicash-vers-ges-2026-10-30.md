# Audit FlexiCash → GES Admin

Date : 30 octobre 2026  
Périmètre : lecture du frontend FlexiCash via GitHub et métadonnées backend via Supabase; adaptation des motifs utiles au frontend GES.

## Sources examinées

- Dépôt privé `beauziernicolson/FlexiCash` : interface d’administration réelle dans `admin/*.html`, `assets/js/pages/admin-pages.js`, les pages spécialisées d’administration et `assets/js/services/admin-service.js`.
- Dépôt public `beauziernicolson/FlexiCash-Administration` : vitrine de revue; il ne contient pas les fonctions d’administration privilégiées.
- Projet Supabase `flexicash-staging` (`kriljwmhofiqblerzgti`) : inspection en lecture seule des schémas, privilèges et fonctions. Aucune ligne métier consultée, aucune mutation ni migration exécutée.
- Projet GES Admin ciblé : `beauziernicolson/gesadminbanque-` (`main`).

## Motifs FlexiCash repris pour GES

- Choix de période sur le tableau de bord.
- Indicateurs ouvrant la rubrique opérationnelle correspondante.
- Filtres de file par type, statut, priorité, sévérité et période.
- Onglets de fiche membre pour séparer portefeuille, investissements, transactions, contrats, sécurité, documents et assistance.
- Présentation par files de travail et états vides clairs.

Les contrôles ajoutés à GES servent à parcourir l’aperçu local. Ils ne filtrent aucune donnée réelle et l’interface l’indique. Les rubriques restent celles de GES : membres/KYC, trésorerie, transactions, dépôts/retraits, plans, souscriptions, contrats, échéances, financements, risques, documents, support et audit. Aucun RPC ou flux financier FlexiCash n’est importé.

## Règles de données GES conservées

- Les valeurs monétaires du devis et du tableau de bord sont en HTG.
- Les valeurs initiales restent à zéro.
- Aucun membre, transaction, solde, tendance, dossier ni événement fictif n’est créé.
- Les actions qui exigeraient une autorisation ou une source GES restent indisponibles.

## Observations Supabase

- 338 fonctions `public.admin_*` recensées. Leur présence ne signifie pas qu’elles sont autorisées à être appelées depuis GES.
- Les tables du schéma `public` examinées ont RLS activé à l’exception de `public.user_legal_consents`.
- Pour `user_legal_consents`, RLS est désactivé, mais les rôles `anon` et `authenticated` n’ont pas de privilège SELECT; aucun accès direct client n’a été établi par cette vérification.
- Les schémas internes examinés ne sont pas exposés aux rôles clients par privilège USAGE. Une vérification plus exhaustive des grants de chaque table interne reste distincte de cette adaptation frontend.
- Les outils MCP de listing des Edge Functions et des advisories n’étaient pas disponibles au moment de l’audit.

## Changements frontend

- Raccourcis KPI vers les pages GES correspondantes.
- Choix local Aujourd’hui / 7 jours / 30 jours.
- Filtres interactifs d’aperçu dans le tableau de bord et les listes génériques.
- Onglets interactifs sur la fiche membre, avec états indisponibles explicites.
- Indication visible que les filtres sont locaux en l’absence de données GES.

Les contrôles devront être reliés à des API et permissions GES validées avant toute utilisation opérationnelle.
