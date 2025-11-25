package models

import "gorm.io/gorm"

const userOrganizationTableName = "user_organizations"

type UserOrganization struct {
	gorm.Model
	UserID         uint   `gorm:"not null" json:"userId"`
	OrganizationID uint   `gorm:"not null" json:"organizationId"`
	Status         string `gorm:"default:active" json:"status"`

	User         *User         `json:"user,omitzero"`
	Organization *Organization `json:"organization,omitzero"`
}

type UserOrganizationDTO struct {
	DTO
	UserID         uint   `gorm:"not null" json:"userId"`
	OrganizationID uint   `gorm:"not null" json:"organizationId"`
	Status         string `gorm:"default:active" json:"status"`
}

type UserOrganizationPage struct {
	ID             uint   `json:"ID"`
	UserID         uint   `gorm:"not null" json:"userId"`
	Username       string `json:"username"`
	Email          string `json:"email"`
	OrganizationID uint   `gorm:"not null" json:"organizationId"`
	ShortName      string `json:"shortName"`
	LongName       string `json:"longName"`
	Status         string `gorm:"default:active" json:"status"`
}

type InviteUser struct {
	UserIDs        []uint `json:"userIds"`
	OrganizationID uint   `json:"organizationId"`
}

func (UserOrganizationDTO) TableName() string {
	return userOrganizationTableName
}
