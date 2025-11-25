package models

import "gorm.io/gorm"

const formTemplateTableName = "form_templates"

type FormTemplate struct {
	gorm.Model
	Title       string `gorm:"not null" json:"title"`
	Description string `gorm:"not null" json:"description"`

	OrganizationID uint `gorm:"not null" json:"organizationId"`

	Organization *Organization `json:"organization,omitzero"`
}

type FormTemplateDTO struct {
	DTO
	Title       string `gorm:"not null" json:"title"`
	Description string `gorm:"not null" json:"description"`

	OrganizationID uint `gorm:"not null" json:"organizationId"`
}

type FormTemplatePage struct {
	ID          uint   `gorm:"primarykey" json:"ID"`
	Title       string `gorm:"not null" json:"title"`
	Description string `gorm:"not null" json:"description"`
}

func (FormTemplateDTO) TableName() string {
	return formTemplateTableName
}
