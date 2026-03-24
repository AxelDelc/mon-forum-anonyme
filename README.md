# Mon Forum Anonyme

Un forum anonyme permettant aux utilisateurs de publier des messages sous un pseudonyme.
Aucun système de connexion n'est requis.

## Architecture
```
Internet
   │
   ├── Thread (port 80)    → affichage des messages
   └── Sender (port 8080)  → envoi des messages
         │
    [app-network]
         │
        API  (port 3000 interne)
         │
    [db-network]
         │
        DB  (PostgreSQL interne)
```

## Services

| Service  | Rôle                              | Port       |
|----------|-----------------------------------|------------|
| `api`    | Gestion des messages (GET / POST) | interne    |
| `db`     | Base de données PostgreSQL        | interne    |
| `thread` | Affichage des messages            | 80         |
| `sender` | Envoi des messages                | 8080       |

## Lancer le projet

### Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### Démarrage

Cloner le dépôt :
```bash
git clone https://github.com/AxelDelc/mon-forum-anonyme
cd mon-forum-anonyme
```

Lancer tous les services :
```bash
docker compose up --build
```

Accéder au forum :

- **Lire les messages** → [http://localhost:80](http://localhost:80)
- **Écrire un message** → [http://localhost:8080](http://localhost:8080)

### Arrêter le projet
```bash
docker compose down
```

### Arrêter et supprimer les données
```bash
docker compose down -v
```

## API

| Méthode | Route        | Description               |
|---------|--------------|---------------------------|
| GET     | `/messages`  | Récupère tous les messages |
| POST    | `/messages`  | Crée un nouveau message    |


## Réseaux Docker

| Réseau        | Services connectés      |
|---------------|-------------------------|
| `app-network` | Thread, Sender, API     |
| `db-network`  | API, DB                 |

> Thread et Sender n'ont pas accès direct à la base de données.

## Technologies

- **API** : Node.js / Express
- **Base de données** : PostgreSQL
- **Thread** : Node.js / Express
- **Sender** : Node.js / Express
- **Conteneurisation** : Docker / Docker Compose
- **Versioning** : Git / Commitizen

## Structure du projet
```
mon-forum-anonyme/
├── docker-compose.yml
├── README.md
├── api/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
├── thread/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   └── public/
│       ├── index.html
│       ├── thread.css
│       └── thread.js
└── sender/
    ├── Dockerfile
    ├── package.json
    ├── index.js
    └── public/
        ├── index.html
        ├── sender.css
        └── sender.js
```