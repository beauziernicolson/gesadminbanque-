# GES Admin

Frontend indépendant Next.js / React / TypeScript pour les interfaces d’administration GES. Aucun schéma, donnée, permission, Edge Function ou moteur financier Supabase n’est créé ou modifié par ce projet.

## Développement local

1. Copier `.env.example` vers `.env.local`.
2. Renseigner l’URL et la clé publishable du projet Supabase GES existant. Ne jamais utiliser une clé `service_role` dans le navigateur.
3. Lancer `npm install`, puis `npm run dev`.

Par défaut, l’accès admin est fermé. `NEXT_PUBLIC_GES_PREVIEW_MODE=true` permet un aperçu visuel sans connexion; il ne charge que des états vides et des valeurs initiales à `0 HTG`. Le formulaire de plan est une ébauche locale : ses champs commencent à zéro, sa devise est HTG, et aucun changement n’est enregistré.

## Données et accès

- Aucun compte, événement, montant, taux, solde, date, KPI ou fixture de démonstration n’est inventé.
- Les valeurs initiales `0 HTG` sont explicitement marquées non confirmées.
- L’aperçu ne permet ni publication ni enregistrement.
- La connexion utilise Supabase Auth SSR et le facteur TOTP déjà vérifié du compte; aucun facteur n’est automatiquement créé.
- Une session authentifiée n’accorde pas de permission d’administration. L’application reste fermée tant qu’une règle d’autorisation admin déjà existante n’est pas confirmée et raccordée.
- Les API métier manquantes sont des dépendances; les opérations d’écriture restent désactivées.

## Fichiers de référence

- Suivi : `design/project-status.md`
- Master Frames : `design/master-frames/README.md` et `design/master-frames/exports-webp/`
- Icônes et logo : `design/assets/registry.md`, `public/assets/`
- Références responsive : `design/responsive/exports-webp/`
- Spécifications : `design/specifications/`
