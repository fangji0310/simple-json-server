FROM node:alpine
RUN apk --no-cache add curl
RUN npm install -g typescript express mocha istanbul remap-istanbul postinstall-build ts-node nodemon
WORKDIR /home/node/app
CMD sh -c "npm install && nodemon"
