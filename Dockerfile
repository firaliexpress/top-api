FROM node:14.20.1-alpine3.15
LABEL org.opencontainers.image.source https://github.com/firaliexpress/top-api/top-api
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
