(function () {
    var app = angular.module('video', []);

    app.controller('VideoController', function () {

        this.oevideo = document.getElementById('avideo');
        this.oeplaypause = document.getElementById('play/pause');
        this.oeseekbar = document.getElementById('seekbar');
        this.initialVoume = 0;

        this.initPlayer = function () {
            this.oevideo.addEventListener('timeupdate', this.updateTime, true);
            this.oevideo.addEventListener('timeupdate', this.displayCurrentTime, true);
            this.oevideo.addEventListener('timeupdate', this.displayRemainingTime, true);
        };

        this.playPause = function () {
            if (this.oevideo.paused == true) {
                this.oevideo.play();
                this.oeplaypause.innerHTML = "Pause"
            } else {
                this.oevideo.pause();
                this.oeplaypause.innerHTML = "Play"
            }
        };

        this.repeat = function () {

            this.oevideo.currentTime = 0;
            this.oevideo.play();
        };

        this.displayCurrentTime = function () {
            this.oevideo = document.getElementById('avideo');
            document.getElementById("current-time").innerHTML = this.oevideo.currentTime;
        };

        this.seekVideo = function () {
            var time = this.oevideo.duration * (this.oeseekbar.value / 100);
            this.oevideo.currentTime = time;
        };

        this.updateTime = function () {
            this.oevideo = document.getElementById('avideo');
            this.oeTimeSeekbar = document.getElementById('timeseek');
            var time = this.oevideo.currentTime * (100 / this.oevideo.duration);
            this.oeTimeSeekbar.value = time;
        };

        this.displayRemainingTime = function() {
            this.oevideo = document.getElementById('avideo');
            document.getElementById("remaining-time").innerHTML = this.oevideo.duration -  this.oevideo.currentTime;
        };


        this.muteControl = function () {
            if (this.oevideo.muted) {
                this.oevideo.muted = false;
                document.getElementById("mute/unmute").innerHTML = "Mute";
            } else {
                this.oevideo.muted = true;
                document.getElementById("mute/unmute").innerHTML = "Unmute";
            }
        };

        this.changeVolume = function () {
            var volumeBar = document.getElementById("volume-bar");
            this.oevideo.volume = volumeBar.value;
            console.log(123);
        };

        this.playbackSpeed = function (speed) {
            this.oevideo.playbackRate = speed;
            console.log(speed);
        };

        this.loop = function () {
            var repeatButton = document.getElementById("repeat-btn");
            if(!this.oevideo.loop){
                this.oevideo.loop = true;
                repeatButton.innerHTML = "Auto Repeat: ON";
                repeatButton.setAttribute('title', 'Click to turn auto repeat off');
            } else {
                this.oevideo.loop = false;
                repeatButton.innerHTML = "Auto Repeat: OFF";
                repeatButton.setAttribute('title', 'Click to turn auto repeat on');
            }
        };

        this.changeQuality = function (qualityType) {
            var currentVideoTime = this.oevideo.currentTime;
            var currentVideoSource = this.oevideo.getAttribute('id');
            if (qualityType === 'low') {
                var videoToBePlayed = document.getElementById("low").getAttribute("src");
                this.oevideo.src = videoToBePlayed;
                this.oevideo.currentTime = currentVideoTime;
                this.oevideo.play();
            } else if(qualityType === 'medium'){
                var videoToBePlayed = document.getElementById("medium").getAttribute("src");
                this.oevideo.src = videoToBePlayed;
                this.oevideo.currentTime = currentVideoTime;
                this.oevideo.play();
            } else {
                var videoToBePlayed = document.getElementById("high").getAttribute("src");
                this.oevideo.src = videoToBePlayed;
                this.oevideo.currentTime = currentVideoTime;
                this.oevideo.play();
            }

            
            this.oevideo.currentTime = currentVideoTime;
            this.oevideo.play();
        };

        this.fullScreen = function(){

            if (this.oevideo.requestFullscreen) {
                this.oevideo.requestFullscreen();
            } else if (this.oevideo.mozRequestFullScreen) {
                this.oevideo.mozRequestFullScreen(); // Firefox
            } else if (this.oevideo.webkitRequestFullscreen) {
                this.oevideo.webkitRequestFullscreen(); // Chrome and Safari
            }
        };





        this.initPlayer();
    });

    

    //Controller for all the video controls
    app.controller('ControlController', function () {
        this.control = controls;
    });
    //controls object for functionality
    var controls = {
        isRepeat: false,
        displayCurrentTime: false,
        displayProgress: false,
        displayRemainingTime: false,
        allowDownload: false,
        allowSpeedControl: false,
        allowVolumeControl: false,
        allowFullScreen: false,
        loop: false,
        quality: false,
    }

    app.controller('OutputController', function () {
        this.html = htmlObject;
        this.css = cssObject;
        this.js = jsObject;
    });

    htmlObject = {
        videoTag: '<video id="avideo"><source src="" /></video>',
        playPause: '<button id="play/pause" onclick="playPause()">Play</button>',
        repeat: '<button onclick="repeat()">Repeat</button>',

    }

    cssObject = {

    }

    jsObject = {
        playPause: 'function playPause() {var oevideo = document.getElementById("avideo");var oeplaypause = document.getElementById("play/pause");if (oevideo.paused == true) {oevideo.play();oeplaypause.innerHTML = "Pause"} else {oevideo.pause();oeplaypause.innerHTML = "Play"}}', 
        repeat: "function repeat(){var oevideo = document.getElementById('avideo');oevideo.currentTime = 0;oevideo.play();}"
    }


})();


