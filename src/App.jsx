import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthProvider, { PublicRoute, PrivateRoute } from './contexts/AuthProvider'

import 'sweetalert2/src/sweetalert2.scss'
import './assets/scss/style.scss'

import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './components/home/Index'
import Login from './components/auth/Login'
import Users from './components/auth/Users'
import Articles from './components/articles/Lists'
import ArticleCreate from './components/articles/Create'
import ArticleDetail from './components/articles/Detail'

const App = () => {
	return (
		<AuthProvider>
			<Header />
			<main className="main">
				<Routes>
					<Route element={<PublicRoute />}>
						<Route path="/login" element={<Login />} />
						<Route path="/logout" element={<Navigate to='/login' replace />} />
					</Route>
					<Route element={<PrivateRoute />}>
						<Route index path="/" element={<Home />} />
						<Route path="/users" element={<Users />} />
						<Route path="/articles" element={<Articles />} />
						<Route path="/article">
							<Route path="create" element={<ArticleCreate />} />
							<Route path="edit/:id" element={<ArticleCreate />} />
							<Route path="detail/:id" element={<ArticleDetail />} />
						</Route>
					</Route>

					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</main>
			<Footer />
		</AuthProvider>
	)
}

export default App