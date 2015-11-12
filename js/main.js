var breakLength = 5;
var sessionLength = 25;
var currentLength = sessionLength;
var paused = false

function formatTime(time) {
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}

$( document ).ready(function() {
	function updateBreakLength() {
		$(".break-time").text(breakLength);
	}
	
	function updateSessionLength() {
		$(".session-time").text(sessionLength);
	}
	
	function newSession() {
		$(".time").text(sessionLength);
	}
	
	function minToSec(min) {
		return min * 60;
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
			currentLength = sessionLength;
			newSession();
		}
		
	});
	
	$(".session-add").click(function(){
		if (paused) {
			return null;
		}
		sessionLength += 1;
		updateSessionLength();
		currentLength = sessionLength;
		newSession();
	});
	
	$(".session").click(function() {
		if (paused) {
			timer.play()
		} else {
			timer.pause()
		}
		paused = !paused;
	})
	
	updateBreakLength();
	updateSessionLength();
	newSession();
	
	var sessionTimer = $.timer(function() {
		
	});
	
  function updateTimer() {
      var timeString = formatTime(currentTime);
      $stopwatch.html(timeString);
      currentTime += incrementTime;
  }
	
	sessionTimer.set({ time : minToSec(sessionLength), autostart : false });
});