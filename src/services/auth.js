import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL + '/auth'

const signup = data => {
	return axios
		.post(API_URL + '/signup', data)
		.then((response) => {
			const user = response.data
			const token = user.accessToken
			if (token) {
				localStorage.setItem('user', JSON.stringify(user))
			}

			return user
		})
}

const login = data => {
	return axios
		.post(API_URL + '/login', data)
		.then((response) => {
			const user = response.data
			const token = user.accessToken
			if (token) {
				localStorage.setItem('user', JSON.stringify(user))
			}

			return user
		})
}

const logout = () => {
	localStorage.removeItem('user')
}

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem('user'))
}

const AuthService = {
	signup,
	login,
	logout,
	getCurrentUser
}

export default AuthService