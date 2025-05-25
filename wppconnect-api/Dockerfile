# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Install Puppeteer dependencies (for WPPConnect)
# Reference: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker
RUN apt-get update \
    && apt-get install -y wget gnupg ca-certificates procps libxss1 \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    # We install Chrome to get all dependencies, but WPPConnect will use its own Chromium
    && apt-get install -y google-chrome-stable libgbm-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install --omit=dev
# If you have issues with WPPConnect not finding Chromium, you might need to force install its puppeteer version
# RUN npm install puppeteer@YOUR_WPPCONNECT_EXPECTED_VERSION --unsafe-perm=true --allow-root

# Bundle app source
COPY . .

# Expose the port the app runs on
# The PORT environment variable will be set by Render, so we don't need to hardcode it here.
# EXPOSE 3001 

# Define the command to run your app
CMD [ "npm", "start" ] 