var nodeledApp = angular.module('NodeLed', ['ngRoute']);

nodeledApp.config(['$routeProvider', function ($routerProvider) {
        $routerProvider.
            when('/leds', {
            templateUrl: '/views/leds.jade',
            controller: 'ledController'
        }).otherwise({
            redirectTo: '/views/index.jade'
        });
    }]);