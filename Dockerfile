FROM node:16-alpine

WORKDIR /workspace

COPY package.json /workspace/

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
