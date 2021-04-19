FROM node:12-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

ENV SERVER_PORT 3000
EXPOSE 3000

CMD ["yarn", "serve"]
