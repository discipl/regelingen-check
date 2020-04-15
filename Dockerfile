FROM node:latest

RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY compliance-by-design-demo/package*.json ./
USER node
RUN npm install --production
COPY --chown=node:node compliance-by-design-demo/ ./

RUN npm run build

EXPOSE 3001
CMD [ "node", "server/app.js" ]
