FROM node:10.12-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

CMD [ "npm", "start" ]