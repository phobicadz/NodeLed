nodeledApp.controller('stripController', function ($scope,$http) {
    numRows = 10; numCols = 10; ledNumber = 0;
    newPage = { "ledpage": [], "Name": "NewPage", "selectedColour": { "Color1": "rgb(255,255,255)", "Color2": "rgb(255,255,255)", "Color3": "rgb(255,255,255)", "Color4": "rgb(255,255,255)" },
         "strip":true,"repeat":true,"interval":1000,"animate":false,"loop":false,"bounce":false};

    $scope.leds = newPage;
    $scope.currentColour = "";
    $scope.brightness = 31;
    $scope.dataPacket = "";
    $scope.ledstring = "";
    $scope.ledlist = [];
    $scope.selection = [];
    $scope.index = "";
    $scope.contentDialogHidden = true;
    $scope.mongoURL = "http://adamandlindsey.co.uk:3000";
    $scope.apiURL = "http://" + window.location.host + "/send/strip";
    
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

    $scope.suck = function()
    {
        // send and save
        $scope.dataPacket = "";
        $scope.ledstring = JSON.stringify($scope.leds,["ledpage","id","rgb","repeat","strip","interval","animate","loop","bounce"]);
        // build string of data to send from array
      
        // Send to the api on localhost - send as json
        $http({
            url: $scope.apiURL,
            method: 'POST',
            data:$scope.ledstring,
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data,status,headers,config) {
    
        }).error(function (data,status,headers,config) {
           
        });
    }


     function GetLedList() {
        $http({
            url: $scope.mongoURL + '/test/example1/?fields=["grid","Name"]&sort=["Name"]&query={ "$and": [ { "grid": { "$exists":true} }, {"grid":true} ] }',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {        
            $scope.ledlist = data;
        }).error(function (data, status, headers, config) {
            alert("failure to retrive pages")
        });
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

    $scope.sendToStrip = function() {
        // send to strip
        $scope.ledstring = JSON.stringify($scope.leds,["ledpage","id","rgb","strip","repeat","interval","animate","loop"]);

        // Send to the api on localhost - send as json
        $http({
            url: $scope.apiURL,
            method: 'POST',
            data:$scope.ledstring,
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data,status,headers,config) {
    
        }).error(function (data,status,headers,config) {
           
        });

        $scope.save();
    }

    $scope.save = function ()
    {
        jsonData = JSON.stringify($scope.leds, ["ledpage", "id", "rgb", "Name","selectedColour","Color1","Color2","Color3","Color4","strip","repeat","interval","animate","loop"]);

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

        $scope.dialogHandler = function (eventInfo) {
        //    alert(eventInfo.detail.result);
        if (eventInfo.detail.result == "primary") {
            $scope.delete();
        }  
    };

    $scope.$on('$routeChangeSuccess', function () {
        $scope.listView.oniteminvoked = handler;
        $scope.plopup.onafterhide = $scope.dialogHandler;
    });

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
nodeledApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

