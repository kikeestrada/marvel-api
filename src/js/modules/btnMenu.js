export const btnMenu = () => {
	let fnBtnMenu = ()=> {
		document.querySelector('.hamburger').addEventListener('click', function(e) {
			e.preventDefault();		
			[].map.call(document.querySelectorAll('.vertical-menu-toggle'), function(el) {
				el.classList.toggle('active'); 
			});
		}); 
	};
	fnBtnMenu();
};
