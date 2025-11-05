package models

import "gorm.io/gorm"

const userOrganizationTableName = "user_organizations"

type UserOrganization struct {
	gorm.Model
	UserID         uint `gorm:"not null" json:"userId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`

	User         *User         `json:"user,omitzero"`
	Organization *Organization `json:"organization,omitzero"`
}

type UserOrganizationDTO struct {
	DTO
	UserID         uint `gorm:"not null" json:"userId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`
}

type UserOrganizationPage struct {
	UserID         uint `gorm:"not null" json:"userId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`
}

func (UserOrganizationDTO) TableName() string {
	return userOrganizationTableName
}
