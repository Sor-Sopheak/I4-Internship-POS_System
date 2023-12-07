FROM node:18.12-alpine 


WORKDIR /vue-sos


COPY package*.json ./


RUN npm install 

RUN npm install -g serve --save
COPY . .

RUN npm run build
EXPOSE 3000


CMD ["serve", "-s", "dist/"]




