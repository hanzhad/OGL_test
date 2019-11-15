FROM node:12-alpine
RUN mkdir -p /frontend
WORKDIR ./frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start


