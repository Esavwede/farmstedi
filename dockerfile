FROM node:20.9.0-alpine
RUN apk add --no-cache redis
WORKDIR /app 
COPY package.json .  
RUN apk add --no-cache --virtual .build-deps make gcc g++ python3  
RUN npm install  
RUN npm rebuild bcrypt --build-from-source
RUN apk del .build-deps
COPY . . 
RUN npm run build 
EXPOSE 3000 
CMD [ "npm","start" ]