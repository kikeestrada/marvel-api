import md5 from '../../../node_modules/blueimp-md5/js/md5';
let hash = md5("value");

export const marvelApi = () => {
	const
		privateKey 	= '435f8abb05853a14193201080f4a0e6ba6cb1217',
		publicKey 	= 'f06f585dacbd7875721095d5d8093509',
		content 	= document.getElementById('hero-grid'),
		search 		= document.getElementById('search');

	// here is the method to create the connection
	const getConnection = () => {
		const
			ts 		= Date.now(),
			hash 	= md5(ts + privateKey + publicKey),
			URL 	= `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
		// fetch(URL).then(response => console.log(response));
		fetch(URL)
			.then(response => response.json())
			.then(response => {
				response.data.results.forEach(e => {
					drawHero(e)
				})
			});
			// .catch(e => console.log(e));

	};

	const drawHero = e =>{
		const heroImage = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
		const hero = `
				<div class="hero-container__hero-item">  
					<h3 class="hero-container__title">${e.name}</h3> 
					<img src="${heroImage}" class="hero-container__img">
					<p class="hero-container__text">${e.description}</p>
				</div>
				`;
		content.insertAdjacentHTML('beforeEnd', hero)
	};

	const searchHero = name =>{
		const
			ts 		= Date.now(),
			hash 	= md5(ts + privateKey + publicKey),
			hero 	= encodeURIComponent(name),
			URL 	= `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
		fetch(URL)
			.then(response => response.json())
			.then(response => {
				response.data.results.forEach(e => {
					drawHero(e)
				})
			})
		.catch(e => console.log(e));
	};

	const fnSearch = () => {
		search.addEventListener("keyup", e =>{
			if(e.keyCode === 13){
				content.innerHTML = '';
				searchHero(e.target.value.trim());
			}
		});
	}
	fnSearch();
	getConnection();
};
