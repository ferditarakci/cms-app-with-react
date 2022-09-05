import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import lastID from '../../utils/lastID'
import getDate from '../../utils/getDate'

import './lists.scss'

const Articles = () => {

	const { userData } = useContext(AuthContext)
	const [articles, setArticles] = useState([])
	const [ratings, setRatings] = useState([])

	const getArticles = async () => {

		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY)
		data = await JSON.parse(data) || []

		// İlk açılışta LocalStorage'da veri yoksa fake datayı çekiyoruz
		if (!data.length) {
			data = await axios.get('/api/articles.json').then(response => response.data)

			localStorage.setItem(
				process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY,
				JSON.stringify(data)
			)
		}

		await data.sort((a, b) => {
			if (a.priority < b.priority) return -1
			else if (a.priority > b.priority) return 1
			return 0
		})

		setArticles(data)
	}

	const getRatings = async () => {
		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_RATING_KEY)
		data = await JSON.parse(data) || []

		// İlk açılışta LocalStorage'da veri yoksa fake datayı çekiyoruz
		if (!data.length) {
			data = await axios.get('/api/ratings.json').then(response => response.data)

			localStorage.setItem(
				process.env.REACT_APP_LOCAL_STORAGE_RATING_KEY,
				JSON.stringify(data)
			)
		}

		setRatings(data)
	}

	const GetRating = props => {
		const { id } = props
		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_RATING_KEY)
		data = JSON.parse(data) || []

		let rating = data.find(r => r.article_id === id)

		let ratingID = rating?.id

		if (typeof rating === 'undefined') ratingID = 0

		const stars = []

		const addRating = props => {
			let add = []

			if (props.id) {
				add = ratings.map(el => {
					if (el.id === props.id) {
						return props
					}

					return el
				})
			}
			else {
				props.id = lastID(ratings) + 1
				add = [...ratings, props]
			}

			localStorage.setItem(
				process.env.REACT_APP_LOCAL_STORAGE_RATING_KEY,
				JSON.stringify(add)
			)

			getRatings()
		}

		const selectedClass = e => {
			let prevSibling = e.target.prevElementSibling
			while (prevSibling) {
				prevSibling.classList.add('selected')
				prevSibling = prevSibling.prevElementSibling
			}

			let nextSibling = e.target.nextElementSibling
			while (nextSibling) {
				nextSibling.classList.remove('selected')
				nextSibling = nextSibling.nextElementSibling
			}

			e.target.classList.add('selected')
		}

		for (let i = 1; i <= 5; i++) {
			stars.push(
				<i
					key={id + '-' + i}
					className={`fa-solid fa-star${(rating?.star >= i) ? ' selected' : ''}`}
					onClick={(e) => {
						selectedClass(e);
						addRating({
							id: ratingID,
							user_id: userData.user.id,
							article_id: id,
							star: i
						})
					}}
				></i>
			)
		}

		return stars
	}

	const GetTotalRating = props => {
		const { id } = props
		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_RATING_KEY)
		data = JSON.parse(data) || []

		let total = 0
		let ratings = data.filter(r => r.article_id === id)

		if (ratings.length) {
			total = ratings.map(el => el.star)
			total = total?.reduce((a, b) => a + b, 0)
			total = total / ratings.length
			total = parseFloat((total / ratings.length).toFixed(1))
		}

		return (`${total} / 5`)
	}

	const GetDateTime = props => {
		const { year, month, day, hour, minute } = getDate(props.date)
		return `${day}/${month}/${year} ${hour}:${minute}`
	}

	const Description = props => {
		let data = props.value
		return `${data.substr(0, 100).trim()}${data.length > 100 ? '...' : ''}`
	}

	useEffect(() => {
		getArticles()
		getRatings()
	}, [])

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1 className="h2 mb-2">Articles</h1>
					</div>
					<div className="col-12">
						<div className="border-bottom mb-5"></div>
					</div>
					<div className="col-12">
						<div className="row">
							{articles.map(el => (
								<div key={el.id} className="col-12 col-md-4 mt-3 d-flex">
									<div className={`card${(el.user_id !== userData.user.id) ? ' my-article' : ''}`}>
										<div className="position-relative">
											<NavLink to={`/article/detail/${el.id}`}>
												<img src="/assets/images/image.jpg" className="card-img-top" alt={el.title} />
											</NavLink>
											{(el.user_id === userData.user.id) && <NavLink to={`/article/edit/${el.id}`} className="edit-link ms-3">
												<i className="fa-solid fa-file-pen"></i>
											</NavLink>}
											<div className="article-date"><GetDateTime date={el.date} /></div>
										</div>
										<div className="card-body">
											<h5 className="card-title">
												<NavLink to={`/article/detail/${el.id}`}>{el.title}</NavLink>
											</h5>
											<div className="card-text">
												<Description value={el.description} />
											</div>
											<div className="mt-3">
												<div className="rating">
													<div className="total-rating">
														<GetTotalRating id={el.id} />
													</div>
													<div className="stars">
														<i className="fa-regular fa-star"></i>
														<i className="fa-regular fa-star"></i>
														<i className="fa-regular fa-star"></i>
														<i className="fa-regular fa-star"></i>
														<i className="fa-regular fa-star"></i>
													</div>
													<div className="stars">
														<GetRating id={el.id} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Articles