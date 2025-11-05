package models

import "gorm.io/gorm"

const organizationTableName = "organizations"

type Organization struct {
	gorm.Model
	ShortName string `gorm:"not null" json:"shortName"`
	LongName  string `gorm:"not null" json:"longName"`
	Code      string `gorm:"not null" json:"code"`
}

type OrganizationDTO struct {
	DTO
	ShortName string `gorm:"not null" json:"shortName"`
	LongName  string `gorm:"not null" json:"longName"`
	Code      string `gorm:"not null" json:"code"`
}

type OrganizationPage struct {
	ID        uint   `gorm:"primarykey"`
	ShortName string `gorm:"not null" json:"shortName"`
	LongName  string `gorm:"not null" json:"longName"`
	Code      string `gorm:"not null" json:"code"`
}

func (OrganizationDTO) TableName() string {
	return organizationTableName
}
