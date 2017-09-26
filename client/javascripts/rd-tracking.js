window['trackVisit'] = function (page){
	if(!sessionStorage.getItem('pages')){
		sessionStorage.setItem('pages', []);
	}
	var visitedPages = sessionStorage.getItem('pages');
	visitedPages.push(page);
	if(sessionStorage.getItem('e-mail')){
		$.post('http://www.google.com', {visitedPages:visitedPages})
		sessionStorage.setItem('pages', []);
	}
}