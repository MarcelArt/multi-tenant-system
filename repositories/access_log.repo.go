package repositories

import (
	"github.com/MarcelArt/multi-tenant-system/models"
	"gorm.io/gorm"
)

const accessLogPageQuery = `
	select
		al.id id,
		al.user_id user_id,
		al.organization_id organization_id,
		u.username username,
		al."permission" permission,
		al.is_authorized is_authorized,
		al.message message,
		al.created_at created_at,
		json_agg(r.value)::jsonb roles
	from access_logs al 
	left join users u on al.user_id = u.id 
	join user_roles ur on u.id = ur.user_id and ur.deleted_at isnull
	join roles r on ur.role_id = r.id and r.deleted_at isnull and r.organization_id = $1
	where al.deleted_at isnull
	and al.organization_id = $1
	group by
		al.id,
		u.username,
		al.is_authorized,
		al.message,
		al.created_at
`

type IAccessLogRepo interface {
	IOrgCrudRepo[models.AccessLog, models.AccessLogDTO, models.AccessLogPage]
}

type AccessLogRepo struct {
	OrgCrudRepo[models.AccessLog, models.AccessLogDTO, models.AccessLogPage]
}

func NewAccessLogRepo(db *gorm.DB) *AccessLogRepo {
	return &AccessLogRepo{
		OrgCrudRepo: OrgCrudRepo[models.AccessLog, models.AccessLogDTO, models.AccessLogPage]{
			db:        db,
			pageQuery: accessLogPageQuery,
		},
	}
}
