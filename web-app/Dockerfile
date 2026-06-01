FROM public.ecr.aws/docker/library/node:14-alpine
WORKDIR /cinside
COPY package.json yarn.lock ./
RUN yarn
COPY . .
CMD yarn start