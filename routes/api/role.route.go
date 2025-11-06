package api_routes

import (
	"github.com/MarcelArt/multi-tenant-system/database"
	api_handlers "github.com/MarcelArt/multi-tenant-system/handlers/api"
	"github.com/MarcelArt/multi-tenant-system/middlewares"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupRoleRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewRoleHandler(
		repositories.NewRoleRepo(database.GetDB()),
		repositories.NewRolePermissionRepo(database.GetDB()),
	)

	g := api.Group("/:org_id/role")
	g.Get("/", auth.ProtectedAPI, auth.Authz("role#view"), h.Read)
	g.Get("/:id", auth.ProtectedAPI, auth.Authz("role#view"), h.GetByID)

	g.Post("/", auth.ProtectedAPI, auth.Authz("role#manage"), h.Create)

	g.Put("/:id", auth.ProtectedAPI, auth.Authz("role#manage"), h.Update)

	g.Patch("/permission", auth.ProtectedAPI, auth.Authz("role#manage"), h.AssignPermissions)

	g.Delete("/:id", auth.ProtectedAPI, auth.Authz("role#manage"), h.Delete)
}
