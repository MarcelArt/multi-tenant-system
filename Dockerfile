# Stage 1: Build the React app
FROM node:22 AS react-builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY web/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./web .

# Build the React app
RUN npm run build

FROM golang:1.25 AS golang-builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files
COPY go.mod go.sum ./

# Set Go proxy to use direct fallback
ENV GOPROXY=https://proxy.golang.org,direct

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Install swag
RUN go install github.com/swaggo/swag/cmd/swag@latest

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

RUN swag init --parseInternal --parseDependency

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Start a new stage from scratch
FROM alpine:latest

WORKDIR /root/

# COPY .env.no-relation .

# Copy the Pre-built binary file from the previous stage
COPY --from=golang-builder /app/main .

COPY --from=react-builder /app/dist ./web/dist

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./main"]