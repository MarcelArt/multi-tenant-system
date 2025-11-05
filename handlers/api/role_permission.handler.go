
package api_handlers

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type RolePermissionHandler struct {
	BaseCrudHandler[models.RolePermission, models.RolePermissionDTO, models.RolePermissionPage]
	repo repositories.IRolePermissionRepo
}

func NewRolePermissionHandler(repo repositories.IRolePermissionRepo) *RolePermissionHandler {
	return &RolePermissionHandler{
		BaseCrudHandler: BaseCrudHandler[models.RolePermission, models.RolePermissionDTO, models.RolePermissionPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new role permission
// @Summary Create a new role permission
// @Description Create a new role permission
// @Tags RolePermission
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param RolePermission body models.RolePermissionDTO true "RolePermission data"
// @Success 201 {object} models.RolePermissionDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /role-permission [post]
func (h *RolePermissionHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of role permissions
// @Summary Get a list of role permissions
// @Description Get a list of role permissions
// @Tags RolePermission
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.RolePermissionPage
// @Router /role-permission [get]
func (h *RolePermissionHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing role permission
// @Summary Update an existing role permission
// @Description Update an existing role permission
// @Tags RolePermission
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "RolePermission ID"
// @Param RolePermission body models.RolePermissionDTO true "RolePermission data"
// @Success 200 {object} models.RolePermissionDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /role-permission/{id} [put]
func (h *RolePermissionHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing role permission
// @Summary Delete an existing role permission
// @Description Delete an existing role permission
// @Tags RolePermission
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "RolePermission ID"
// @Success 200 {object} models.RolePermission
// @Failure 500 {object} string
// @Router /role-permission/{id} [delete]
func (h *RolePermissionHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a role permission by ID
// @Summary Get a role permission by ID
// @Description Get a role permission by ID
// @Tags RolePermission
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "RolePermission ID"
// @Success 200 {object} models.RolePermission
// @Failure 500 {object} string
// @Router /role-permission/{id} [get]
func (h *RolePermissionHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
