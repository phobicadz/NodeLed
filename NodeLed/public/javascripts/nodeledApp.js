var nodeledApp = angular.module('NodeLed', ['ngRoute','color.picker']);

nodeledApp.config(['$routeProvider', function ($routerProvider) {
        $routerProvider.
            when('/leds', {
            templateUrl: '/views/leds.jade',
            controller: 'ledController'
        }).otherwise({
            redirectTo: '/views/index.jade'
        });
    }]);