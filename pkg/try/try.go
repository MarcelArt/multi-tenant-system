package try

import "fmt"

func Catch(err *error) {
	if r := recover(); r != nil {
		*err = fmt.Errorf("%v", r)
	}

	err = nil
}
