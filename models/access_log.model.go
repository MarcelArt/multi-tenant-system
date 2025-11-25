package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

const accessLogTableName = "access_logs"

type AccessLog struct {
	gorm.Model
	Permission   string `gorm:"not null" json:"permission"`
	IsAuthorized bool   `gorm:"not null;default:false" json:"isAuthorized"`
	Message      string `gorm:"not null" json:"message"`

	UserID         uint `gorm:"not null" json:"userId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`

	User         *User         `json:"user,omitzero"`
	Organization *Organization `json:"organization,omitzero"`
}

type AccessLogDTO struct {
	DTO
	Permission   string `gorm:"not null" json:"permission"`
	IsAuthorized bool   `gorm:"not null;default:false" json:"isAuthorized"`
	Message      string `gorm:"not null" json:"message"`

	UserID         uint `gorm:"not null" json:"userId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`
}

type AccessLogPage struct {
	ID             uint           `json:"ID"`
	UserID         uint           `json:"userId"`
	OrganizationID uint           `json:"organizationId"`
	Username       string         `json:"username"`
	Permission     string         `json:"permission"`
	IsAuthorized   bool           `json:"isAuthorized"`
	Message        string         `json:"message"`
	CreatedAt      string         `json:"createdAt"`
	Roles          datatypes.JSON `json:"roles"`
}

func (AccessLogDTO) TableName() string {
	return accessLogTableName
}
