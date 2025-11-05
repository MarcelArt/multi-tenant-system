
package api_handlers

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type UserOrganizationHandler struct {
	BaseCrudHandler[models.UserOrganization, models.UserOrganizationDTO, models.UserOrganizationPage]
	repo repositories.IUserOrganizationRepo
}

func NewUserOrganizationHandler(repo repositories.IUserOrganizationRepo) *UserOrganizationHandler {
	return &UserOrganizationHandler{
		BaseCrudHandler: BaseCrudHandler[models.UserOrganization, models.UserOrganizationDTO, models.UserOrganizationPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new user organization
// @Summary Create a new user organization
// @Description Create a new user organization
// @Tags UserOrganization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param UserOrganization body models.UserOrganizationDTO true "UserOrganization data"
// @Success 201 {object} models.UserOrganizationDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /user-organization [post]
func (h *UserOrganizationHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of user organizations
// @Summary Get a list of user organizations
// @Description Get a list of user organizations
// @Tags UserOrganization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.UserOrganizationPage
// @Router /user-organization [get]
func (h *UserOrganizationHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing user organization
// @Summary Update an existing user organization
// @Description Update an existing user organization
// @Tags UserOrganization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "UserOrganization ID"
// @Param UserOrganization body models.UserOrganizationDTO true "UserOrganization data"
// @Success 200 {object} models.UserOrganizationDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /user-organization/{id} [put]
func (h *UserOrganizationHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing user organization
// @Summary Delete an existing user organization
// @Description Delete an existing user organization
// @Tags UserOrganization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "UserOrganization ID"
// @Success 200 {object} models.UserOrganization
// @Failure 500 {object} string
// @Router /user-organization/{id} [delete]
func (h *UserOrganizationHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a user organization by ID
// @Summary Get a user organization by ID
// @Description Get a user organization by ID
// @Tags UserOrganization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "UserOrganization ID"
// @Success 200 {object} models.UserOrganization
// @Failure 500 {object} string
// @Router /user-organization/{id} [get]
func (h *UserOrganizationHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
