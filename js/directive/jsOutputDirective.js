angular.module('video')
.directive('jsOutput', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/js-output.html',
    };
})