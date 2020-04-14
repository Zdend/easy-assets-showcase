FROM node:12.14.0

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN yarn install

CMD [ "yarn", "run", "dev" ]