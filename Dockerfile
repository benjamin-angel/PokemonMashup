FROM ubuntu
FROM node:erbium
MAINTAINER Benjamin Angel

RUN apt-get update 
RUN apt install -y git
RUN git clone https://github.com/fr0stieee/PokemonMashup.git

WORKDIR /PokemonMashup

RUN npm install

EXPOSE 80

CMD ["npm", "start"]