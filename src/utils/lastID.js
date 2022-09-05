const lastID = data => {
	const newSort = data.sort((a, b) => {
		if (a.id < b.id) return 1
		else if (a.id > b.id) return -1
		return 0
	})

	if (newSort.length) {
		return newSort[0].id
	}

	return 0
}

export default lastID