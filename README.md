# multi-tenant-system

A Go web application built with Fiber framework, generated using [polygo](https://github.com/MarcelArt/polygo).

## Features

- 🚀 **Fiber Framework**: Fast and minimalist web framework inspired by Express.js
- 🗄️ **Database Integration**: PostgreSQL with GORM ORM
- 🎯 **RESTful API**: REST endpoints with proper HTTP methods
- 📝 **Swagger Documentation**: Automatic API documentation
- 🔐 **JWT Authentication**: Ready-to-use authentication middleware
- 🏗️ **Clean Architecture**: Organized structure with repository pattern

## Prerequisites

- Go 1.24.0 or higher
- PostgreSQL database
- [polygo CLI](https://github.com/MarcelArt/polygo) for scaffolding new endpoints

## Installation

1. **Clone and navigate to the project:**
   ```bash
   cd multi-tenant-system
   ```

2. **Initialize Go module:**
   ```bash
   go mod init github.com/MarcelArt/multi-tenant-system
   ```

3. **Install dependencies:**
   ```bash
   go mod tidy
   ```

4. **Set up environment variables:**
   - Copy `.env` file and update with your database credentials
   - Make sure your PostgreSQL database is running and accessible

5. **Generate Swagger documentation:**
   ```bash
   swag init --parseInternal --parseDependency
   ```

6. **Uncomment docs import in main.go:**
   - Open `main.go`
   - Uncomment the line: `// _ "github.com/MarcelArt/multi-tenant-system/docs"`

## Running the Application

### Development Server

```bash
go run main.go
```

### Using Build Commands

```bash
# Run migrations up
go run main.go migrate up

# Run migrations down
go run main.go migrate down

# Start the server
go run main.go serve
```

The server will start on `http://localhost:8080` (or your configured PORT).

## Project Structure

```
multi-tenant-system/
├── cmd/
│   ├── manager.go    # Command management
│   ├── serve.go      # Server startup
│   └── migrate.go    # Database migrations
├── config/
│   └── config.go     # Configuration management
├── database/
│   └── database.go   # Database connection
├── models/
│   └── models.go     # Data models
├── routes/
│   └── routes.go     # Route definitions
├── handlers/
│   └── handlers.go   # HTTP handlers
├── repositories/
│   └── repos.go      # Data access layer
├── middlewares/
│   └── middlewares.go # Custom middlewares
├── utils/
│   └── utils.go      # Utility functions
├── .env              # Environment variables
├── go.mod            # Go module file
├── main.go           # Application entry point
├── polygo.toml       # Polygo configuration
└── docs/             # Swagger documentation (generated)
```

## Scaffolding New Endpoints

This project was generated with [polygo](https://github.com/MarcelArt/polygo), which makes it easy to add new API endpoints:

1. **Make sure you have polygo installed:**
   ```bash
   go install github.com/MarcelArt/polygo@latest
   ```

2. **Scaffold a new model with CRUD operations:**
   ```bash
   polygo add User
   polygo add Product
   polygo add Order
   ```

   The scaffolding command automatically generates:
   - Model struct with GORM tags
   - Repository interface and implementation
   - HTTP handlers with CRUD operations
   - Route definitions for the new endpoints
   - Database migration support

3. **Run migrations to update database schema:**
   ```bash
   go run main.go migrate up
   ```

4. **Update Swagger documentation:**
   ```bash
   swag init --parseInternal --parseDependency
   ```

## API Documentation

Once the server is running, you can access the Swagger UI at:
```
http://localhost:8080/swagger/index.html
```

## Environment Variables

The application uses the following environment variables (defined in `.env`):

- `PORT` - Server port (default: 8080)
- `DB_PORT` - Database port
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `DB_HOST` - Database host
- `DB_SCHEMA` - Database schema
- `JWT_SECRET` - JWT signing secret

## Database Migrations

The application includes built-in migration support:

```bash
# Run migrations up (create/update tables)
go run main.go migrate up

# Run migrations down (drop tables)
go run main.go migrate down
```

## Contributing

1. Use `polygo add` to scaffold new endpoints
2. Follow the existing code patterns and structure
3. Update Swagger comments for new endpoints
4. Test thoroughly before committing

