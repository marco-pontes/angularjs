describe('Testing the RD tracker library', function() {

	beforeEach(function(){
		sessionStorage.removeItem('pages');
	});


	it('Should have a pages session storage item', function() {
		window['trackVisit']('uid', 'test-page/');
		var hasPage = sessionStorage.getItem('pages').length > 0;			
		expect(hasPage).toBe(true);
	});


	it('Should have a pages session storage item with the tracked test-page/', function() {
		window['trackVisit']('uid', 'test-page/');
		var pages = sessionStorage.getItem('pages');
		var hasPage = pages.length > 0;			
		expect(hasPage).toBe(true);
		console.log(pages)
		expect(pages.indexOf('test-page/') != -1).toBe(true);
	});
	
	
});
