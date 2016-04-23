// should define this in seperate file as each controller should have one
nodeledApp.controller('ledController', function ($scope,$http) {

    $scope.name = "Adam";
    numRows = 10;
    numCols = 12;
    $scope.leds = [];
    ledNumber = 0;
    $scope.selectedColour;
    $scope.brightness = 31;
    $scope.dataPacket = "";

    for(a=0;a < numRows;a++)
    {
        var data = [];
  
        for(b=0;b < numCols; b++)
        {
            data.push({
                    "id": ledNumber, "rgb": "rgb(0,0,0)"
            });
            ledNumber++;
        }
        $scope.leds.push(data);     
    }

    $scope.leds.sort();

    function isOdd(num) {
        return (num % 2) == 1;
    }

    $scope.suck = function()
    {
        // sort to so it will be sent in as one string
        // $scope.leds[1].sort(predicateBy("id"));
        $scope.dataPacket = "";

        // build string of data to send from array
        for (a = 0; a < numRows; a++) {
            var ledrow = Object.assign([], $scope.leds[a]);

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
    }

    $scope.tdclick = function(el) {
        el.led.rgb = $scope.selectedColour;  
    }

    // uses predicate function for sorting much like .Net
    function predicateBy(prop) {
        return function (a, b) {
            return b[prop] - a[prop];
        }
    }

});