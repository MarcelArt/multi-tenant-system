package models

import "gorm.io/gorm"

const userRoleTableName = "user_roles"

type UserRole struct {
	gorm.Model
	UserID uint `gorm:"not null" json:"userId"`
	RoleID uint `gorm:"not null" json:"roleId"`

	User *User `json:"user,omitzero"`
	Role *Role `json:"role,omitzero"`
}

type UserRoleDTO struct {
	DTO
	UserID uint `gorm:"not null" json:"userId"`
	RoleID uint `gorm:"not null" json:"roleId"`
}

type UserRolePage struct {
	ID     uint `gorm:"primarykey" json:"ID"`
	UserID uint `gorm:"not null" json:"userId"`
	RoleID uint `gorm:"not null" json:"roleId"`
}

func (UserRoleDTO) TableName() string {
	return userRoleTableName
}
