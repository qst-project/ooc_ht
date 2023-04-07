FROM node:18-alpine

WORKDIR /app
COPY package.json /app/package.json
RUN yarn install
COPY . /app
# RUN yarn build
ENTRYPOINT ["yarn", "dev", "--port", "8080"]
