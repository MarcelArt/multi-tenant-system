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
	BulkCreate(inputs []models.UserRoleDTO) error
	GetDistinctByUserID(userID any) ([]uint, error)
	DeleteByUserIDAndRoleIDs(userID any, roleIDs []uint) error
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

func (r *UserRoleRepo) BulkCreate(inputs []models.UserRoleDTO) error {
	return r.db.Create(&inputs).Error
}

func (r *UserRoleRepo) GetDistinctByUserID(userID any) ([]uint, error) {
	var roleIDs []uint
	err := r.db.Model(models.UserRole{}).Where("user_id = ?", userID).Distinct("role_id").Pluck("role_id", &roleIDs).Error
	return roleIDs, err
}

func (r *UserRoleRepo) DeleteByUserIDAndRoleIDs(userID any, roleIDs []uint) error {
	return r.db.Where("user_id = ? AND role_id IN ?", userID, roleIDs).Delete(&models.UserRole{}).Error
}
