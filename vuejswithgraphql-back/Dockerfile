FROM node:10.15.3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install;
EXPOSE 7001
CMD [ "node", "app.js" ]