angular.module('video')
.directive('previewControl', function (updateWidth) {
    return {
        restrict: 'E',
        templateUrl: 'templates/preview-controls.html',
        controller: 'VideoController',
        controllerAs: 'video',
    };
})