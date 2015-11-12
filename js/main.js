var breakLength = 5;
var sessionLength = 25;
var paused = false

$( document ).ready(function() {
	function updateBreakLength() {
		$(".break-time").text(breakLength);
	}
	
	function updateSessionLength() {
		$(".session-time").text(sessionLength);
	}
	
	$(".break-red").click(function(){
		if (paused) {
			return null;
		}
		if (breakLength > 0) {
			breakLength -= 1;
			updateBreakLength();
		}
	});
	
	$(".break-add").click(function(){
		if (paused) {
			return null;
		}
		breakLength += 1;
		updateBreakLength();
	})
	
	$(".session-red").click(function(){
		if (paused) {
			return null;
		}
		if (sessionLength > 0) {
			sessionLength -= 1;
			updateSessionLength();
		}
	});
	
	$(".session-add").click(function(){
		if (paused) {
			return null;
		}
		sessionLength += 1;
		updateSessionLength();
	});
	
	updateBreakLength();
	updateSessionLength();
});