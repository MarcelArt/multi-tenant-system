package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const formTemplatePageQuery = `
	select
		*
	from form_templates ft 
	where ft.organization_id = ?
	and ft.deleted_at isnull
`

type IFormTemplateRepo interface {
	IOrgCrudRepo[models.FormTemplate, models.FormTemplateDTO, models.FormTemplatePage]
}

type FormTemplateRepo struct {
	OrgCrudRepo[models.FormTemplate, models.FormTemplateDTO, models.FormTemplatePage]
}

func NewFormTemplateRepo(db *gorm.DB) *FormTemplateRepo {
	return &FormTemplateRepo{
		OrgCrudRepo: OrgCrudRepo[models.FormTemplate, models.FormTemplateDTO, models.FormTemplatePage]{
			db:        db,
			pageQuery: formTemplatePageQuery,
		},
	}
}
