(function(){
    angular.module('video', ['ngRoute'])

    //rendering material design properly
    .run(function () {
        var mdlUpgradeDom = false;
        setInterval(function () {
            if (mdlUpgradeDom) {
                componentHandler.upgradeDom();
                mdlUpgradeDom = false;
            }
        }, 200);

        var observer = new MutationObserver(function () {
            mdlUpgradeDom = true;
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        /* support <= IE 10
        angular.element(document).bind('DOMNodeInserted', function(e) {
            mdlUpgradeDom = true;
        });
        */
    })

    //routes 
    .config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: '/templates/pages/generator.html'
        })

        .when('/docs', {
            templateUrl: 'templates/pages/docs.html'
        })

        .otherwise({ redirectTo: '/' });
    })

    //general controller for hastag scroll within document
    .controller('ScrollCtrl', function($scope, $location, $anchorScroll) {
        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        }
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



})();








