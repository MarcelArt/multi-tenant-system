package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const rolePageQuery = `
	select * from roles r 
	where r.organization_id = ?
	and r.deleted_at is null
`

type IRoleRepo interface {
	IOrgCrudRepo[models.Role, models.RoleDTO, models.RolePage]
}

type RoleRepo struct {
	OrgCrudRepo[models.Role, models.RoleDTO, models.RolePage]
}

func NewRoleRepo(db *gorm.DB) *RoleRepo {
	return &RoleRepo{
		OrgCrudRepo: OrgCrudRepo[models.Role, models.RoleDTO, models.RolePage]{
			db:        db,
			pageQuery: rolePageQuery,
		},
	}
}
