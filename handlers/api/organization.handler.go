
package api_handlers

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type OrganizationHandler struct {
	BaseCrudHandler[models.Organization, models.OrganizationDTO, models.OrganizationPage]
	repo repositories.IOrganizationRepo
}

func NewOrganizationHandler(repo repositories.IOrganizationRepo) *OrganizationHandler {
	return &OrganizationHandler{
		BaseCrudHandler: BaseCrudHandler[models.Organization, models.OrganizationDTO, models.OrganizationPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new organization
// @Summary Create a new organization
// @Description Create a new organization
// @Tags Organization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Organization body models.OrganizationDTO true "Organization data"
// @Success 201 {object} models.OrganizationDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /organization [post]
func (h *OrganizationHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of organizations
// @Summary Get a list of organizations
// @Description Get a list of organizations
// @Tags Organization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.OrganizationPage
// @Router /organization [get]
func (h *OrganizationHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing organization
// @Summary Update an existing organization
// @Description Update an existing organization
// @Tags Organization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Organization ID"
// @Param Organization body models.OrganizationDTO true "Organization data"
// @Success 200 {object} models.OrganizationDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /organization/{id} [put]
func (h *OrganizationHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing organization
// @Summary Delete an existing organization
// @Description Delete an existing organization
// @Tags Organization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Organization ID"
// @Success 200 {object} models.Organization
// @Failure 500 {object} string
// @Router /organization/{id} [delete]
func (h *OrganizationHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a organization by ID
// @Summary Get a organization by ID
// @Description Get a organization by ID
// @Tags Organization
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Organization ID"
// @Success 200 {object} models.Organization
// @Failure 500 {object} string
// @Router /organization/{id} [get]
func (h *OrganizationHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
