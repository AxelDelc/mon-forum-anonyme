const express = require('express');
const path = require('path');

const app = express();
const API_URL = process.env.API_URL || 'http://api:3000';

// Sert les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Route que le front appellera pour récupérer les messages
app.get('/api/messages', async (req, res) => {
    try {
        const response = await fetch(`${API_URL}/messages`);
        const messages = await response.json();
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Thread démarré sur le port ${PORT}`);
});