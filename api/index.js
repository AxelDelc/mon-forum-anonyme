const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    port: 5432,
    database: process.env.DB_NAME || 'forum',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
});

// Créer la table si elle n'existe pas encore
async function initDB() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      pseudonyme VARCHAR(50) NOT NULL,
      contenu TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
    console.log('Table messages prête');
}

// GET /messages pour récupérer tous les messages
app.get('/messages', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM messages ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST /messages pour créer un message
app.post('/messages', async (req, res) => {
    const { pseudonyme, contenu } = req.body;

    if (!pseudonyme || !contenu) {
        return res.status(400).json({ error: 'Pseudonyme et contenu requis' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO messages (pseudonyme, contenu) VALUES ($1, $2) RETURNING *',
            [pseudonyme, contenu]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`API démarrée sur le port ${PORT}`);
    });
});