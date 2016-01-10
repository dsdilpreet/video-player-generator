
angular.module('video', ['ngRoute'])

//routes 
.config(function($routeProvider){
    $routeProvider.when('/html5-video-player-generator', {
        templateUrl: '/templates/pages/generator.html'
    })

    .when('/docs', {
        templateUrl: 'templates/pages/docs.html'
    })

    .when('/', {
        templateUrl: '/templates/pages/generator.html'
    })

    .otherwise({ redirectTo: '/' });
})



//ui update
.factory('updateWidth', function () {
    return {
        newWidth: function () {
            var list = document.getElementById("more-options-ul");
            var elementCount = list.children.length;
            var section = document.getElementById("more-options");
            console.log(elementCount);
            if (elementCount == 4) {
                section.style.top = '-160px';
            } else if (elementCount == 3) {
                section.style.top = '-120px';
            } else if (elementCount == 2) {
                section.style.top = '-80px';
            } else {
                section.style.top = '-40px';    
            }
        }
    };
});












