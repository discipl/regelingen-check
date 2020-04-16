FROM node:latest

WORKDIR /build
COPY compliance-by-design-demo/package*.json ./
RUN npm install --production
COPY compliance-by-design-demo/ ./
RUN npm run build && \
  mkdir -p /app/public && \
  cp -r build/* /app/public && \
  chown -R node:node /app && \
  rm -rf /build

USER node
WORKDIR /app
COPY kvk-api/package*.json ./
RUN npm install --production
COPY --chown=node:node kvk-api/ ./

EXPOSE 3001
CMD [ "node", "app.js" ]
