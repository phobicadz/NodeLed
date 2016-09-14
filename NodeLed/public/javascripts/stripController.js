nodeledApp.controller('stripController', function ($scope,$http) {
    numRows = 1; numCols = 10; ledNumber = 0;
    newPage = { "ledpage": [], "Name": "NewPage", "selectedColour": { "Color1": "rgb(255,255,255)", "Color2": "rgb(255,255,255)", "Color3": "rgb(255,255,255)", "Color4": "rgb(255,255,255)" }, "strip":true };
    $scope.leds = newPage;

    function ClearPage() {
        $scope.leds.ledpage = [];

        for (a = 0; a < numRows; a++) {
            var data = [];
            for (b = 0; b < numCols; b++) {
                data.push({
                    "id": ledNumber, "rgb": "rgb(0,0,0)"
                });
                ledNumber++;
            }
            $scope.leds.ledpage.push(data);
        }
    }

    ClearPage();
    GetLedList();

     // Controller functions ------------------------------------------------------
    function selectLeds()
    {
       // get leds using selected id (first of mutliple selections)
        $http({
            url: $scope.mongoURL + '/test/example1/' + $scope.index,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.leds = data;
        }).error(function (data, status, headers, config) {
            alert("error getting data for id:" + $scope.index)
        });
    }
    $scope.selectLeds = selectLeds;

    $scope.save = function ()
    {
        jsonData = JSON.stringify($scope.leds, ["ledpage", "id", "rgb", "Name","selectedColour","Color1","Color2","Color3","Color4"],"strip");

        $http({
            url: $scope.mongoURL + '/test/example1/' + $scope.index,
            method: 'PUT',
            data: jsonData,
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            GetLedList();    
        }).error(function (data, status, headers, config) {
            alert("Error trying to Save");
        });
    }

    $scope.delete = function()
    {    
        $http({
            url: $scope.mongoURL + '/test/example1/' + $scope.index,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            //   $scope.ledlist.splice(drpPages.selectedIndex, 1);
            GetLedList();
            ClearPage();
        }).error(function (data, status, headers, config) {
  
        });
    }

    $scope.tdclick = function (el) {
        if (el.led.rgb == "rgb(0,0,0)"){
            el.led.rgb = $scope.currentColour;
        }
        else {
            el.led.rgb = 'rgb(0,0,0)';
        }     
    }

    $scope.onColorChange = function ($event, color){
        $scope.currentColour = color;
    }

    $scope.selectColour = function (color){
        $scope.currentColour = color;
    }

    function handler(eventInfo) {
        $scope.index = eventInfo.detail.itemPromise._value.data._id;
        selectLeds();
    };

});