import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HtmlParse from 'html-react-parser'

const Detail = () => {

	const { id } = useParams()
	const [article, setArticle] = useState({})

	const getArticle = () => {
		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY)
		data = JSON.parse(data) || []

		data = data.find(el => el.id === parseInt(id))

		setArticle(data)
	}

	useEffect(() => {
		getArticle()
	}, [])

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1 className="h2 mb-2">{article?.title}</h1>
					</div>
					<div className="col-12">
						<div className="border-bottom mb-5"></div>
					</div>
					<div className="col-12 mt-3">
						{HtmlParse(`${article?.content}`)}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Detail