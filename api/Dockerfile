# On part d'une image Node.js officielle légère
FROM node:18-alpine

# On crée le dossier de travail dans le conteneur
WORKDIR /app

# On copie package.json en premier (optimisation du cache Docker)
COPY package*.json ./

# On installe les dépendances
RUN npm install

# On copie tout le reste du code
COPY . .

# On indique que le conteneur écoute sur le port 3000
EXPOSE 3000

# Commande pour démarrer l'API
CMD ["node", "index.js"]