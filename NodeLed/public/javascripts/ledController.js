// should define this in seperate file as each controller should have one
nodeledApp.controller('ledController', function ($scope,$http) {
    numRows = 10; numCols = 12; ledNumber = 0;
    $scope.leds = { "ledpage": [], "Name" : "" };
    $scope.selectedColour = {Color1:"",Color2:"",Color3:"",Color4:""};
    $scope.currentColour = "";
    $scope.brightness = 31;
    $scope.dataPacket = "";
    $scope.ledstring = "";
    $scope.ledlist = [];

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

    //  alert($scope.dataPacket.length);
    // now send this leds via http
    $http({
        url: 'http://adamandlindsey.co.uk:3000/test/example1/?fields=["Name"]',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }

        //   headers: {'Content-Type':'application/text'}
    }).success(function (data, status, headers, config) {
        //    alert(data);
        $scope.ledlist = data;

    }).error(function (data, status, headers, config) {
        // alert("error");
    });

    function isOdd(num) {
        return (num % 2) == 1;
    }

    $scope.selectLeds = function()
    {
       // get leds using selected id (first of mutliple selections)
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1/' + $scope.selectedName[0]._id,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

            //   headers: {'Content-Type':'application/text'}
        }).success(function (data, status, headers, config) {
            //    alert(data);
            $scope.leds = data;

        }).error(function (data, status, headers, config) {
            alert("error getting data for id:" + $scope.selectedName[0]._id);
        });
    }

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

      //  alert($scope.dataPacket.length);
        // now send this leds via http
        $http({
            url: 'http://192.168.0.18/api/leds',
            method: 'POST',
            data: $scope.dataPacket.slice(0, -1),
            headers: { 'Content-Type': 'text/plain' }

         //   headers: {'Content-Type':'application/text'}
        }).success(function (data,status,headers,config) {
         //   alert("success");
        }).error(function (data,status,headers,config) {
           // alert("error");
        });
    }

    $scope.save = function ()
    {
        //  alert($scope.dataPacket.length);
        // now send this leds via http
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1',
            method: 'POST',
            data: JSON.stringify($scope.leds, ["ledpage", "id", "rgb", "Name"]),
            headers: { 'Content-Type': 'application/json' }

            //   headers: {'Content-Type':'application/text'}
        }).success(function (data, status, headers, config) {
            alert("successfully saved");
        }).error(function (data, status, headers, config) {
            // alert("error");
        });
    }

    $scope.delete = function ()
    {
        // get leds using selected id (first of mutliple selections)
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1/' + $scope.selectedName[0]._id,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }

            //   headers: {'Content-Type':'application/text'}
        }).success(function (data, status, headers, config) {
            //    alert(data);
            // $scope.leds = data;
            $scope.ledlist

        }).error(function (data, status, headers, config) {
            alert("error getting data for id:" + $scope.selectedName[0]._id);
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

    // uses predicate function for sorting much like .Net
    function predicateBy(prop) {
        return function (a, b) {
            return b[prop] - a[prop];
        }
    }

});