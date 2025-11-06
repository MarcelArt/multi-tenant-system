package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const userRolePageQuery = `
	select * from user_roles ur
	where ur.deleted_at is null
`

type IUserRoleRepo interface {
	IBaseCrudRepo[models.UserRole, models.UserRoleDTO, models.UserRolePage]
}

type UserRoleRepo struct {
	BaseCrudRepo[models.UserRole, models.UserRoleDTO, models.UserRolePage]
}

func NewUserRoleRepo(db *gorm.DB) *UserRoleRepo {
	return &UserRoleRepo{
		BaseCrudRepo: BaseCrudRepo[models.UserRole, models.UserRoleDTO, models.UserRolePage]{
			db:        db,
			pageQuery: userRolePageQuery,
		},
	}
}
