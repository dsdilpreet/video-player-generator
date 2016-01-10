angular.module('video')

.controller('VideoController', function ($scope) {
    //element references 
    $scope.oevideo = document.getElementById('avideo');
    $scope.videoWrapper = document.getElementById('video-wrapper');
    //Buttons
    $scope.oeplaypauseBtn = document.getElementById('play/pause');
    $scope.oereplay = document.getElementById("replay");
    $scope.downloadBtn = document.getElementById("download-btn");
    $scope.loopBtn = document.getElementById("repeat-btn");
    $scope.muteBtn = document.getElementById("mute/unmute");
    $scope.fullScreenBtn = document.getElementById("full-screen");

    //sliders
    $scope.volumeBar = document.getElementById("volume-bar");
    $scope.oeseekBar = document.getElementById("timeseek");

    //for best practices uses . notation in ng-modal
    $scope.data = {};

    //values for ng-modals which are updated by functions
    $scope.displayCurrentTime;
    $scope.duration;
    $scope.data.seekbarThumbPosition;

    //current source of video for download and source purposes
    $scope.videoSource;
    //sources for high and low quality videos
    var highQualitySource = document.getElementById("high").getAttribute('src');
    var lowQualitySource = document.getElementById("low").getAttribute('src');


    //when player initializes
    $scope.initPlayer = function () {
        console.log("player init");
        $scope.displayCurrentTime = 0;
        $scope.duration = 0;
        $scope.data.seekbarThumbPosition = 0;

        //default video source to play
        $scope.videoSource = lowQualitySource;
        $scope.oevideo.src = $scope.videoSource;
        //adding event listener on video for time update
        $scope.oevideo.addEventListener('timeupdate', $scope.updateCurrentTime, true);
        // loading meta data for purposes like duration 
        $scope.oevideo.addEventListener('timeupdate', $scope.updateDuration, true);
        //updating time seekbar thumb position as time progresses
        $scope.oevideo.addEventListener('timeupdate', $scope.updateThumbPosition, true);
    };

    // current state of video
    $scope.isPaused = false;
    if ($scope.oevideo.paused) {
        $scope.isPaused = true;
    } else {
        $scope.isPaused = false;
    }


    //functionality

    //play-pause
    $scope.playPause = function () {
        if ($scope.oevideo.paused == true) {
            $scope.oevideo.play();
            $scope.oeplaypauseBtn.innerHTML = '<i class="material-icons vid-icon">pause</i>'
        } else {
            $scope.oevideo.pause();
            $scope.oeplaypauseBtn.innerHTML = ' <i class="material-icons vid-icon">play_circle_outline</i>'
        }
    };

    //replay function
    $scope.replay = function () {
        //replay
        $scope.oevideo.currentTime = 0;
        $scope.oevideo.play();
    };

    // current time
    $scope.updateCurrentTime = function (e) {
        $scope.displayCurrentTime = e.target.currentTime;
        $scope.$apply();
    };

    //duration
    $scope.updateDuration = function (e) {
        $scope.duration = e.target.duration;
    }

    // more options start 
    //download
    $scope.download = function () {
        if ($scope.videoSource == highQualitySource) {
            $scope.videoSource = highQualitySource;
            $scope.downloadBtn.setAttribute('href', highQualitySource);
            $scope.downloadBtn.setAttribute('download', highQualitySource);
        } else {
            $scope.videoSource = lowQualitySource;
            $scope.downloadBtn.setAttribute('href', lowQualitySource);
            $scope.downloadBtn.setAttribute('download', lowQualitySource);
        }
    }

    // playback speed
    $scope.playbackSpeed = function (speed) {
        $scope.oevideo.playbackRate = speed;
    };

    // auto repeat or loop
    $scope.loop = function () {
        if (!$scope.oevideo.loop) {
            $scope.oevideo.loop = true;
            $scope.loopBtn.setAttribute('title', 'Click to turn auto repeat off');
        } else {
            $scope.oevideo.loop = false;
            $scope.loopBtn.setAttribute('title', 'Click to turn auto repeat on');
        }
    };

    // change quality
    $scope.changeQuality = function (requestedQuality) {
        if (requestedQuality == 'high') {
            if ($scope.oevideo.src == highQualitySource) {
                // keep playing same video
            } else {
                var currentVideoPlayingTime = $scope.displayCurrentTime;
                $scope.oevideo.src = highQualitySource;
                $scope.videoSource = highQualitySource;
                $scope.oevideo.currentTime = currentVideoPlayingTime;
                if ($scope.isPaused) {
                    console.log("function called paused high");
                    $scope.oevideo.play();
                } else {
                    $scope.oevideo.pause();
                    console.log("function called play high");
                }
            }
        } else {
            if ($scope.oevideo.src == lowQualitySource) {
                // keep playing same video
            } else {
                var currentVideoPlayingTime = $scope.displayCurrentTime;
                $scope.oevideo.src = lowQualitySource;
                $scope.videoSource = lowQualitySource;
                $scope.oevideo.currentTime = currentVideoPlayingTime;
                if ($scope.isPaused) {
                    $scope.oevideo.play();
                    console.log("function called pause low");
                } else {
                    $scope.oevideo.pause();
                    console.log("function called play low");
                }
            }
        }
    }

    //volume control and mute
    $scope.muteControl = function () {
        if ($scope.oevideo.muted) {
            $scope.oevideo.muted = false;
            $scope.muteBtn.innerHTML = '<i class="material-icons vid-icon">volume_up</i>';
        } else {
            $scope.oevideo.muted = true;
            $scope.muteBtn.innerHTML = '<i class="material-icons vid-icon">volume_mute</i>';
        }
    }

    //volume bar
    $scope.changeVolume = function () {
        $scope.oevideo.volume = $scope.volumeBar.value;
    };

    // full screen
    $scope.toggleFullScreen = function () {
        //if document is not in full screen
        if (!document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
            if ($scope.videoWrapper.requestFullscreen) {
                $scope.videoWrapper.requestFullscreen();
                $scope.fullScreenBtn.innerHTML = '<i class="material-icons vid-icon">fullscreen_exit</i>';
            } else if ($scope.videoWrapper.msRequestFullscreen) {
                $scope.videoWrapper.msRequestFullscreen();
                $scope.fullScreenBtn.innerHTML = '<i class="material-icons vid-icon">fullscreen_exit</i>';
            } else if ($scope.videoWrapper.mozRequestFullScreen) {
                $scope.videoWrapper.mozRequestFullScreen();
                $scope.fullScreenBtn.innerHTML = '<i class="material-icons vid-icon">fullscreen_exit</i>';
            } else if ($scope.videoWrapper.webkitRequestFullscreen) {
                $scope.videoWrapper.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                $scope.fullScreenBtn.innerHTML = '<i class="material-icons vid-icon">fullscreen_exit</i>';
            }
        } else {
            //if document is in full screen
            if (document.exitFullscreen) {
                document.exitFullscreen();
                $scope.fullScreenBtn.innerHTML = '<i class="material-icons vid-icon">fullscreen</i>';
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
                $scope.fullScreenBtn.innerHTML = '<i class="material-icons vid-icon">fullscreen</i>';
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                $scope.fullScreenBtn.innerHTML = '<i class="material-icons vid-icon">fullscreen</i>';
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
                $scope.fullScreenBtn.innerHTML = '<i class="material-icons vid-icon">fullscreen</i>';
            }
        }
    }

    //updating time seekbar thumb position
    $scope.updateThumbPosition = function () {
        var newTime = $scope.oevideo.currentTime * (100 / $scope.oevideo.duration);
        $scope.data.seekbarThumbPosition = newTime;
        $scope.$apply();
    }

    //change event handler for time seek bar
    $scope.seekVideo = function () {
        $scope.oeseekbar = document.getElementById("timeseek");
        var newTime = $scope.oevideo.duration * ($scope.oeseekbar.value / 100);
        $scope.oevideo.currentTime = newTime;
        $scope.data.seekbarThumbPosition = $scope.oevideo.currentTime;
    }


    //initialize player
    $scope.initPlayer();
})