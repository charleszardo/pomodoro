var breakLen = 0.05;
var sessionLen = 0.05;
var paused = true;
var sessionRunning = true;
var breakRunning = false;

function formatTime(time) {
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}

function minToMilSec(min) {
	return min * 60 * 1000;
}

function timeToMilSec(time) {
	time = time.split(":")
	var hr = Number(time[0]);
	var min = Number(time[1]);
	var sec = Number(time[2]);
	return ((hr * 60 + min) * 60 + sec) * 1000;
}

function updateBreakLen() {
	$(".break-time").text(breakLen);
}

function updateSessionLen() {
	$(".session-time").text(sessionLen);
}

function switchClocks() {
	var $bt = $('#breakTimer');
	var $st = $('#sessionTimer');
	
	if (breakRunning) {
		$bt.hide();
		$st.show();
	} else {
		$st.hide();
		$bt.show();
	}
}

$( document ).ready(function() {
	// functionality to change break and session lengths
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
		} else {
			// newRunner(minToMilSec(sessionLen));
		}
	});

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
		switchClocks();
		if (sessionRunning) {
			$('#breakTimer').runner('reset');
			$('#breakTimer').runner('start');
		} else {
			$('#sessionTimer').runner('reset');
			$('#sessionTimer').runner('start');
		}
		
		sessionRunning = !sessionRunning;
		breakRunning = !breakRunning;
		// switchTitle();
		// if (sessionRunning) {
		// 	newTimer(breakLen, false)
		// } else {
		// 	newTimer(sessionLen, false)
		// }
	}
	
	function newSessionTimer(time) {
		$('#sessionTimer').runner({
			countdown: true,
	    startAt: time,
			stopAt: 0
		}).on('runnerStop', function(eventObject, info) {
			sessionBreakSwitch();
		});
	}
	
	function newBreakTimer(time) {
		$('#breakTimer').runner({
			countdown: true,
	    startAt: time,
			stopAt: 0
		}).on('runnerStop', function(eventObject, info) {
			sessionBreakSwitch();
		});
	}
	
	newSessionTimer(minToMilSec(sessionLen));
	newBreakTimer(minToMilSec(breakLen));
	
	$('#breakTimer').hide();
	
	$('#sessionTimer').click(function() {
	    $('#sessionTimer').runner('toggle');
			paused = !paused;
	});
	
	$('#breakTimer').click(function() {
	    $('#breakTimer').runner('toggle');
			paused = !paused;
	});
});

