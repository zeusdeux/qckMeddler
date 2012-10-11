/******************************************************************************************************

Author : Mudit Ameta
Link   : http://experiments.muditameta.com/qckMeddler/

License: GNU General Public License, version 3 (GPL-3.0) 
Link   : http://opensource.org/licenses/gpl-3.0.html

******************************************************************************************************/
(function() {
	"use strict";
	window.onload = function() {
		_dimensioner();

		//caching required DOM references
		__live_updater.iframe = document.getElementsByTagName('iframe')[0].contentWindow.document;
		__live_updater.iframe_head = (__live_updater.iframe).getElementsByTagName('head')[0];
		__live_updater.iframe_body = (__live_updater.iframe).getElementsByTagName('body')[0];

		//append style tag to hold custom styles
		__live_updater.iframe_style = (__live_updater.iframe_head).appendChild((__live_updater.iframe).createElement('style'));

		//append jQuery
		var jquery_script = (__live_updater.iframe).createElement('script');
		jquery_script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
		(__live_updater.iframe_head).appendChild(jquery_script);

		//append script tag to hold custom javascript code
		__live_updater.iframe_script = (__live_updater.iframe_head).appendChild((__live_updater.iframe).createElement('script'));

		$('textarea').keyup(function(e) {
			if(!(e.keyCode >= 9 && e.keyCode <= 45) && !(e.keyCode >= 112 && e.keyCode <= 145)) {
				__live_updater($(this));
			}
		});
		$('textarea').keydown(function(e) {
			if(e.keyCode == 9) { //tab pressed
				e.preventDefault(); // stops its action
			}
		});
	};

	function _dimensioner() {
		var qckMeddler_height = document.getElementById('qckMeddler_container').offsetHeight - 40,
			qckMeddler_width = document.getElementById('qckMeddler_container').offsetWidth - 20;
		//console.log("Height: " + qckMeddler_height + " Width:" + qckMeddler_width);
		$('textarea').css({
			'height': ((qckMeddler_height / 2) - 35) + "px",
			'width': ((qckMeddler_width / 2) - 8) + "px"
		});
		$('#qckMeddler_output_frame').css({
			'height': ((qckMeddler_height / 2) - 33) + "px",
			'width': ((qckMeddler_width / 2) - 4) + "px"
		});
	}

	function __live_updater(t) {
		var css_content = $('#qckMeddler_css_content').val(),
			js_content = $('#qckMeddler_js_content').val(),
			html_content = $('#qckMeddler_html_content').val(),
			code_type = t.data('code');

		if(code_type === "html" || code_type === "js") {

			//append html
			(__live_updater.iframe_body).innerHTML = html_content;

			//append custom javascript
			(__live_updater.iframe_head).removeChild(__live_updater.iframe_script);
			__live_updater.iframe_script = (__live_updater.iframe_head).appendChild((__live_updater.iframe).createElement('script'));
			(__live_updater.iframe_script).textContent = js_content;

		} else if(code_type === "css") {

			//append css content
			(__live_updater.iframe_style).textContent = css_content;

		}
	}
})();