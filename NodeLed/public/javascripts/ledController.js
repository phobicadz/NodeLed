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
    $scope.ledstring = "";

    // $scope.leds = [[{ "id": 0, "rgb": "rgb(0,0,0)", "$$hashKey": "object:35" }, { "id": 1, "rgb": "rgb(0,0,0)", "$$hashKey": "object:36" }, { "id": 2, "rgb": "rgb(0,0,0)", "$$hashKey": "object:37" }, { "id": 3, "rgb": "rgb(0,0,0)", "$$hashKey": "object:38" }, { "id": 4, "rgb": "rgb(0,0,0)", "$$hashKey": "object:39" }, { "id": 5, "rgb": "rgb(0,0,0)", "$$hashKey": "object:40" }, { "id": 6, "rgb": "rgb(0,0,0)", "$$hashKey": "object:41" }, { "id": 7, "rgb": "rgb(0,0,0)", "$$hashKey": "object:42" }, { "id": 8, "rgb": "rgb(0,0,0)", "$$hashKey": "object:43" }, { "id": 9, "rgb": "rgb(0,0,0)", "$$hashKey": "object:44" }, { "id": 10, "rgb": "rgb(0,0,0)", "$$hashKey": "object:45" }, { "id": 11, "rgb": "rgb(0,0,0)", "$$hashKey": "object:46" }], [{ "id": 12, "rgb": "rgb(0,0,0)", "$$hashKey": "object:71" }, { "id": 13, "rgb": "rgb(0,0,0)", "$$hashKey": "object:72" }, { "id": 14, "rgb": "rgb(0,0,0)", "$$hashKey": "object:73" }, { "id": 15, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:74" }, { "id": 16, "rgb": "rgb(0,0,0)", "$$hashKey": "object:75" }, { "id": 17, "rgb": "rgb(0,0,0)", "$$hashKey": "object:76" }, { "id": 18, "rgb": "rgb(0,0,0)", "$$hashKey": "object:77" }, { "id": 19, "rgb": "rgb(0,0,0)", "$$hashKey": "object:78" }, { "id": 20, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:79" }, { "id": 21, "rgb": "rgb(0,0,0)", "$$hashKey": "object:80" }, { "id": 22, "rgb": "rgb(0,0,0)", "$$hashKey": "object:81" }, { "id": 23, "rgb": "rgb(0,0,0)", "$$hashKey": "object:82" }], [{ "id": 24, "rgb": "rgb(0,0,0)", "$$hashKey": "object:107" }, { "id": 25, "rgb": "rgb(0,0,0)", "$$hashKey": "object:108" }, { "id": 26, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:109" }, { "id": 27, "rgb": "rgb(0,0,0)", "$$hashKey": "object:110" }, { "id": 28, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:111" }, { "id": 29, "rgb": "rgb(0,0,0)", "$$hashKey": "object:112" }, { "id": 30, "rgb": "rgb(0,0,0)", "$$hashKey": "object:113" }, { "id": 31, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:114" }, { "id": 32, "rgb": "rgb(0,0,0)", "$$hashKey": "object:115" }, { "id": 33, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:116" }, { "id": 34, "rgb": "rgb(0,0,0)", "$$hashKey": "object:117" }, { "id": 35, "rgb": "rgb(0,0,0)", "$$hashKey": "object:118" }], [{ "id": 36, "rgb": "rgb(0,0,0)", "$$hashKey": "object:143" }, { "id": 37, "rgb": "rgb(0,0,0)", "$$hashKey": "object:144" }, { "id": 38, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:145" }, { "id": 39, "rgb": "rgb(0,0,0)", "$$hashKey": "object:146" }, { "id": 40, "rgb": "rgb(0,0,0)", "$$hashKey": "object:147" }, { "id": 41, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:148" }, { "id": 42, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:149" }, { "id": 43, "rgb": "rgb(0,0,0)", "$$hashKey": "object:150" }, { "id": 44, "rgb": "rgb(0,0,0)", "$$hashKey": "object:151" }, { "id": 45, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:152" }, { "id": 46, "rgb": "rgb(0,0,0)", "$$hashKey": "object:153" }, { "id": 47, "rgb": "rgb(0,0,0)", "$$hashKey": "object:154" }], [{ "id": 48, "rgb": "rgb(0,0,0)", "$$hashKey": "object:179" }, { "id": 49, "rgb": "rgb(0,0,0)", "$$hashKey": "object:180" }, { "id": 50, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:181" }, { "id": 51, "rgb": "rgb(0,0,0)", "$$hashKey": "object:182" }, { "id": 52, "rgb": "rgb(0,0,0)", "$$hashKey": "object:183" }, { "id": 53, "rgb": "rgb(0,0,0)", "$$hashKey": "object:184" }, { "id": 54, "rgb": "rgb(0,0,0)", "$$hashKey": "object:185" }, { "id": 55, "rgb": "rgb(0,0,0)", "$$hashKey": "object:186" }, { "id": 56, "rgb": "rgb(0,0,0)", "$$hashKey": "object:187" }, { "id": 57, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:188" }, { "id": 58, "rgb": "rgb(0,0,0)", "$$hashKey": "object:189" }, { "id": 59, "rgb": "rgb(0,0,0)", "$$hashKey": "object:190" }], [{ "id": 60, "rgb": "rgb(0,0,0)", "$$hashKey": "object:215" }, { "id": 61, "rgb": "rgb(0,0,0)", "$$hashKey": "object:216" }, { "id": 62, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:217" }, { "id": 63, "rgb": "rgb(0,0,0)", "$$hashKey": "object:218" }, { "id": 64, "rgb": "rgb(0,0,0)", "$$hashKey": "object:219" }, { "id": 65, "rgb": "rgb(0,0,0)", "$$hashKey": "object:220" }, { "id": 66, "rgb": "rgb(0,0,0)", "$$hashKey": "object:221" }, { "id": 67, "rgb": "rgb(0,0,0)", "$$hashKey": "object:222" }, { "id": 68, "rgb": "rgb(0,0,0)", "$$hashKey": "object:223" }, { "id": 69, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:224" }, { "id": 70, "rgb": "rgb(0,0,0)", "$$hashKey": "object:225" }, { "id": 71, "rgb": "rgb(0,0,0)", "$$hashKey": "object:226" }], [{ "id": 72, "rgb": "rgb(0,0,0)", "$$hashKey": "object:251" }, { "id": 73, "rgb": "rgb(0,0,0)", "$$hashKey": "object:252" }, { "id": 74, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:253" }, { "id": 75, "rgb": "rgb(0,0,0)", "$$hashKey": "object:254" }, { "id": 76, "rgb": "rgb(0,0,0)", "$$hashKey": "object:255" }, { "id": 77, "rgb": "rgb(0,0,0)", "$$hashKey": "object:256" }, { "id": 78, "rgb": "rgb(0,0,0)", "$$hashKey": "object:257" }, { "id": 79, "rgb": "rgb(0,0,0)", "$$hashKey": "object:258" }, { "id": 80, "rgb": "rgb(0,0,0)", "$$hashKey": "object:259" }, { "id": 81, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:260" }, { "id": 82, "rgb": "rgb(0,0,0)", "$$hashKey": "object:261" }, { "id": 83, "rgb": "rgb(0,0,0)", "$$hashKey": "object:262" }], [{ "id": 84, "rgb": "rgb(0,0,0)", "$$hashKey": "object:287" }, { "id": 85, "rgb": "rgb(0,0,0)", "$$hashKey": "object:288" }, { "id": 86, "rgb": "rgb(0,0,0)", "$$hashKey": "object:289" }, { "id": 87, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:290" }, { "id": 88, "rgb": "rgb(0,0,0)", "$$hashKey": "object:291" }, { "id": 89, "rgb": "rgb(0,0,0)", "$$hashKey": "object:292" }, { "id": 90, "rgb": "rgb(0,0,0)", "$$hashKey": "object:293" }, { "id": 91, "rgb": "rgb(0,0,0)", "$$hashKey": "object:294" }, { "id": 92, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:295" }, { "id": 93, "rgb": "rgb(0,0,0)", "$$hashKey": "object:296" }, { "id": 94, "rgb": "rgb(0,0,0)", "$$hashKey": "object:297" }, { "id": 95, "rgb": "rgb(0,0,0)", "$$hashKey": "object:298" }], [{ "id": 96, "rgb": "rgb(0,0,0)", "$$hashKey": "object:323" }, { "id": 97, "rgb": "rgb(0,0,0)", "$$hashKey": "object:324" }, { "id": 98, "rgb": "rgb(0,0,0)", "$$hashKey": "object:325" }, { "id": 99, "rgb": "rgb(0,0,0)", "$$hashKey": "object:326" }, { "id": 100, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:327" }, { "id": 101, "rgb": "rgb(0,0,0)", "$$hashKey": "object:328" }, { "id": 102, "rgb": "rgb(0,0,0)", "$$hashKey": "object:329" }, { "id": 103, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:330" }, { "id": 104, "rgb": "rgb(0,0,0)", "$$hashKey": "object:331" }, { "id": 105, "rgb": "rgb(0,0,0)", "$$hashKey": "object:332" }, { "id": 106, "rgb": "rgb(0,0,0)", "$$hashKey": "object:333" }, { "id": 107, "rgb": "rgb(0,0,0)", "$$hashKey": "object:334" }], [{ "id": 108, "rgb": "rgb(0,0,0)", "$$hashKey": "object:359" }, { "id": 109, "rgb": "rgb(0,0,0)", "$$hashKey": "object:360" }, { "id": 110, "rgb": "rgb(0,0,0)", "$$hashKey": "object:361" }, { "id": 111, "rgb": "rgb(0,0,0)", "$$hashKey": "object:362" }, { "id": 112, "rgb": "rgb(0,0,0)", "$$hashKey": "object:363" }, { "id": 113, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:364" }, { "id": 114, "rgb": "rgb(227, 50, 50)", "$$hashKey": "object:365" }, { "id": 115, "rgb": "rgb(0,0,0)", "$$hashKey": "object:366" }, { "id": 116, "rgb": "rgb(0,0,0)", "$$hashKey": "object:367" }, { "id": 117, "rgb": "rgb(0,0,0)", "$$hashKey": "object:368" }, { "id": 118, "rgb": "rgb(0,0,0)", "$$hashKey": "object:369" }, { "id": 119, "rgb": "rgb(0,0,0)", "$$hashKey": "object:370" }]]

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

    
    function isOdd(num) {
        return (num % 2) == 1;
    }

    $scope.suck = function()
    {
        // sort to so it will be sent in as one string
        // $scope.leds[1].sort(predicateBy("id"));
        $scope.dataPacket = "";
        $scope.ledstring = JSON.stringify($scope.leds);

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