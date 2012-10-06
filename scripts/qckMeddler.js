/******************************************************************************************************

Author : Mudit Ameta
Link   : http://experiments.muditameta.com/qckMeddler/

License: GNU General Public License, version 3 (GPL-3.0) 
Link   : http://opensource.org/licenses/gpl-3.0.html

******************************************************************************************************/

window.onload = function() {
	_dimensioner();
	__live_updater.iframe = document.getElementsByTagName('iframe')[0].contentWindow.document;
	__live_updater.iframe_head = $('iframe').contents().find('head');
	__live_updater.iframe_body = $('iframe').contents().find('body');
	$('textarea').keyup(function() {
		__live_updater();
	});
	$(document).keydown(function(e) {
		if(e.keyCode == 9) { //tab pressed
			e.preventDefault(); // stops its action
		}
	})
};

function _dimensioner() {
	var qckMeddler_height = document.getElementById('qckMeddler_container').offsetHeight - 40;
	var qckMeddler_width = document.getElementById('qckMeddler_container').offsetWidth - 20;
	//console.log("Height: " + qckMeddler_height + " Width:" + qckMeddler_width);
	$('#qckMeddler_container > div > textarea').css({
		'height': ((qckMeddler_height / 2) - 35) + "px",
		'width': ((qckMeddler_width / 2) - 8) + "px"
	});
	$('#qckMeddler_output_frame').css({
		'height': ((qckMeddler_height / 2) - 33) + "px",
		'width': ((qckMeddler_width / 2) - 4) + "px"
	});
}

function __live_updater() {

	var css_content = $('#qckMeddler_css_content').val();
	var js_content = $('#qckMeddler_js_content').val();
	var html_content = $('#qckMeddler_html_content').val();

	//empty the head tag contents
	(__live_updater.iframe_head).empty();

	//append css content
	(__live_updater.iframe_head).append('<style>' + css_content + '</style>');

	//append html
	(__live_updater.iframe_body).html(html_content);
	//javascript equivalent of above statement is :
	//document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('body')[0].innerHTML = "<p>test</p>"
	
	//append jQuery
	var jquery_script = (__live_updater.iframe).createElement('script');
	jquery_script.src = "scripts/jquery-1.8.1.min.js";
	(__live_updater.iframe).getElementsByTagName('head')[0].appendChild(jquery_script);

	//append custom javascript
	var custom_script = (__live_updater.iframe).createElement('script');
	(__live_updater.iframe).getElementsByTagName('head')[0].appendChild(custom_script);
	(__live_updater.iframe).getElementsByTagName('script')[1].innerHTML = js_content;
}