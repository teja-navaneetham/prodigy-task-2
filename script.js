$(document).ready(function () {
    let running = false;
    let startTime, elapsedTime = 0, interval, animateCircleInterval;
    let duration = {
        h: 0,
        m: 0,
        s: 0,
        ms: 0
    };
    let lapCount = 1;

    function pad(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    }

    function updateDisplay() {
        duration.h = Math.floor(elapsedTime / 3600000);
        duration.m = Math.floor((elapsedTime % 3600000) / 60000);
        duration.s = Math.floor((elapsedTime % 60000) / 1000);
        duration.ms = elapsedTime % 1000;

        $("#hours").text(pad(duration.h, 2));
        $("#minutes").text(pad(duration.m, 2));
        $("#seconds").text(pad(duration.s, 2));
        $("#milliseconds").text(pad(duration.ms, 3));
    }

    function animateCircle() {
       // add colour if needed
    }

    function startTimer() {
        startTime = new Date();
        interval = setInterval(function () {
            var currentTime = new Date();
            elapsedTime += currentTime - startTime;
            startTime = currentTime;
            updateDisplay();
            animateCircle();
        }, 10);
    }

    function stopTimer() {
        clearInterval(interval);
    }

    window.playPauseFunc = function () {
        if (running) {
            stopTimer();
            $('#play').html('<i class="fa fa-play"></i>');
        } else {
            startTimer();
            $('#play').html('<i class="fa fa-pause"></i>');
        }
        running = !running;
    };

    window.lapFunc = function() {
        if (running) {
            let lapTime = elapsedTime;
            let lapHours = pad(Math.floor(lapTime / 3600000), 2);
            let lapMinutes = pad(Math.floor((lapTime % 3600000) / 60000), 2);
            let lapSeconds = pad(Math.floor((lapTime % 60000) / 1000), 2);
            let lapMilliseconds = pad(lapTime % 1000, 3);
            let lapDisplay = `${lapCount}. ${lapHours}:${lapMinutes}:${lapSeconds}:${lapMilliseconds}`;
            $('#laps').append(`<div>${lapDisplay}</div>`);
            lapCount++;
        }
    };

 

    window.resetFunc = function () {
        if (running) {
            stopTimer();
            running = false;
        }
        startTime = null;
        elapsedTime = 0;
        updateDisplay();
        animateCircle();
        $('#laps').empty();
        lapCount = 1;
    };
});
