﻿var app = angular.module('NodeLed', []);

// should define this in seperate file as each controller should have one
app.controller('myCtrl', function ($scope) {
    $scope.firstName = "Terry";
    $scope.lastName = "Towelling";
});
