FROM node:alpine

RUN npm i -g nodemon

COPY . /app

WORKDIR /app

RUN npm i

CMD ["npm", "run", "start:dev"]