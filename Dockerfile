FROM node:10
EXPOSE 3000
WORKDIR /app
COPY package.json /src
RUN npm install
COPY . /app
CMD node src/server.js
