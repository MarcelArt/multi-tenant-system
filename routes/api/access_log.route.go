package api_routes

import (
	"github.com/MarcelArt/multi-tenant-system/database"
	api_handlers "github.com/MarcelArt/multi-tenant-system/handlers/api"
	"github.com/MarcelArt/multi-tenant-system/middlewares"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupAccessLogRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewAccessLogHandler(repositories.NewAccessLogRepo(database.GetDB()))

	g := api.Group("/:org_id/access-log")
	g.Get("/", auth.ProtectedAPI, auth.Authz("accessLog#view"), h.Read)
	g.Get("/:id", auth.ProtectedAPI, auth.Authz("accessLog#view"), h.GetByID)
	g.Post("/", auth.ProtectedAPI, auth.Authz("accessLog#manage"), h.Create)
	g.Put("/:id", auth.ProtectedAPI, auth.Authz("accessLog#manage"), h.Update)
	g.Delete("/:id", auth.ProtectedAPI, auth.Authz("accessLog#manage"), h.Delete)
}
