// led functions for Raspberry PI go here
ledstrip = require('rpi-ws281x-native');
ledgrid = require('hooloovoo');
// look at using spi as hooloovoo seems shit/or alter hooloovoo to make it less shit

exports.writeToConsole =  function(message) {
    console.log(message);
};

// APA102 grid
exports.writeToBoard = function(message) {  
    ledgrid.setup(120);
    ledgrid.clear();
    // convert JSON object to data buffer
    lednumber = 0;

    for(a=0;a<10;a++) {
        line = message.ledpage[a];
        for(b=0;b<12;b++) {
             rgb = line[b].rgb.substr(4).replace(')','');
             arrRGB = rgb.split(",");
            //TODO: needs to write to take account of grid arrangement
             ledgrid.set_pixel_RGB(lednumber,arrRGB[0],arrRGB[1],arrRGB[2])
             lednumber++;
        }     
    }
};

// rainbow pattern loop
exports.rainbowStrip = function(message) {
    ledstrip.init(100);
    pixelData = new Uint32Array(100);
    var offset = 0;
  
    for(a= 0;a<1000;a++){
        for (var i = 0; i < 100; i++) {
             pixelData[i] = colorwheel((offset + i) % 256);
        }

     offset = (offset + 1) % 256;

    ledstrip.render(pixelData);
  }
};

// write pixel data, message contains JSON data
exports.writeToStrip = function(message) {

    ledstrip.init(100);
    lednumber = 0;

    pixelData = new Uint32Array(100);

    for(a=0;a<10;a++) {
        line = message.ledpage[a];
        for(b=0;b<10;b++) {
             rgb = line[b].rgb.substr(4).replace(')','');
             arrRGB = rgb.split(",");
             pixelData[lednumber] = rgb2Int(arrRGB[0],arrRGB[1],arrRGB[2])
             lednumber++;
        }     
    }
    ledstrip.render(pixelData);
};



function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}
