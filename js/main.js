var breakLen = 1;
var sessionLen = 1;
var paused = true;
var sessionRunning = false;
var breakRunning = false;

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
	
	function minToMilSec(min) {
		return min * 60 * 1000;
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
	
	function newTimer(len, pause) {
		var curTime = new Date().getTime();
		len = minToMilSec(len) + curTime;
		$clock = $('#clock');

		$clock.countdown(len, function(event) {
	    $(this).html(event.strftime('%H:%M:%S'));
	  });
		
		if (pause) {
			$clock.countdown('pause');
		}
	}
	
	function timeToMilSec(time) {
		time = time.split(":")
		var hr = Number(time[0]);
		var min = Number(time[1]);
		var sec = Number(time[2]);
		return ((hr * 60 + min) * 60 + sec) * 1000;
	}
	
	console.log(timeToMilSec("00:01:00"));
	
	function replaceTime() {
		var time = $clock.text();
		var ms = timeToMilSec(time);
		var clock = $("#clock");
		clock.countdown(ms, function(event) {
	    $(this).html(event.strftime('%H:%M:%S'));
	  });
	}
	
	$clock = $('#clock');
	var curTime = new Date().getTime();
	var cdLen = minToMilSec(sessionLen) + curTime;
	$clock.countdown(cdLen, function(event) {
    $(this).html(event.strftime('%H:%M:%S'));
  });
	
	$clock.countdown('stop');
	
	updateBreakLen();
	updateSessionLen();
	
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
	
	$(".session").click(function (){
		if (!sessionRunning && !breakRunning) {
			replaceTime();
			// $clock.countdown('start');
			sessionRunning = true;
			breakRunning = false;
			paused = false;
		} else if (paused) {
			paused = !paused;
			$clock.countdown('start');
		} else {
			paused = !paused;
			$clock.countdown('stop');
		}
	})
});