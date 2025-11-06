package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const rolePermissionPageQuery = `
	select * from role_permissions rp 
	where rp.deleted_at is null
`

type IRolePermissionRepo interface {
	IBaseCrudRepo[models.RolePermission, models.RolePermissionDTO, models.RolePermissionPage]
	GetDistinctByRoleID(roleID any) ([]string, error)
	DeleteByRoleIDAndPermissions(roleID any, permissions []string) error
	BulkCreate(inputs []models.RolePermissionDTO) error
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

func (r *RolePermissionRepo) GetDistinctByRoleID(roleID any) ([]string, error) {
	var permissions []string
	err := r.db.Model(models.RolePermission{}).Where("role_id = ?", roleID).Distinct("permission").Pluck("permission", &permissions).Error
	return permissions, err
}

func (r *RolePermissionRepo) DeleteByRoleIDAndPermissions(roleID any, permissions []string) error {
	return r.db.Where("role_id = ? AND permission IN ?", roleID, permissions).Delete(&models.RolePermission{}).Error
}

func (r *RolePermissionRepo) BulkCreate(inputs []models.RolePermissionDTO) error {
	return r.db.Create(&inputs).Error
}
