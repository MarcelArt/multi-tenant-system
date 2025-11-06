package api_handlers

import (
	"github.com/MarcelArt/multi-tenant-system/database"
	"github.com/MarcelArt/multi-tenant-system/models"
	"github.com/MarcelArt/multi-tenant-system/repositories"
	"github.com/MarcelArt/multi-tenant-system/utils"
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
			repo:      repo,
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
	var input models.OrganizationDTO
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.NewJSONResponse(err, ""))
	}

	tx := database.GetDB().Begin()
	defer tx.Rollback()
	repo := repositories.NewOrganizationRepo(tx)
	uoRepo := repositories.NewUserOrganizationRepo(tx)
	rRepo := repositories.NewRoleRepo(tx)
	urRepo := repositories.NewUserRoleRepo(tx)
	rpRepo := repositories.NewRolePermissionRepo(tx)

	id, err := repo.Create(input)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.NewJSONResponse(err, ""))
	}

	userId := c.Locals("userId")
	userOrg := models.UserOrganizationDTO{
		OrganizationID: id,
		UserID:         utils.ClaimsNumberToUint(userId),
	}
	if _, err := uoRepo.Create(userOrg); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.NewJSONResponse(err, ""))
	}

	role := models.RoleDTO{
		OrganizationID: id,
		Value:          "Owner",
	}
	roleID, err := rRepo.Create(role)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.NewJSONResponse(err, ""))
	}

	permissions := []models.RolePermissionDTO{
		{RoleID: roleID, Permission: "role#view"},
		{RoleID: roleID, Permission: "role#manage"},
	}
	if err := rpRepo.BulkCreate(permissions); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.NewJSONResponse(err, "failed creating default permissions"))
	}

	userRole := models.UserRoleDTO{
		RoleID: roleID,
		UserID: utils.ClaimsNumberToUint(userId),
	}
	if _, err := urRepo.Create(userRole); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.NewJSONResponse(err, ""))
	}

	tx.Commit()
	return c.Status(fiber.StatusCreated).JSON(models.NewJSONResponse(fiber.Map{"ID": id}, "Created successfully"))
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
