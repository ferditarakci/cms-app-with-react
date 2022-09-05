const formControl = e => {
	const el = e.target || e

	const { classList: css, value: val, name } = el

	css.remove('is-invalid')

	if (val.trim().length === 0 || val.length > 255) {
		css.add('is-invalid')
	}

	if (name === 'content') {
		const tinymce = document.querySelector('.tox-tinymce')
		tinymce.style.borderColor = ''

		if (val.trim().length === 0) {
			tinymce.style.borderColor = '#dc3545'
		}
	}
}

export default formControl