# Réponses - TP React-Admin (employes-admin)

## Exercice 1 - Configuration de l'application

### Question 1.1: Que représente le dataProvider dans React-Admin? Quel est son rôle ?
Le `dataProvider` est l'adaptateur (ou la passerelle) entre React-Admin et l'API REST/générique. Son rôle est de traduire les commandes de React-Admin (comme `getList` ou `create`) en requêtes HTTP concrètes (`GET`, `POST`, etc.) adaptées au backend, puis de reformater les réponses pour l'interface.

### Question 1.2: Ouvrez l'onglet Network du navigateur. Quelle requête HTTP est envoyée au chargement de la liste ?
C'est une requête **GET** :  
`GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=5`

---

## Exercice 2 - Liste des employés

### Question 2.1: Que fait la prop rowClick="edit" sur le Datagrid ?
Elle permet de rediriger automatiquement l'utilisateur vers la page de modification (`Edit`) de l'employé lorsqu'il clique n'importe où sur sa ligne dans le tableau.

### Question 2.2: Passez perPage à 2. Que se passe-t-il dans l'interface ?
Le tableau affiche au maximum 2 employés en même temps. Pour voir les autres, il faut utiliser les flèches de la pagination en bas de page.

---

## Exercice 3 - Création d'un employé

### Question 3.1: Que se passe-t-il si vous soumettez le formulaire sans remplir le prénom ?
Le formulaire bloque la soumission, aucune requête HTML n'est envoyée et un message d'erreur rouge "Ce champ est requis" (ou "Required") s'affiche sous le champ concerné.

### Question 3.2: Essayez de saisir un salaire de 500 euros. Que se passe-t-il ?
La validation bloque l'envoi et affiche une erreur sous le champ indiquant que la valeur minimale doit être 1500.

---

## Exercice 4 - Modification d'un employé

### Question 4.1: Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ? Vérifiez dans l'onglet Network.
C'est la méthode **PUT** (ou **PATCH** selon les configurations) envoyée à l'URL spécifique de l'employé, par exemple : `PUT http://localhost:3002/employees/1`.

### Question 4.2: À quel moment useRecordContext() est-il disponible? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?
Il est disponible uniquement si le composant est enfant d'un composant qui fournit des données (comme `<Edit>` ou `<Show>`). Si la requête API est encore en cours et que la donnée n'est pas chargée, il retourne `undefined`.

---

## Exercice 5 - Fiche détail

### Question 5.1: Quelle différence y a-t-il entre SimpleShowLayout et TabbedShowLayout ?
- `SimpleShowLayout` affiche tous les champs en une seule liste verticale continue.
- `TabbedShowLayout` organise les informations dans des onglets séparés, ce qui est plus propre quand il y a beaucoup de données à afficher.

# Réponses - Partie 2 (Stagiaires, Hooks & Composants Custom)

## Exercice 6 - InternList

### 6.1: ReferenceField génère quel appel HTTP pour résoudre le manager? Vérifiez dans l'onglet Network de votre navigateur.
Il génère une requête **GET** groupée (ou individuelle selon le cache) vers la ressource liée, sous la forme :  
`GET http://localhost:3002/employees?id=1&id=2` ou `GET http://localhost:3002/employees/1`.

### 6.2: Que se passe-t-il visuellement si managerId ne correspond à aucun employé ?
La cellule correspondante dans le tableau reste vide (ou affiche un tiret), sans bloquer l'application ni provoquer d'erreur critique à l'écran.

---

## Exercice 7 - InternCreate & InternEdit

### 7.1: Quelle méthode HTTP est émise lors de la soumission de InternCreate? Vers quel endpoint ?
C'est une méthode **POST** envoyée vers l'endpoint racine de la ressource :  
`POST http://localhost:3002/interns`

### 7.2: Quel hook utilisez-vous pour la validation conditionnelle de remuneration, et pourquoi ?
On utilise le hook `useWatch` de `react-hook-form`. Il permet de surveiller en temps réel la valeur du champ `isRemunerate` afin de rendre dynamiquement la validation du champ `remuneration` obligatoire ou non.

---

## Exercice 8 - InternShow & ManagerCard

### 8.1: Quelle est la différence entre useGetOne et ReferenceField? Quand préférer l'un ou l'autre ?
- `ReferenceField` est un composant d'interface clé en main qui gère automatiquement le layout et le lien vers la ressource.
- `useGetOne` est un hook bas niveau qui renvoie la donnée brute. On le préfère pour créer des composants 100% sur mesure ou appliquer une logique JavaScript personnalisée.

### 8.2: Que se passe-t-il si useGetOne reçoit id: undefined sans l'option enabled? Comment ce paramètre résout-il le problème ?
Le hook déclenche immédiatement une requête HTTP invalide (`GET /employees/undefined`) qui échoue en 404 dans la console. L'option `enabled: !!id` bloque l'exécution de la requête tant que l'identifiant n'est pas défini.

---

## Exercice 9 - Enrichissement EmployeeShow

### 9.1: Différence entre useGetList et ReferenceManyField? Dans quel cas useGetList est-il indispensable ?
- `ReferenceManyField` sert uniquement à encapsuler un composant de liste (comme un `Datagrid`) pour afficher des relations un-à-plusieurs.
- `useGetList` récupère directement le tableau de données brut en arrière-plan. Il est indispensable pour faire des calculs statistiques, des graphiques ou des affichages textuels personnalisés.

### 9.2: Comment optimiser la requête de DepartmentStats pour ne récupérer que le total sans charger tous les employés ?
Il suffit de configurer le paramètre de pagination à `{ page: 1, perPage: 1 }`. L'API ne renvoie alors qu'un seul enregistrement, mais l'en-tête de réponse `X-Total-Count` (ou la structure JSON) fournit le nombre total réel correspondant au filtre.

---

## Exercice 10 - QuickStatus Toggle (useUpdate)

### 10.1: Quelle méthode HTTP useUpdate utilise-t-il par défaut? Comment forcer PATCH au lieu de PUT ?
Par défaut, il utilise la méthode **PUT** (remplacement complet). On peut forcer **PATCH** (mise à jour partielle) en modifiant la configuration globale du `dataProvider` à son initialisation ou en passant des options spécifiques de verbe HTTP si le connecteur le permet.

### 10.2: Pourquoi previousData est-il nécessaire ? Que se passe-t-il si on l'omet?
`previousData` fournit l'état d'origine du record à React-Admin. C'est indispensable pour le mode de mutation `optimistic` afin de mettre à jour l'écran instantanément et de pouvoir restaurer l'état précédent en toute sécurité en cas de coupure réseau ou d'échec du serveur.

---

## Exercice 11 - useCreate & Formulaire rapide

### 11.1: Quelle différence entre utiliser useCreate dans un composant custom et utiliser le composant <Create> de React-Admin?
- Le composant `<Create>` représente une page entière avec une structure fixe, des boutons de sauvegarde natifs et une redirection automatique.
- Le hook `useCreate` est une méthode purement programmatique qui permet d'envoyer une requête d'insertion en arrière-plan depuis n'importe quel élément personnalisé (comme une modale ou un simple clic de bouton).

### 11.2: Comment gérez-vous le rechargement de la liste après une création réussie via useCreate ?
On utilise le hook `useRefresh()` fourni par React-Admin, que l'on appelle directement à l'intérieur du callback de succès (`onSuccess`) du hook de création.

---

## Exercice 12 - Dashboard

### 12.1: Les 4 appels useGetList se font-ils en parallèle ou en séquence? Justifiez.
Ils s'exécutent en **parallèle**. Comme ce sont 4 hooks React déclarés au même niveau dans le composant au moment de son montage, le navigateur déclenche les 4 requêtes HTTP de manière simultanée.

### 12.2: Pourquoi perPage: 1 est préférable à perPage: 100 ici ?
Parce qu'on cherche uniquement à afficher des compteurs globaux (la propriété `total`). Demander 1 résultat par requête au lieu de 100 économise considérablement la bande passante du réseau et soulage le processeur du serveur.