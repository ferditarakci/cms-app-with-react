import React, { useContext, useState } from 'react'
import { Toast } from '../../utils/SweetAlert'
import formControl from '../../utils/formControl'
import { AuthContext } from '../../contexts/AuthContext'

import './login.scss'

const Login = () => {

	const { handleLogin } = useContext(AuthContext)
	const [isLoading, setLoading] = useState(false)
	const [showPass, setShowPass] = useState(false)

	const handleForm = async e => {
		e.preventDefault()
		setLoading(true)

		const form = e.target
		Array.from(form).forEach(el => formControl(el))

		if (form.checkValidity()) {
			const formData = new FormData(form)

			const user = {
				email: formData.get('email'),
				password: formData.get('password')
			}

			await handleLogin(user).then(() => {
				Toast.fire({
					icon: 'success',
					title: 'Signed in!'
				})

				setLoading(false)
			})
		}
		else {
			Toast.fire({
				icon: 'error',
				title: 'Please fill in the required fields!'
			})
		}
	}

	return (
		<section className="login">
			<div className="container">
				<div className="row">
					<div className="col-12 text-center mb-3">
						<h1 className="logo">
							<a href={`${process.env.PUBLIC_URL}/`}>LOGO</a>
						</h1>
					</div>
				</div>
				<div className="form">
					<form onSubmit={(e) => handleForm(e)} noValidate>
						<div className="row">
							<div className="col-12">
								<h2>Log In</h2>
								<div className="border-bottom mb-4"></div>
							</div>
							<div className="col-12">
								<label htmlFor="email">E-mail</label>
								<div className="position-relative mt-1">
									<input onChange={(e) => formControl(e)} name="email" id="email" type="email" className="form-control" required />
								</div>
							</div>
							<div className="col-12 mt-4">
								<label htmlFor="password">Password</label>
								<div className="position-relative mt-1">
									<input onChange={(e) => formControl(e)} name="password" id="password" type={showPass ? 'text' : 'password'} className="form-control" required />
									<i onClick={() => setShowPass(!showPass)} className={`show-pass fas ${showPass ? 'fa-eye' : 'fa-eye-slash'}`}></i>
								</div>
							</div>
							<div className="col-12 mt-4">
								<button type="submit" className={`btn ${isLoading ? 'btn-secondary' : 'btn-pink'} w-100 mt-1`} disabled={isLoading}>
									{isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Login'}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Login