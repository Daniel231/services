FROM node
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
CMD yarn run prod
EXPOSE 3000