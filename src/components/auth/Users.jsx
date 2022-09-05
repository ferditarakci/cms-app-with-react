import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Users = () => {

	const [users, setUser] = useState([])

	useEffect(() => {
		try {
			return await AuthService.users()
				.then(response => {
					setUser(response)
				})
				.catch(error => console.error('Users', error))
		}
		catch (error) {
			console.error('Users', error)
		}
	}, [])

	return (
		<section className="users">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1 className="h2 mb-2">User Lists</h1>
					</div>
					<div className="col-12">
						<div className="border-bottom mb-5"></div>
					</div>
					<div className="col-12">
						<div className="row">
							{users.map(el => (
								<div key={el.id} className="col-12 col-md-4 mt-3 d-flex">
									<div className="card">
										<img src="/assets/images/image2.jpg" className="card-img-top" alt={el.name} />
										<div className="card-body">
											<h5 className="card-title">{el.name}</h5>
											<div className="card-text">{el.description}</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Users