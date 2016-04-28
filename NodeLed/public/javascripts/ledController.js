nodeledApp.controller('ledController', function ($scope,$http) {
    numRows = 10; numCols = 12; ledNumber = 0;
    newPage = { "ledpage": [], "Name": "NewPage", "selectedColour": { "Color1": "rgb(255,255,255)", "Color2": "rgb(255,255,255)", "Color3": "rgb(255,255,255)", "Color4": "rgb(255,255,255)" } };
    $scope.leds = newPage;
    $scope.currentColour = "";
    $scope.brightness = 31;
    $scope.dataPacket = "";
    $scope.ledstring = "";
    $scope.ledlist = [];
    $scope.selection = [];
    $scope.index = "";
    
    var Mode = {
        editMode: {
            text: "edit",
            selectionMode: "multi",
            tapBehavior: "toggleSelect"
        },
        readOnly: {
            text: "readonly",
            selectionMode: "none",
            tapBehavior: "none"
        }
    };

    $scope.mode = Mode.readOnly;
 
    function GetLedList() {
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1/?fields=["Name"]',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {        
            $scope.ledlist = data;
        }).error(function (data, status, headers, config) {

        });
    }

    function isOdd(num) {
        return (num % 2) == 1;
    }

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

    // uses predicate function for sorting much like .Net
    function predicateBy(prop) {
        return function (a, b) {
            return b[prop] - a[prop];
        }
    }

    // Initial function calls
    ClearPage();
    GetLedList();

    // Controller functions ------------------------------------------------------
    function selectLeds()
    {
       // get leds using selected id (first of mutliple selections)
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1/' + $scope.index,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            $scope.leds = data;
        }).error(function (data, status, headers, config) {
            alert("error getting data for id:" + $scope.index)
        });
    }
    $scope.selectLeds = selectLeds;

    $scope.suck = function()
    {
        // send and save
        $scope.dataPacket = "";
        $scope.ledstring = JSON.stringify($scope.leds,["ledpage","id","rgb"]);
        // build string of data to send from array
        for (a = 0; a < numRows; a++) {
            var ledrow = Object.assign([], $scope.leds.ledpage[a]);
            if (isOdd(a)) {         
                ledrow.sort(predicateBy("id"));
            }        
            for (b = 0; b < numCols; b++) {
                var color = tinycolor(ledrow[b].rgb);
                $scope.dataPacket += $scope.brightness + "," + color.toRgb().b + "," + color.toRgb().g + ","  + color.toRgb().r + ","
            }
        }
        $http({
            url: 'http://192.168.0.18/api/leds',
            method: 'POST',
            data: $scope.dataPacket.slice(0, -1),
            headers: { 'Content-Type': 'text/plain' }
        }).success(function (data,status,headers,config) {
    
        }).error(function (data,status,headers,config) {
           
        });
    }

    $scope.save = function ()
    {
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1/' + $scope.index,
            method: 'PUT',
            data: JSON.stringify($scope.leds, ["ledpage", "id", "rgb", "Name","selectedColour","Color1","Color2","Color3","Color4"]),
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            GetLedList();
        }).error(function (data, status, headers, config) {
            alert("Error trying to Save");
        });
    }

    $scope.delete = function()
    {
        // get leds using selected id (first of mutliple selections)
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1/' + $scope.index,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            //   $scope.ledlist.splice(drpPages.selectedIndex, 1);
            GetLedList();
            ClearPage();
        }).error(function (data, status, headers, config) {
  
        });
    }

    $scope.add = function()
    {
        $scope.leds = newPage;
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1',
            method: 'POST',
            data: JSON.stringify($scope.leds, ["ledpage", "id", "rgb", "Name", "selectedColour", "Color1", "Color2", "Color3", "Color4"]),
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            GetLedList();
        }).error(function (data, status, headers, config) {

        });
    }

    $scope.tdclick = function (el) {

        if (el.led.rgb == "rgb(0,0,0)")
        {
            el.led.rgb = $scope.currentColour;
        }
        else {
            el.led.rgb = 'rgb(0,0,0)';
        }     
    }

    $scope.onColorChange = function ($event, color)
    {
        $scope.currentColour = color;
    }

    $scope.selectColour = function (color)
    {
        $scope.currentColour = color;
    }

    function handler(eventInfo) {
        $scope.index = eventInfo.detail.itemPromise._value.data._id;
        selectLeds();
    };

    $scope.$on('$routeChangeSuccess', function () {
        $scope.listView.oniteminvoked = handler;
    });

});
