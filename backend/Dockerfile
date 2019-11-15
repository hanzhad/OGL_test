FROM node:12-alpine
ARG NODE_ENV="development"

RUN mkdir /backend
RUN mkdir -p /var/app/html/images

WORKDIR /backend

COPY package*.json ./

RUN npm i -g nodemon
RUN npm install

COPY . .

EXPOSE 3000

CMD npm start