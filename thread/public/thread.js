async function chargerMessages() {
    try {
        const response = await fetch('/api/messages');
        const messages = await response.json();
        const container = document.getElementById('messages-container');

        if (messages.length === 0) {
            container.innerHTML = '<p class="empty">Aucun message pour le moment...</p>';
            return;
        }

        container.innerHTML = messages.map(msg => `
          <div class="message">
            <div class="pseudo">${msg.pseudonyme}</div>
            <div class="contenu">${msg.contenu}</div>
            <div class="date">${new Date(msg.created_at).toLocaleString('fr-FR')}</div>
          </div>
        `).join('');

    } catch (err) {
        document.getElementById('messages-container').innerHTML =
            '<p class="erreur">Erreur lors du chargement des messages</p>';
    }
}

// Charge les messages au démarrage
chargerMessages();
console.log('Messages chargés.');

// Rafraîchit toutes les 10 secondes
setInterval(chargerMessages, 10000);