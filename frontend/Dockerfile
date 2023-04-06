FROM node:alpine

WORKDIR /app
EXPOSE 8080
COPY package.json .
RUN yarn
COPY . .

CMD [ "yarn", "dev" ]
