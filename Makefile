swag:
	@swag init --parseInternal --parseDependency

go: swag
	@go run main.go

dev: swag
	@air

migrate:
	@go run main.go migrate up

drop:
	@go run main.go migrate down