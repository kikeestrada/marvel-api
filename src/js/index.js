import {saludo} from'./components/example'
import {despedida} from'./components/example'

(()=>{
	saludo();
	despedida();
	if (document.body.classList.contains('home')) {
		// functions here
	}else if (document.body.classList.contains('page2')) {
		// functions here
	}else if (document.body.classList.contains('page3')) {
		// functions here
	}
})();
