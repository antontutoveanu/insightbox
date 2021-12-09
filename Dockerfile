FROM node:13.12.0-alpine
 
WORKDIR '/server'

COPY ./client/package.json ./
 
RUN npm install
 
COPY . .

EXPOSE 80

CMD [ "npm", "run", "start" ]