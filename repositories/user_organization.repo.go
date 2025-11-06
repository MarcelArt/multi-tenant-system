package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const userOrganizationPageQuery = `
	select * from user_organizations uo
	where uo.deleted_at is null
`

type IUserOrganizationRepo interface {
	IBaseCrudRepo[models.UserOrganization, models.UserOrganizationDTO, models.UserOrganizationPage]
}

type UserOrganizationRepo struct {
	BaseCrudRepo[models.UserOrganization, models.UserOrganizationDTO, models.UserOrganizationPage]
}

func NewUserOrganizationRepo(db *gorm.DB) *UserOrganizationRepo {
	return &UserOrganizationRepo{
		BaseCrudRepo: BaseCrudRepo[models.UserOrganization, models.UserOrganizationDTO, models.UserOrganizationPage]{
			db:        db,
			pageQuery: userOrganizationPageQuery,
		},
	}
}
