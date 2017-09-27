
window['trackVisit'] = function (appId, page){
	var visitedPages = [];
	if(sessionStorage.hasOwnProperty('pages')){
		visitedPages = sessionStorage.getItem('pages').split(',');
	}
	visitedPages.push(page + ';' + new Date().getTime());
	sessionStorage.setItem('pages', visitedPages.join());
	if(sessionStorage.hasOwnProperty('e-mail')){
		var email = sessionStorage.getItem('e-mail');
		var url = 'http://localhost:8080/webservices/tracking?appId=' + appId + '&email=' + email;
		var data = JSON.stringify(visitedPages);
		var request = new XMLHttpRequest();  
		request.open("POST", url); 
		request.setRequestHeader("Content-Type", "application/json");
		request.send(data); 
		sessionStorage.removeItem('pages');
	}
}