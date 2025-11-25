package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const rolePageQuery = `
	select
		r.id id,
		r.value value,
		string_agg(rp.permission, ';') permissions
	from
		roles r
	left join role_permissions rp on r.id = rp.role_id and rp.deleted_at isnull
	where
		r.organization_id = ?
		and r.deleted_at is null
	group by r.id, r.value
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
