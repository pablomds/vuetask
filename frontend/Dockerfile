# Utiliser une image Node.js pour builder l’application Vue.js
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Utiliser une image Nginx pour servir le frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
