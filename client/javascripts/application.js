document.clientId = '5a1123de-47a5-4b08-a647-f4cf4f1a57a9';
document.pageUrl = location.pathname;

var script = document.createElement('script');
var pageScripts = document.getElementsByTagName('script')[1];
script.async=true;
script.src='static/javascripts/rd-tracking.js';
pageScripts.parentNode.insertBefore(script, pageScripts);