FROM node:latest

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY compliance-by-design-demo/package*.json ./

USER node

RUN npm install

COPY --chown=node:node compliance-by-design-demo/ ./

EXPOSE 3000

CMD [ "npm", "start" ]