FROM node:18

WORKDIR /app


COPY ./package.json ./pnpm-lock.yaml ./


RUN npm install -g pnpm
RUN pnpm config set node-linker hoisted
RUN pnpm install


RUN cp -r node_modules /tmp/node_modules

# Copiez le code source (cela peut écraser les node_modules)
COPY . .

# Restaurez les node_modules sauvegardés
RUN rm -rf node_modules && cp -r /tmp/node_modules node_modules

EXPOSE 3000

CMD ["pnpm", "dev"]