var breakLen = 0.1;
var sessionLen = 0.1;
var paused = true;
var sessionRunning = false;
var breakRunning = false;

function minToSecString(min) {
	var sec = min * 60;
	var final = String(sec) + "s";
	return final;
}

function formatTime(time) {
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}

$( document ).ready(function() {
	function updateBreakLen() {
		$(".break-time").text(breakLen);
	}
	
	function updateSessionLen() {
		$(".session-time").text(sessionLen);
	}
	
	function minToSec(min) {
		return min * 60;
	}
	
	$(".break-red").click(function(){
		if (!paused) {
			return null;
		}
		if (breakLen > 0) {
			breakLen -= 1;
			updateBreakLen();
		}
	});
	
	$(".break-add").click(function(){
		if (!paused) {
			return null;
		}
		breakLen += 1;
		updateBreakLen();
	})
	
	$(".session-red").click(function(){
		if (!paused) {
			return null;
		}
		if (sessionLen > 0) {
			sessionLen -= 1;
			updateSessionLen();
			
			if (sessionRunning) {
				newSession();
			}			
		}
		
	});
	
	$(".session-add").click(function(){
		if (!paused) {
			return null;
		}
		sessionLen += 1;
		updateSessionLen();
		
		if (sessionRunning) {
			newSession();
		}	
	});
	
	clock = $('.your-clock').FlipClock({
		autoStart: false,
		countdown: true,
	});
	updateBreakLen();
	updateSessionLen();
	
	function newTimer(len, pause) {
		clock.setTime(sessionLen * 60);
		clock.start();

		if (pause) {
			clock.stop();
		}
		
		paused = pause;
		sessionRunning = !sessionRunning;
		breakRunning = !breakRunning;
	}
	
	function switchTitle() {
		if (breakRunning) {
			$(".session-break").text("Session")
		} else {
			$(".session-break").text("Break")
		}
	}
	
	function sessionBreakSwitch() {
		switchTitle();
		if (sessionRunning) {
			newTimer(breakLen, false)
		} else {
			newTimer(sessionLen, false)
		}
	}
	
	function resetTimer (len) {
		$('.time').timer('remove');
		$('.time').timer({
			duration: minToSecString(len),
			format: '%M:%S',
			callback: sessionBreakSwitch
		});
	}
	
	$(".session").click(function (){
		if (!sessionRunning && !breakRunning) {
			newTimer(sessionLen, false);
			breakRunning = false;
		} else if (paused) {
			paused = !paused;
			clock.start();
		} else {
			paused = !paused;
			clock.stop();
		}
	})
});