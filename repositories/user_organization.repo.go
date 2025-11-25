package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const userOrganizationPageQuery = `
	select
		uo.id id,
		uo.user_id user_id,
		u.username username,
		u.email email,
		uo.organization_id organization_id,
		o.short_name short_name,
		o.long_name long_name,
		uo.status status
	from user_organizations uo
	left join organizations o on uo.organization_id = o.id and o.deleted_at isnull
	left join users u on uo.user_id = u.id and u.deleted_at isnull
	where uo.deleted_at is null
`

type IUserOrganizationRepo interface {
	IBaseCrudRepo[models.UserOrganization, models.UserOrganizationDTO, models.UserOrganizationPage]
	BulkCreate(inputs []models.UserOrganizationDTO) ([]models.UserOrganizationDTO, error)
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

func (r *UserOrganizationRepo) BulkCreate(inputs []models.UserOrganizationDTO) ([]models.UserOrganizationDTO, error) {
	err := r.db.Create(&inputs).Error
	return inputs, err
}
