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