FROM node:10

ENV DB_NAME=airline
ENV DB_KEY=opRAZLntr50jhh6eYDsubYlLFgXFKKNNMY4MMHxQCubxDAowFXqAKXDfh0mFXSqs1LPwmZfKtibtvwnG786yag==
ENV COSMO_PORT=10255


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]