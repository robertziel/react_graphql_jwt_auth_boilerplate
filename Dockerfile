FROM node:12.4.0

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet
