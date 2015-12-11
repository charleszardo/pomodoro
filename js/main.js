var breakLen = 0.1;
var sessionLen = 0.1;
var paused = true;
var sessionRunning = true;
var breakRunning = false;

// function formatTime(time) {
//     time = time / 10;
//     var min = parseInt(time / 6000),
//         sec = parseInt(time / 100) - (min * 60),
//         hundredths = pad(time - (sec * 100) - (min * 6000), 2);
//     return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
// }

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

function formatTime(value) {
  var sec = value / 1000;
  var min = parseInt(sec / 60);
  sec = parseInt(sec % 60);
	
	if (sec < 10) {
		sec = "0" + sec
	}
	
	if (min < 10) {
		min = "0" + min
	}
  return (min + ":" + sec);
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
		}
	});

	$(".session-add").click(function(){
		if (!paused) {
			return null;
		}
		sessionLen += 1;
		updateSessionLen();
	});
	
	function reset(session) {
		sessionRunning = true;
		breakRunning = false;
		paused = true;
		
		var $bt = $('#breakTimer');
		var $st = $('#sessionTimer');
		
		$st.show();
		$bt.hide();
		
		if (session) {
			$st.runner({
				countdown: true,
	    	startAt: minToMilSec(sessionLen),
				stopAt: 0,
				format: function(value) {
					return formatTime(value);
				}
			}).on('runnerFinish', function(eventObject, info) {
			sessionBreakSwitch();
			});
		} else {
			$bt.runner({
				countdown: true,
				startAt: minToMilSec(breakLen),
				stopAt: 0,
				format: function(value) {
					return formatTime(value);
				}
			}).on('runnerFinish', function(eventObject, info) {
			sessionBreakSwitch();
			});
		}
		
		$st.runner('reset');
		$bt.runner('reset');
	}
	
	function updateBreakLen() {
		$(".break-time").text(breakLen);
		reset(false);
	}

	function updateSessionLen() {
		$(".session-time").text(sessionLen);
		reset(true);
	}
	
	updateBreakLen();
	updateSessionLen();

	function switchTitle() {
		if (sessionRunning) {
			$(".session-break").text("Break")
		} else {
			$(".session-break").text("Session")
		}
	}

	function sessionBreakSwitch() {
		switchClocks();
		switchTitle();
		if (sessionRunning) {
			$('#breakTimer').runner('reset');
			$('#breakTimer').runner('start');
		} else {
			$('#sessionTimer').runner('reset');
			$('#sessionTimer').runner('start');
		}
		
		sessionRunning = !sessionRunning;
		breakRunning = !breakRunning;
		
		// if (sessionRunning) {
		// 	newTimer(breakLen, false)
		// } else {
		// 	newTimer(sessionLen, false)
		// }
	}
	
	$('#sessionTimer').click(function() {
	    $('#sessionTimer').runner('toggle');
			paused = !paused;
	});
	
	$('#breakTimer').click(function() {
	    $('#breakTimer').runner('toggle');
			paused = !paused;
	});
});

