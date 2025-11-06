package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const organizationPageQuery = `
	select * from organizations o
	where o.deleted_at is null
`

type IOrganizationRepo interface {
	IBaseCrudRepo[models.Organization, models.OrganizationDTO, models.OrganizationPage]
}

type OrganizationRepo struct {
	BaseCrudRepo[models.Organization, models.OrganizationDTO, models.OrganizationPage]
}

func NewOrganizationRepo(db *gorm.DB) *OrganizationRepo {
	return &OrganizationRepo{
		BaseCrudRepo: BaseCrudRepo[models.Organization, models.OrganizationDTO, models.OrganizationPage]{
			db:        db,
			pageQuery: organizationPageQuery,
		},
	}
}
