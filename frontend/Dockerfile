FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm -g install next
RUN npm ci 
CMD ["npm", "run", "build"]
EXPOSE 3000
