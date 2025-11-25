package api_handlers

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type AccessLogHandler struct {
	OrgCrudHandler[models.AccessLog, models.AccessLogDTO, models.AccessLogPage]
	repo repositories.IAccessLogRepo
}

func NewAccessLogHandler(repo repositories.IAccessLogRepo) *AccessLogHandler {
	return &AccessLogHandler{
		OrgCrudHandler: OrgCrudHandler[models.AccessLog, models.AccessLogDTO, models.AccessLogPage]{
			repo:      repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new access log
// @Summary Create a new access log
// @Description Create a new access log
// @Tags AccessLog
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param AccessLog body models.AccessLogDTO true "AccessLog data"
// @Success 201 {object} models.AccessLogDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/access-log [post]
func (h *AccessLogHandler) Create(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Create(c)
}

// Read retrieves a list of access logs
// @Summary Get a list of access logs
// @Description Get a list of access logs
// @Tags AccessLog
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.AccessLogPage
// @Router /{org_id}/access-log [get]
func (h *AccessLogHandler) Read(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Read(c)
}

// Update updates an existing access log
// @Summary Update an existing access log
// @Description Update an existing access log
// @Tags AccessLog
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "AccessLog ID"
// @Param org_id path string true "Organization ID"
// @Param AccessLog body models.AccessLogDTO true "AccessLog data"
// @Success 200 {object} models.AccessLogDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/access-log/{id} [put]
func (h *AccessLogHandler) Update(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Update(c)
}

// Delete deletes an existing access log
// @Summary Delete an existing access log
// @Description Delete an existing access log
// @Tags AccessLog
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "AccessLog ID"
// @Param org_id path string true "Organization ID"
// @Success 200 {object} models.AccessLog
// @Failure 500 {object} string
// @Router /{org_id}/access-log/{id} [delete]
func (h *AccessLogHandler) Delete(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Delete(c)
}

// GetByID retrieves a access log by ID
// @Summary Get a access log by ID
// @Description Get a access log by ID
// @Tags AccessLog
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "AccessLog ID"
// @Param org_id path string true "Organization ID"
// @Success 200 {object} models.AccessLog
// @Failure 500 {object} string
// @Router /{org_id}/access-log/{id} [get]
func (h *AccessLogHandler) GetByID(c *fiber.Ctx) error {
	return h.OrgCrudHandler.GetByID(c)
}
