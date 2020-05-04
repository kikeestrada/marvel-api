export const topNav = () => {
	const 
		d = document,
		headerBtn = d.querySelector('.hamburger'),
		nav = d.querySelector('.top-nav__menu');
		headerBtn.addEventListener('click', e => {
			e.preventDefault();
			headerBtn.classList.toggle('is-active'),	
			nav.classList.toggle('show-top-nav');
		}); 
};
