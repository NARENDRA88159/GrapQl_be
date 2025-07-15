FROM node:22.17.0

WORKDIR /app

COPY package*.json ./
RUN npm install

# Optional: install nodemon globally
RUN npm install -g nodemon

COPY . .

EXPOSE 8003

CMD ["npm", "run", "dev"]  # 👈 Use dev mode with nodemon
