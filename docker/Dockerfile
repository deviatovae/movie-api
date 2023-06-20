FROM node:18-alpine As development

WORKDIR /backend

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
