FROM node:22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/
RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]