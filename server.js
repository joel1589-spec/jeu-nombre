const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Sert les fichiers HTML/CSS/JS

// 🔧 Configuration de la base de données
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Joel1234!', // ← remplace ici avec ton mot de passe MySQL
  database: 'devinejeu'
};

// ✅ ROUTE INSCRIPTION
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('📥 Données reçues :', { name, email });

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      await connection.end();
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    await connection.end();
    console.log("✅ Utilisateur enregistré :", email);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });

  } catch (error) {
    console.error('❌ Erreur serveur (register) :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ ROUTE CONNEXION
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Tentative de connexion :", email);

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    await connection.end();

    if (rows.length === 0) {
      return res.status(400).json({ message: "Email non trouvé" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    console.log("✅ Connexion réussie pour :", email);
    res.status(200).json({ message: "Connexion réussie" });

  } catch (error) {
    console.error("❌ Erreur serveur (login) :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
