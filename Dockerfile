# Image for develop
FROM node:alpine AS develop
EXPOSE 3000
RUN mkdir -p /srv
WORKDIR /srv
# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
CMD yarn start


# Image for prepare to deploy
FROM develop AS builder
ARG PUBLIC_URL
RUN yarn build


# Image for deploy
FROM nginx:alpine AS nginx
EXPOSE 80
COPY --from=builder /srv/build/ /srv
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
