FROM node:18

WORKDIR /app

# Supprimez d'abord les anciens fichiers package.json et pnpm-lock.yaml
COPY backend/package.json backend/pnpm-lock.yaml ./

# Installez pnpm et les dépendances AVANT de copier le reste des fichiers
RUN npm install -g pnpm
RUN pnpm config set node-linker hoisted
RUN pnpm install

# Gardez une sauvegarde des node_modules
RUN cp -r node_modules /tmp/node_modules

# Copiez le code source (cela peut écraser les node_modules)
COPY backend/ ./

# Restaurez les node_modules sauvegardés
RUN rm -rf node_modules && cp -r /tmp/node_modules node_modules

EXPOSE 3000

CMD ["pnpm", "dev"]