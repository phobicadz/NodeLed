var nodeledApp = angular.module('NodeLed', ['ngRoute','color.picker','winjs']);

nodeledApp.config(['$routeProvider', function ($routerProvider) {
        $routerProvider.
            when('/leds', {
            templateUrl: '/views/leds.jade',
            controller: 'ledController'
        }).otherwise({
            redirectTo: '/views/index.jade'
        });
    }]);


//nodeledApp.directive('dragSelect', function ($window, $document) {
//    return {
//        scope: {
//            dragSelectIds: '='
//        },
//        controller: function ($scope, $element) {

//            var cls = 'eng-selected-item';
//            var startCell = null;
//            var dragging = false;
            
//            function mouseUp(el) {
//                dragging = false;
//   //             alert(el);
//            }
            
//            function mouseDown(el) {
//                dragging = true;
//                setStartCell(el);
//                setEndCell(el);
//         //       alert(el.led);
//            }
            
//            function mouseEnter(el) {
//                if (!dragging) return;
//                setEndCell(el.led);
//      //          alert(el);
//            }
            
            
//            function getCoords(cell) {
//                var row = cell.parents('row');
//                return {
//                    column: cell[0].cellIndex, 
//                    row: cell.parent()[0].rowIndex
//                };
//            }
            
//            function wrap(fn) {
//                return function () {
//                    var el = angular.element(this);
//                    $scope.$apply(function () {
//                        fn(el);
//                    });
//                }
//            }
            
//            $element.delegate('td', 'mousedown', wrap(mouseDown));
//            $element.delegate('td', 'mouseenter', wrap(mouseEnter));
//            $document.delegate('body', 'mouseup', wrap(mouseUp));
//        }
//    }
//});

// need to add a directive to handle click event and change TD background as well as updating bound data