FROM node:12 as base
RUN mkdir -p /usr/src/kenotest
WORKDIR /usr/src/kenotest
COPY package*.json ./
RUN npm install -g pm2
RUN yarn install
COPY . .
RUN yarn run build

FROM base as likelove
EXPOSE 3000
CMD ["pm2", "start", "ecosystem.config.js", "--env", "production", "--no-daemon"]