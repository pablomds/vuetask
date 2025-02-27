# Utiliser une image Node.js optimisée
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN pnpm install --production

# Copier le reste des fichiers
COPY . .

# Exposer le port (assurez-vous que Fastify écoute sur ce port)
EXPOSE 5000

# Démarrer l'application
CMD ["tsx", "src/index.ts"]
