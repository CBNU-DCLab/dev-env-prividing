FROM node:14
WORKDIR /
COPY package.json package.json
COPY index.js index.js
RUN npm install
RUN mkdir models
CMD ["npm", "start"]
