FROM node
WORKDIR /web

COPY package.json /web/
RUN npm install

WORKDIR /web
COPY . /web

ENTRYPOINT ["npm", "start"]