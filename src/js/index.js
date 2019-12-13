import {topNav} from './modules/topNav'
import {marvelApi} from './modules/marvelApi'
import {searchFilter} from './modules/searchFilter'
import {lightBox} from './modules/lightBox'
import {tabs} from './modules/tabs'
import {edModal} from './modules/modal'
(()=>{
	topNav();
	lightBox();
	tabs();
	edModal();

	if (document.body.classList.contains('home')) {
		// functions here
	}else if (document.body.classList.contains('page2')) {
		// functions here
		searchFilter();
		marvelApi();
	}else if (document.body.classList.contains('page3')) {
		// functions here

	}
})();
