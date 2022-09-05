const getDate = (date = new Date()) => {
	// if (typeof date != 'undefined') {date = Date.parse(date)}
	date = new Date(Date.parse(date))
	let year = date.getFullYear()

	let month = date.getMonth() + 1
	if (month < 10) month = '0' + month

	let day = date.getDate()
	if (day < 10) day = '0' + day

	let hour = date.getHours()
	if (hour < 10) hour = '0' + hour

	let minute = date.getMinutes()
	if (minute < 10) minute = '0' + minute

	let second = date.getSeconds()
	if (second < 10) second = '0' + second

	return {
		year,
		month,
		day,
		hour,
		minute,
		second
	}
}

export default getDate