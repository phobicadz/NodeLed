// should define this in seperate file as each controller should have one
nodeledApp.controller('ledController', function ($scope) {

    $scope.name = "Adam";
    numRows = 10;
    numCols = 12;
    $scope.leds = [];
    ledNumber = 0;

    for (a=0;a < numRows;a++)
    {
        var data = [];
        for(b=0;b < numCols; b++)
        {
            data.push({
                "id": ledNumber, "rgb": "#fffff"
            });
            ledNumber++;
        }
        $scope.leds.push(data);     
    }

});