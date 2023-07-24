FROM node:20.4-bookworm-slim
ENV NODE_ENV=production
RUN apt-get update
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8080
CMD [ "node", "index.cjs" ]