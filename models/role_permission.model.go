package models

import "gorm.io/gorm"

const rolePermissionTableName = "role_permissions"

type RolePermission struct {
	gorm.Model
	Permission string `gorm:"not null" json:"permission"`
	RoleID     uint   `gorm:"not null" json:"roleId"`

	Role *Role `json:"role,omitzero"`
}

type RolePermissionDTO struct {
	DTO
	Permission string `gorm:"not null" json:"permission"`
	RoleID     uint   `gorm:"not null" json:"roleId"`
}

type RolePermissionPage struct {
	ID         uint   `gorm:"primarykey" json:"ID"`
	Permission string `gorm:"not null" json:"permission"`
	RoleID     uint   `gorm:"not null" json:"roleId"`
}

func (RolePermissionDTO) TableName() string {
	return rolePermissionTableName
}
