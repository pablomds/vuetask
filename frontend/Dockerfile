FROM node:18

WORKDIR /app

# Copiez les fichiers de configuration seulement
COPY frontend/package.json frontend/pnpm-lock.yaml ./

# Installez pnpm et les dépendances
RUN npm install -g pnpm
RUN pnpm config set node-linker hoisted
RUN pnpm install

# Gardez une sauvegarde des node_modules
RUN cp -r node_modules /tmp/node_modules

# Copiez le code source (cela peut écraser les node_modules)
COPY frontend/ ./

# Restaurez les node_modules sauvegardés
RUN rm -rf node_modules && cp -r /tmp/node_modules node_modules

EXPOSE 5173

CMD ["pnpm", "dev"]