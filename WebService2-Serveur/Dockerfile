FROM node:8.11.1-alpine

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm install -g nodemon

ENV NODE_ENV=development
ENV DATABASE=mongodb://mongodb:27017/WebService2
ENV PORT=3030

EXPOSE 3030

CMD [ "nodemon", "-L", "src/server.js" ]
