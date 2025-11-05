
package api_routes

import (
	"github.com/MarcelArt/multi-tenant-system/database"
	api_handlers "github.com/MarcelArt/multi-tenant-system/handlers/api"
	"github.com/MarcelArt/multi-tenant-system/middlewares"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupOrganizationRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewOrganizationHandler(repositories.NewOrganizationRepo(database.GetDB()))

	g := api.Group("/organization")
	g.Get("/", auth.ProtectedAPI, h.Read)
	g.Get("/:id", auth.ProtectedAPI, h.GetByID)
	g.Post("/", auth.ProtectedAPI, h.Create)
	g.Put("/:id", auth.ProtectedAPI, h.Update)
	g.Delete("/:id", auth.ProtectedAPI, h.Delete)
}
