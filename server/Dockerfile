FROM node

WORKDIR /serverScopeWork

COPY . .

RUN npm install

EXPOSE 7000

CMD ["npm", "run","startJob:dev"]