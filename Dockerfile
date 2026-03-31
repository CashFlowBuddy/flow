# Use the official Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json pnpm-lock.yaml .npmrc* ./

# Install the application dependencies
RUN corepack enable pnpm \
  && pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN corepack enable pnpm \
  && pnpm prisma generate \
  && pnpm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["sh", "-c", "pnpm prisma db push && node dist/src/main"]