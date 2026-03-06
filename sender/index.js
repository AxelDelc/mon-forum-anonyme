const express = require('express');
const path = require('path');

const app = express();
const API_URL = process.env.API_URL || 'http://api:3000';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route que le front appellera pour envoyer un message
app.post('/api/messages', async (req, res) => {
    const { pseudonyme, contenu } = req.body;

    try {
        const response = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pseudonyme, contenu })
        });
        const data = await response.json();
        res.status(201).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Sender démarré sur le port ${PORT}`);
});