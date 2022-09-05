import React from 'react'
import ArticleList from '../articles/Lists'

const Home = () => {
	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1 className="h2 mb-2">Home Page</h1>
					</div>
					<div className="col-12">
						<div className="border-bottom mb-5"></div>
					</div>
					<div className="col-12 fs-4">
						<p>Bu projede basit bir Node.js API endpoint'ine istek atarak authentication işlemi yapılmıştır. API üzerinden çekilen kullanıcılar Users sayfasında listelenmektedir.</p>
						<p>İçerik/Article özelliklerinde; oluşturma, düzenleme, listeleme, paunlama gibi başlıca özellikler eklenmiştir. Bu içerikler ilk açılışta fake data olarak articles.json ve ratings.json dosyalarından çekmilmekte sonra eklenen içerikleri bu datalar ile birleştirerek localStorage'da saklamaktadır.</p>
					</div>
					<div className="col-12">
						<div className="border-bottom mt-3 mb-5"></div>
					</div>
					<div className="col-12">
						<ArticleList />
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Home