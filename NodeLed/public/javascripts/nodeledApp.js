var nodeledApp = angular.module('NodeLed', ['ngRoute','color.picker','winjs','colorpicker.module']);

nodeledApp.config(['$routeProvider', function ($routerProvider) {
        $routerProvider.
            when('/leds', {
            templateUrl: '/views/leds.jade',
            controller: 'ledController'
        }).when('/menu', {
            templateUrl: '/views/menu.jade',
            controller: 'menuController'
        }).otherwise({
            redirectTo: '/views/index.jade'
        });
    }]);
