# Contrat frontend des données — GES Admin

Ce contrat traduit les sections 17 et 20 du brief et la consigne utilisateur sur les devis en HTG, les valeurs initiales à zéro et l'interdiction des chiffres fictifs. Il ne crée ni endpoint ni comportement backend.

## États à distinguer

| État | Valeur / contenu | Présentation |
|---|---|---|
| Brouillon neuf | Champs numériques initialisés à `0`; devise du devis `HTG` | Montant formaté `0 HTG`, clairement dans un formulaire de brouillon |
| Chargement | Aucune valeur serveur déclarée actuelle | Skeleton ou indicateur de chargement; pas de chiffres d'exemple |
| Réponse réelle avec zéro | `0` reçu/confirmé de la source autorisée | `0 HTG` comme valeur réelle |
| Réponse réelle sans résultats | Liste vide ou agrégat confirmé à zéro | État vide et total confirmé à zéro |
| Erreur, refus ou API absente | Pas de valeur réelle disponible | Afficher l'erreur, l'accès refusé ou l'indisponibilité; ne pas remplacer par `0` |
| Champ absent/null de la réponse | Pas de valeur reçue pour ce champ | État indisponible/non renseigné; ne pas supposer zéro réel |

Une valeur par défaut de formulaire n'est pas une observation métier. Le frontend ne doit pas présenter un brouillon initialisé à zéro comme un solde, un paiement, un devis accepté ou un résultat confirmé.

## Devis

- La devise par défaut de chaque nouveau devis est `HTG`; elle est visible dans la saisie et reste `HTG` dans le récapitulatif et le total.
- Les champs quantitatifs d'un nouveau brouillon démarrent à `0`. Ne pas ajouter un prix unitaire, un taux de change, des frais, un pourcentage, une taxe ou un montant de ligne fictifs.
- Ne calculer le total que depuis les lignes et paramètres effectivement saisis ou reçus d'une source métier autorisée. Un total initial de brouillon peut afficher `0 HTG`, mais doit rester explicitement un brouillon non confirmé.
- Aucun basculement de devise ni conversion implicite. Les besoins éventuels d'une autre devise hors devis attendent un contrat métier distinct et une source réelle.

## Contrats d'affichage

- Les tableaux de nombres, cartes, totaux et champs utilisent des valeurs issues de l'état de formulaire ou d'une réponse source confirmée; aucun tableau de démonstration ni seed local.
- La donnée manquante ne devient pas zéro par coercition, opérateur de repli (`|| 0`) ou fallback UI. Une valeur réelle explicitement égale à zéro reste distincte de `null`, d'une erreur ou d'un chargement.
- Les collections commencent vides. Les graphiques ne tracent pas de série tant que des points réels ne sont pas reçus; pas de dates, catégories ou tendances construites par le client.
- L'activité récente affiche seulement les événements et dates renvoyés par le contrat autorisé. Aucun nom, statut, identifiant ou horodatage d'exemple.
- Tout statut de mode Demo doit provenir du contrat d'accès confirmé et être identifié comme tel; aucune fixture n'est admissible.

## Sécurité et permissions

- Les vérifications d'identité, de rôle et de permission sont imposées côté serveur par le backend; masquer un bouton dans le navigateur ne constitue pas une autorisation.
- Ne jamais utiliser les endpoints du parcours membre pour consulter d'autres membres ou les transformer en API admin côté client.
- Ne jamais exposer de secret privilégié ou de clé service-role dans le bundle navigateur.
- Tant que le contrat durable d'un module n'est pas confirmé, afficher son état non disponible; les mutations correspondantes ne sont pas implémentées.

## Vérifications à faire lors de l'implémentation

- Parcours de nouveau devis : `HTG`, champs quantitatifs à zéro, total `0 HTG` étiqueté brouillon.
- Valeur source égale à zéro : zéro réel correctement affiché.
- Réponse vide : collections vides et aucun graphique simulé.
- Réponse en erreur ou permission refusée : message d'état, aucune valeur stale ni faux zéro.
- Réponse incomplète : champ absent distingué de zéro confirmé.
- Aucun jeu de données de test visuel ne contient de noms, montants, pourcentages, dates ou compteurs fictifs.

Une partie des contrôles est déjà exécutée: le formulaire de plan démarre à zéro, les listes et graphiques restent vides et les accès sont fermés par défaut. Les vérifications source zéro/null/erreur et les contrats admin par module restent à compléter avant intégration réelle.
