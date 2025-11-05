package api_handlers

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type RoleHandler struct {
	OrgCrudHandler[models.Role, models.RoleDTO, models.RolePage]
	repo repositories.IRoleRepo
}

func NewRoleHandler(repo repositories.IRoleRepo) *RoleHandler {
	return &RoleHandler{
		OrgCrudHandler: OrgCrudHandler[models.Role, models.RoleDTO, models.RolePage]{
			repo:      repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new role
// @Summary Create a new role
// @Description Create a new role
// @Tags Role
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param Role body models.RoleDTO true "Role data"
// @Success 201 {object} models.RoleDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/role [post]
func (h *RoleHandler) Create(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Create(c)
}

// Read retrieves a list of roles
// @Summary Get a list of roles
// @Description Get a list of roles
// @Tags Role
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.RolePage
// @Router /{org_id}/role [get]
func (h *RoleHandler) Read(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Read(c)
}

// Update updates an existing role
// @Summary Update an existing role
// @Description Update an existing role
// @Tags Role
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Role ID"
// @Param org_id path string true "Organization ID"
// @Param Role body models.RoleDTO true "Role data"
// @Success 200 {object} models.RoleDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/role/{id} [put]
func (h *RoleHandler) Update(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Update(c)
}

// Delete deletes an existing role
// @Summary Delete an existing role
// @Description Delete an existing role
// @Tags Role
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Role ID"
// @Param org_id path string true "Organization ID"
// @Success 200 {object} models.Role
// @Failure 500 {object} string
// @Router /{org_id}/role/{id} [delete]
func (h *RoleHandler) Delete(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Delete(c)
}

// GetByID retrieves a role by ID
// @Summary Get a role by ID
// @Description Get a role by ID
// @Tags Role
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Role ID"
// @Param org_id path string true "Organization ID"
// @Success 200 {object} models.Role
// @Failure 500 {object} string
// @Router /{org_id}/role/{id} [get]
func (h *RoleHandler) GetByID(c *fiber.Ctx) error {
	return h.OrgCrudHandler.GetByID(c)
}
