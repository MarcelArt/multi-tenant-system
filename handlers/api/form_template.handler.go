package api_handlers

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type FormTemplateHandler struct {
	OrgCrudHandler[models.FormTemplate, models.FormTemplateDTO, models.FormTemplatePage]
	repo repositories.IFormTemplateRepo
}

func NewFormTemplateHandler(repo repositories.IFormTemplateRepo) *FormTemplateHandler {
	return &FormTemplateHandler{
		OrgCrudHandler: OrgCrudHandler[models.FormTemplate, models.FormTemplateDTO, models.FormTemplatePage]{
			repo:      repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new form template
// @Summary Create a new form template
// @Description Create a new form template
// @Tags FormTemplate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param FormTemplate body models.FormTemplateDTO true "FormTemplate data"
// @Success 201 {object} models.FormTemplateDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/form-template [post]
func (h *FormTemplateHandler) Create(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Create(c)
}

// Read retrieves a list of form templates
// @Summary Get a list of form templates
// @Description Get a list of form templates
// @Tags FormTemplate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.FormTemplatePage
// @Router /{org_id}/form-template [get]
func (h *FormTemplateHandler) Read(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Read(c)
}

// Update updates an existing form template
// @Summary Update an existing form template
// @Description Update an existing form template
// @Tags FormTemplate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param id path string true "FormTemplate ID"
// @Param FormTemplate body models.FormTemplateDTO true "FormTemplate data"
// @Success 200 {object} models.FormTemplateDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/form-template/{id} [put]
func (h *FormTemplateHandler) Update(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Update(c)
}

// Delete deletes an existing form template
// @Summary Delete an existing form template
// @Description Delete an existing form template
// @Tags FormTemplate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param id path string true "FormTemplate ID"
// @Success 200 {object} models.FormTemplate
// @Failure 500 {object} string
// @Router /{org_id}/form-template/{id} [delete]
func (h *FormTemplateHandler) Delete(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Delete(c)
}

// GetByID retrieves a form template by ID
// @Summary Get a form template by ID
// @Description Get a form template by ID
// @Tags FormTemplate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param id path string true "FormTemplate ID"
// @Success 200 {object} models.FormTemplate
// @Failure 500 {object} string
// @Router /{org_id}/form-template/{id} [get]
func (h *FormTemplateHandler) GetByID(c *fiber.Ctx) error {
	return h.OrgCrudHandler.GetByID(c)
}
