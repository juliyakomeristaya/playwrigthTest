# Use a base image with Playwright pre-installed browsers and dependencies
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# Set the working directory inside the container
WORKDIR /tests

# Copy package.json and package-lock.json (or yarn.lock) for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Install Playwright browsers (ensure compatibility with current version)
RUN npx playwright install --with-deps

# Define the default command to run when the container starts
CMD ["npx", "playwright", "test"]