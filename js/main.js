var breakLength = 1;
var sessionLength = 1;
var curSessionLength = sessionLength;
var curBreakLength = breakLength;
var paused = true;
var sessionRunning = false;
var breakRunning = false;

function minToSecString(min) {
	var sec = min * 60;
	var final = String(sec) + "s";
	console.log(final);
	return final;
}

function formatTime(h, m, s) {
	console.log(h);
}

$( document ).ready(function() {
	function sessionBreakSwitch() {
		$('.time').timer('remove');
		
		if (sessionRunning) {
			$('.time').timer({
				duration: minToSecString(curBreakLength)
		} else {
			
		}
		
		sessionRunning = !sessionRunning;
		breakRunning = !breakRunning;
	}
	
	function newTimer () {
		
	}
	
	$(".session").click(function (){
		if (!sessionRunning) {
			sessionRunning = true;
			$('.time').timer({
				duration: minToSecString(curSessionLength),
				format: '%M:%S',
				callback: function() {
				        
				    }
			});
		} else if (paused) {
			$('.time').timer('resume');
		} else {
			$('.time').timer('pause');
		}
		
		paused = !paused;
	})
});