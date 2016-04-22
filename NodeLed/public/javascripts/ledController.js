﻿// should define this in seperate file as each controller should have one
nodeledApp.controller('ledController', function ($scope) {

    $scope.name = "Adam";
    numRows = 10;
    numCols = 12;
    $scope.leds = [];
    ledNumber = 0;
    $scope.selectedColour;

    for(a=0;a < numRows;a++)
    {
        var data = [];
        var oddIndex = ledNumber + (numCols-1);
        for(b=0;b < numCols; b++)
        {
            if (isOdd(a))
            {
                data.push({
                    "id": oddIndex, "rgb": "#000000", "yep": isOdd(a)
                });
                oddIndex--;
            }
            else
            {
                data.push({
                    "id": ledNumber, "rgb": "#000000", "yep": isOdd(a)
                });
            }      
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
        alert($scope.leds[0][0].rgb);

        // sort to so it will be sent in as one string
        $scope.leds[1].sort(predicateBy("id"));

    }

    $scope.tdclick = function(el) {
      
        el.led.rgb = $scope.selectedColour;
    }

    // uses predicate function for sorting much like .Net
    function predicateBy(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

});