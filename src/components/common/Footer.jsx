import React from 'react'
import Package from '../../../package.json'
import './footer.scss'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="row">
					<div className="col-6">
						<div className="repository">
							<a href={`https://github.com/ferditarakci/${Package.name}`} target="_blank" rel="noreferrer">
								<i className="fa-brands fa-git"></i>repository
							</a>
						</div>
					</div>
					<div className="col-6">
						<div className="copyright">
							© 2022 Ferdi Tarakcı
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer