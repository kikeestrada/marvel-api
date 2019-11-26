import {topNav} from './modules/topNav'
// import {marvelApi} from './modules/marvelApi'
import {searchFilter} from './modules/searchFilter'

(()=>{
	topNav();
	searchFilter();
	if (document.body.classList.contains('home')) {
		// functions here
	}else if (document.body.classList.contains('page2')) {
		// functions here
		// marvelApi();

	}
})();
