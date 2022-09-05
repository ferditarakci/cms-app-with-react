import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import './header.scss'

const Header = () => {
	const { isAuth, handleLogout } = useContext(AuthContext)

	return (
		isAuth &&
		(
			<header className="header">
				<div className="container">
					<div className="row pt-3 pb-3">
						<div className="col-6">
							<h1 className="logo">
								<a href={`${process.env.PUBLIC_URL}/`}>LOGO</a>
							</h1>
						</div>
						<div className="col-6">
							<nav className="nav justify-content-end">
								<NavLink className="nav-link" to="/">Home</NavLink>
								<NavLink className="nav-link" to="/users">Users</NavLink>
								<NavLink className="nav-link" to="/articles">Articles</NavLink>
								<NavLink className="nav-link" to="/article/create">Create Article</NavLink>
								<NavLink className="nav-link btn-logout" to="/logout" onClick={() => handleLogout()}>Log out</NavLink>
							</nav>
						</div>
					</div>
				</div>
			</header>
		)
	)
}

export default Header