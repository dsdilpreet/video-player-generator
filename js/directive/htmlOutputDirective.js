angular.module('video')
.directive('htmlOutput', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/html-output.html',
        link: function () {
            String.prototype.escapeHTML = function () {
                return (
                  this.replace(/>/g, '&gt;').
                       replace(/</g, '&lt;').
                       replace(/"/g, '&quot;')
                );
            };
            var codeEl = document.getElementsByClassName("format-output-html");

            for (var i = 0; i < codeEl.length; i++) {
                codeEl[i].innerHTML = codeEl[i].innerHTML.escapeHTML();
            }

        }
    };
})