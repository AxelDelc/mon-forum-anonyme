const bouton = document.getElementById('envoyer');
const retour = document.getElementById('message-retour');

bouton.addEventListener('click', async () => {
    const pseudonyme = document.getElementById('pseudonyme').value.trim();
    const contenu = document.getElementById('contenu').value.trim();

    // Validation basique
    if (!pseudonyme || !contenu) {
        retour.textContent = 'Pseudonyme et message requis !';
        retour.className = 'erreur';
        return;
    }

    // Désactive le bouton pendant l'envoi
    bouton.disabled = true;
    bouton.textContent = 'Envoi en cours...';
    retour.textContent = '';

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pseudonyme, contenu })
        });

        if (response.ok) {
            retour.textContent = 'Message envoyé avec succès !';
            retour.className = 'succes';
            // Vide les champs après envoi
            document.getElementById('pseudonyme').value = '';
            document.getElementById('contenu').value = '';
        } else {
            retour.textContent = 'Erreur lors de l\'envoi du message.';
            retour.className = 'erreur';
        }
    } catch (err) {
        retour.textContent = 'Impossible de contacter le serveur.';
        retour.className = 'erreur';
    } finally {
        bouton.disabled = false;
        bouton.textContent = 'Envoyer';
    }
});