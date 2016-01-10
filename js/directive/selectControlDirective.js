angular.module('video')
.directive('selectControl', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/select-controls.html',
        controller: 'ControlController',
        controllerAs: 'control'
    };
})