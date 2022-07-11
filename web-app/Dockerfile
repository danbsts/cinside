FROM node:14.5-alpine
WORKDIR /cinside
COPY package.json yarn.lock ./
RUN yarn
COPY . .
CMD yarn start