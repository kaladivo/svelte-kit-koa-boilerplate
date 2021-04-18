FROM node:12-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

CMD ["yarn", "serve"]
