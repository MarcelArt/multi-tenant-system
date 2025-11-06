package objects

import (
	"encoding/json"
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

func ToMap(s any) (map[string]any, error) {
	var sMap map[string]any
	sJSON, err := json.Marshal(s)
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(sJSON, &sMap)

	return sMap, err
}

// toPtr has to be a pointer
func Cast(from any, toPtr any) error {
	fromJSON, err := json.Marshal(from)
	if err != nil {
		return err
	}

	return json.Unmarshal(fromJSON, toPtr)
}
