import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { Toast } from '../../utils/SweetAlert'
import lastID from '../../utils/lastID'
import formControl from '../../utils/formControl'
import { AuthContext } from '../../contexts/AuthContext'

import './create.scss'

const Create = () => {

	const { id } = useParams()
	const navigate = useNavigate()
	const { userData } = useContext(AuthContext)

	const editorRef = useRef(null)
	const [isLoading, setLoading] = useState(false)

	const [article, setArticle] = useState({})
	const [articles, setArticles] = useState([])
	const [pageID] = useState(parseInt(id))

	const getData = async () => {
		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY)
		data = await JSON.parse(data) || []
		return data
	}

	const getArticles = async () => {
		let data = await getData()

		await data.sort((a, b) => {
			if (a.priority < b.priority) return -1
			else if (a.priority > b.priority) return 1
			return 0
		})

		setArticles(data)
	}

	const getArticle = async () => {
		let data = await getData()

		data = await data.find(el => el.id === pageID)

		if (typeof data !== 'undefined') {
			if (userData.user.id !== data?.user_id) {
				navigate('/articles')
			}
		}
		else {
			if (pageID) navigate('/article/create')
		}

		setArticle(data)
	}

	const handleForm = async e => {
		e.preventDefault()
		setLoading(true)

		const form = e.target
		Array.from(form).forEach(el => formControl(el))

		if (form.checkValidity()) {
			const formData = new FormData(form)

			let article = {
				id: (pageID ? pageID : lastID(articles) + 1),
				user_id: userData.user.id,
				title: formData.get('title'),
				description: formData.get('description'),
				content: formData.get('content'),
				date: new Date()
			}

			let newArticles = []

			if (pageID) {
				newArticles = articles.map(el => {
					if (el.id === pageID) {
						return article
					}

					return el
				})
			}

			else {
				newArticles = [...articles, article]
			}

			localStorage.setItem(
				process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY,
				JSON.stringify(newArticles)
			)

			setArticles(newArticles)

			Toast.fire({
				icon: 'success',
				title: 'Content added!'
			})
		}
		else {
			Toast.fire({
				icon: 'error',
				title: 'Please fill in the required fields!'
			})
		}

		setTimeout(() => {
			setLoading(false)
		}, 500)
	}

	useEffect(() => {
		getArticles()
		getArticle()
	}, [])

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1 className="h2 mb-2">{pageID ? 'Edit Article' : 'Create Article'}</h1>
					</div>
					<div className="col-12">
						<div className="border-bottom mb-5"></div>
					</div>
					<div className="col-12">
						<form onSubmit={(e) => handleForm(e)} noValidate>
							<div className="row">
								<div className="col-12">
									<label htmlFor="title">Title</label>
									<div className="position-relative mt-1">
										<input onChange={(e) => formControl(e)} defaultValue={article?.title} name="title" type="text" className="form-control" required />
									</div>
								</div>
								<div className="col-12 mt-4">
									<label htmlFor="title">Description</label>
									<div className="position-relative mt-1">
										<input onChange={(e) => formControl(e)} defaultValue={article?.description} name="description" type="text" className="form-control" required />
									</div>
								</div>
								<div className="col-12 mt-4">
									<label htmlFor="title">Content</label>
									<div className="position-relative editor-wrapper mt-1">
										<Editor
											textareaName="content"
											apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
											onInit={(evt, editor) => {
												editor.targetElm.required = true
												editorRef.current = editor
											}}
											initialValue={article?.content}
											init={{
												height: 300,
												menubar: false,
												invalid_elements: 'strong,b,em,i',
												element_format: 'html',
												plugins: [
													'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
													'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
													'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
												],
												toolbar: 'undo redo | blocks | ' +
													'bold italic forecolor | alignleft aligncenter ' +
													'alignright alignjustify | bullist numlist outdent indent | ' +
													'removeformat | help',
												content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
											}}
										/>
									</div>
								</div>
								<div className="col-12 mt-4">
									<button type="submit" className={`btn ${isLoading ? 'btn-secondary' : 'btn-pink'} mt-3`} disabled={isLoading}>
										{isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Save'}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Create