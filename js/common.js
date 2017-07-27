window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

function ifClick(mx, my, x, y, w, h) {
	if (mx >= x && mx <= x + w && my >= y - 10 && my <= y + h ) {
		return true;
	}
	return false;
}
