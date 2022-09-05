import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthService from '../services/auth'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {

	const [isAuth, setIsAuth] = useState(false)
	const [userData, setUserData] = useState(null)

	const getUserData = async () => {
		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_USER_KEY)
		data = await JSON.parse(data) || {}

		if (typeof data.user !== 'undefined') {
			setIsAuth(true)
			setUserData(data)
			return true
		}

		setIsAuth(false)
		setUserData(null)
	}

	const handleLogin = async (user) => {
		// Fake loading
		await new Promise(r => setTimeout(r, 1000))

		try {
			return await AuthService.login(user)
				.then(response => {
					setIsAuth(true)
					setUserData(response)
				})
				.catch(error => console.error('Login Error', error))
		}
		catch (error) {
			console.error('Login Error', error)
		}

		return true
	}

	const handleLogout = () => {
		setIsAuth(false)
		setUserData(null)
		localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_USER_KEY)
	}

	const value = {
		isAuth,
		setIsAuth,
		userData,
		setUserData,
		handleLogin,
		handleLogout
	}

	useEffect(() => {
		getUserData()

		setTimeout(() => {
			const html = document.getElementsByTagName('html')[0]
			if (!isAuth) {
				html.classList.add('no-login')
			}
			else {
				html.classList.remove('no-login')
			}
		}, 10)

	}, [isAuth])

	return (
		<BrowserRouter>
			<AuthContext.Provider value={value}>
				{children}
			</AuthContext.Provider>
		</BrowserRouter>
	)
}

const PublicRoute = () => {
	const { isAuth } = useContext(AuthContext)
	const { pathname } = useLocation()
	// console.log("PublicRoute", pathname)

	if (isAuth && pathname === '/login') {
		return <Navigate to='/' replace state={{ path: pathname }} />
	}

	return <Outlet />
}

const PrivateRoute = () => {
	const { isAuth } = useContext(AuthContext)
	const { pathname, state } = useLocation()
	// console.log("PrivateRoute", location)

	if (!isAuth && pathname !== '/' && !state) return

	if (!isAuth && pathname !== '/') {
		return <Navigate to='/' replace state={{ path: pathname }} />
	}

	else if (!isAuth && pathname === '/') {
		return <Navigate to='/login' replace state={{ path: pathname }} />
	}

	return <Outlet />
}

export default AuthProvider

export { PublicRoute, PrivateRoute }