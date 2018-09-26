FROM node:8.12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json  /usr/src/app/
RUN npm install --production 
COPY . /usr/src/app
ENV PORT 8000
EXPOSE 8000
CMD ["npm", "start"]