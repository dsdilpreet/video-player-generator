angular.module('video')
//Controller for all the video controls


.controller('ControlController', function ($scope, updateWidth) {
    $scope.control = controls;

    $scope.width = function () {
        updateWidth.newWidth();
    }
})
//controls object for functionality
var controls = {
    isRepeat: false,
    displayCurrentTime: false,
    duration: false,
    displayProgress: false,
    displayRemainingTime: false,
    allowDownload: false,
    allowSpeedControl: false,
    allowVolumeControl: false,
    allowFullScreen: false,
    loop: false,
    quality: false,
}