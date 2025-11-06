package objects

import (
	"errors"
	"reflect"
)

type Tag struct {
	Key   string
	Value string
}

type FieldType struct {
	Field string
	Type  string
	Tags  []Tag
}

func Fields(s any, tags ...string) ([]FieldType, error) {
	t := reflect.TypeOf(s)

	if t.Kind() != reflect.Struct {
		return nil, errors.New("not a struct")
	}

	fieldTypes := make([]FieldType, 0)

	for i := range t.NumField() {
		field := t.Field(i)
		fieldType := FieldType{
			Field: field.Name,
			Type:  field.Type.Name(),
		}

		if len(tags) > 0 {
			for _, tag := range tags {
				tagValue := field.Tag.Get(tag)
				fieldType.Tags = append(fieldType.Tags, Tag{
					Key:   tag,
					Value: tagValue,
				})
			}
		}

		fieldTypes = append(fieldTypes, fieldType)
	}

	return fieldTypes, nil
}

func Get(s any, field string) (any, error) {
	v := reflect.ValueOf(s)

	var value any

	if v.Kind() != reflect.Struct {
		return value, errors.New("not a struct")
	}

	f := v.FieldByName(field)
	if !f.IsValid() {
		return value, errors.New("field not found")
	}

	value = f.Interface()

	return value, nil
}
