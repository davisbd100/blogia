FROM node:24-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn install --inmutable
COPY . .
RUN npm run build

FROM nginx:stable-alpine


COPY --from=build /app/dist /usr/share/nginx/html
COPY env.sh /docker-entrypoint.d/env.sh
RUN dos2unix /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
