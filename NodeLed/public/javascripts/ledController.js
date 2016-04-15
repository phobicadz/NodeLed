// should define this in seperate file as each controller should have one
nodeledApp.controller('ledController', function ($scope) {

    $scope.name = "Adam";

    $scope.leds = { "Row1": [ {"id": 1,"rgb":"#fffff"},{"id": 2,"rgb":"#fffff"} ],
                    "Row2": [ {"id": 3,"rgb":"#fffff"},{"id": 4,"rgb":"#fffff"} ]};


});