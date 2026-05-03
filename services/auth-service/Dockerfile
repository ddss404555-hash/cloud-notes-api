# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies file
COPY package.json .

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose app port
EXPOSE 8080

# Run the service
CMD ["npm", "start"]