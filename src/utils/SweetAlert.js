import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Swal = withReactContent(SweetAlert)

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 1000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})

export default Swal

export { Toast }