import {topNav} from './modules/topNav';
import {searchFilter} from './modules/searchFilter';
import {marvelApi} from './modules/marvelApi';
import {swDetecter} from './modules/swDetecter';
(()=>{
	topNav(); 
	swDetecter();
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
