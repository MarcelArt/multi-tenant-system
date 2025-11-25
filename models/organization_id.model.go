package models

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type OrganizationID struct {
	OrganizationID uint `json:"organizationId,omitzero"`
	OrgID          uint `json:"orgId,omitzero"`
}

func (m *OrganizationID) FromBody(c *fiber.Ctx) {
	if err := c.BodyParser(m); err != nil {
		m.OrgID = 0
		m.OrganizationID = 0
	}
}

func (m OrganizationID) ToString() string {
	if m.OrganizationID != 0 {
		return strconv.Itoa(int(m.OrganizationID))
	}
	if m.OrgID != 0 {
		return strconv.Itoa(int(m.OrgID))
	}

	return ""
}
