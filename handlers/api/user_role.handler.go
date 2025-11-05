
package api_handlers

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type UserRoleHandler struct {
	BaseCrudHandler[models.UserRole, models.UserRoleDTO, models.UserRolePage]
	repo repositories.IUserRoleRepo
}

func NewUserRoleHandler(repo repositories.IUserRoleRepo) *UserRoleHandler {
	return &UserRoleHandler{
		BaseCrudHandler: BaseCrudHandler[models.UserRole, models.UserRoleDTO, models.UserRolePage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new user role
// @Summary Create a new user role
// @Description Create a new user role
// @Tags UserRole
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param UserRole body models.UserRoleDTO true "UserRole data"
// @Success 201 {object} models.UserRoleDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /user-role [post]
func (h *UserRoleHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of user roles
// @Summary Get a list of user roles
// @Description Get a list of user roles
// @Tags UserRole
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.UserRolePage
// @Router /user-role [get]
func (h *UserRoleHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing user role
// @Summary Update an existing user role
// @Description Update an existing user role
// @Tags UserRole
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "UserRole ID"
// @Param UserRole body models.UserRoleDTO true "UserRole data"
// @Success 200 {object} models.UserRoleDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /user-role/{id} [put]
func (h *UserRoleHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing user role
// @Summary Delete an existing user role
// @Description Delete an existing user role
// @Tags UserRole
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "UserRole ID"
// @Success 200 {object} models.UserRole
// @Failure 500 {object} string
// @Router /user-role/{id} [delete]
func (h *UserRoleHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a user role by ID
// @Summary Get a user role by ID
// @Description Get a user role by ID
// @Tags UserRole
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "UserRole ID"
// @Success 200 {object} models.UserRole
// @Failure 500 {object} string
// @Router /user-role/{id} [get]
func (h *UserRoleHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
