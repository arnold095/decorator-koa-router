FROM node:14.17.5-buster
USER node
COPY --chown=node . /home/node/app

WORKDIR /home/node/app
RUN npm install
