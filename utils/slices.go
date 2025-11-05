package utils

func SliceDiffCheck[T comparable](a []T, b []T) (aDiff, bDiff []T) {
	aMap := make(map[T]bool)
	bMap := make(map[T]bool)

	for _, v := range a {
		aMap[v] = true
	}

	// Mark all new elements
	for _, v := range b {
		bMap[v] = true
	}

	// Find items in old but not in new
	for _, v := range a {
		if !bMap[v] {
			aDiff = append(aDiff, v)
		}
	}

	// Find items in new but not in old
	for _, v := range b {
		if !aMap[v] {
			bDiff = append(bDiff, v)
		}
	}

	return
}
