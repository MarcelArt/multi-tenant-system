package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const rolePermissionPageQuery = `
	select * from role_permissions rp 
`

type IRolePermissionRepo interface {
	IBaseCrudRepo[models.RolePermission, models.RolePermissionDTO, models.RolePermissionPage]
}

type RolePermissionRepo struct {
	BaseCrudRepo[models.RolePermission, models.RolePermissionDTO, models.RolePermissionPage]
}

func NewRolePermissionRepo(db *gorm.DB) *RolePermissionRepo {
	return &RolePermissionRepo{
		BaseCrudRepo: BaseCrudRepo[models.RolePermission, models.RolePermissionDTO, models.RolePermissionPage]{
			db:        db,
			pageQuery: rolePermissionPageQuery,
		},
	}
}
