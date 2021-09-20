FROM node:16-alpine

WORKDIR /workspace

COPY package.json /workspace/

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "run", "start:prod"]
