package models

import "gorm.io/gorm"

const roleTableName = "roles"

type Role struct {
	gorm.Model
	Value          string `gorm:"not null" json:"value"`
	OrganizationID uint   `gorm:"not null" json:"organizationId"`

	Organization *Organization `json:"organization,omitzero"`
}

type RoleDTO struct {
	DTO
	Value          string `gorm:"not null" json:"value"`
	OrganizationID uint   `gorm:"not null" json:"organizationId"`
}

type RolePage struct {
	ID    uint   `gorm:"primarykey" json:"ID"`
	Value string `gorm:"not null" json:"value"`
}

type AssignPermissionsToRole struct {
	RoleID      uint     `json:"roleId"`
	Permissions []string `json:"permissions"`
}

func (RoleDTO) TableName() string {
	return roleTableName
}
