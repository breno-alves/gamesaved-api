########################################## BUILD IMAGE ##########################################
FROM node:18.4.0-alpine3.16 AS build
WORKDIR /usr/src/app
COPY . .
RUN yarn install && \
    yarn build && \
    rm -rf node_modules && \
    yarn install --production

########################################### PROD IMAGE ##########################################
FROM node:18.4.0-alpine3.16
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/package.json /usr/src/app/package.json
COPY --chown=node:node --from=build /usr/src/app/yarn.lock /usr/src/app/yarn.lock
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
USER node
CMD ["dumb-init", "yarn", "start:prod"]