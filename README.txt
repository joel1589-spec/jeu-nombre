# Mini Application - Devine le Nombre

## Fichiers inclus
- index.html : le jeu
- register.html : page d'inscription
- style.css : design général
- script.js : logique du jeu avec sons
- server.js : backend Node.js/Express
- users.sql : script SQL pour créer la base MySQL

## Prérequis
- Node.js installé
- MySQL installé

## Étapes d'installation

1. Crée une base de données MySQL :

   - Ouvre ton terminal MySQL
   - Colle le contenu de `users.sql`

2. Modifie les infos de connexion dans `server.js` (utilisateur, mot de passe si besoin).

3. Installe les dépendances Node.js :
   ```bash
   npm install express mysql2 body-parser cors bcrypt
   ```

4. Lance le serveur :
   ```bash
   node server.js
   ```

5. Ouvre `register.html` dans ton navigateur pour tester.

## Sons

Ajoute deux fichiers dans le même dossier :
- `win.mp3` → son de victoire
- `lose.mp3` → son d’échec

Bonne chance Joël 😉
