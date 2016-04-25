// should define this in seperate file as each controller should have one
nodeledApp.controller('ledController', function ($scope,$http) {

    $scope.name = "Adam";
    numRows = 10;
    numCols = 12;
    $scope.leds = { "ledpage": [], "Name" : "" };
    ledNumber = 0;
    $scope.selectedColour;
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
        //  alert($scope.dataPacket.length);
        // now send this leds via http
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
        // sort to so it will be sent in as one string
        // $scope.leds[1].sort(predicateBy("id"));
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
            alert("success");
        }).error(function (data,status,headers,config) {
           // alert("error");
        });

   
        //  alert($scope.dataPacket.length);
        // now send this leds via http
        $http({
            url: 'http://adamandlindsey.co.uk:3000/test/example1',
            method: 'POST',
            data: JSON.stringify($scope.leds,["ledpage","id","rgb","Name"]),
            headers: { 'Content-Type': 'application/json' }

            //   headers: {'Content-Type':'application/text'}
        }).success(function (data, status, headers, config) {
            alert("successfully added to database");
        }).error(function (data, status, headers, config) {
            // alert("error");
        });
    }

    $scope.tdclick = function (el) {

        if (el.led.rgb == "rgb(0,0,0)")
        {
            el.led.rgb = $scope.selectedColour;
        }
        else {
            el.led.rgb = 'rgb(0,0,0)';
        }     
    }

    // uses predicate function for sorting much like .Net
    function predicateBy(prop) {
        return function (a, b) {
            return b[prop] - a[prop];
        }
    }

});