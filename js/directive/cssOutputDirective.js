angular.module('video')
.directive('cssOutput', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/css-output.html',
    };
})