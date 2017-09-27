document.clientId = '0df2e7e5-4224-4b75-9bec-6320bc9ca2f9';
document.pageUrl = location.pathname;

var script = document.createElement('script');
var pageScripts = document.getElementsByTagName('script')[1];
script.async=true;
script.src='static/javascripts/rd-tracking.js';
pageScripts.parentNode.insertBefore(script, pageScripts);