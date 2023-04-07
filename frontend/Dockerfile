FROM node:18-alpine

WORKDIR /app
COPY package.json /app/package.json
RUN yarn install --prod
COPY . /app
# RUN yarn build
ENTRYPOINT ["yarn", "dev", "--port", "8080"]