FROM node:8.11.1-alpine

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm install -g nodemon


ENV DATABASE=mongodb://mongodb:27017/WebService1
ENV PORT=3000

EXPOSE 3000

CMD [ "nodemon", "-L", "src/server.js" ]
