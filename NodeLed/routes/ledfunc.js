// led functions for Raspberry PI go here
ledstrip = require('rpi-ws281x-native');
ledgrid = require('hooloovoo');

exports.writeToConsole =  function(message) {
    console.log(message);
};

// APA102 grid
exports.writeToBoard = function(message) {
    
    ledgrid.clear();
    ledgrid.setup(120,128);
    // convert JSON object to data buffer
    lednumber = 0;

    for(a=0;a<10;a++) {
        line = message.ledpage[a];
        for(b=0;b<12;b++) {
             rgb = line[b].rgb.substr(4).replace(')','');
             arrRGB = rgb.split(",");

            // console.log(lednumber,arrRGB[0],arrRGB[1],arrRGB[2]);

             ledgrid.set_pixel_RGB(lednumber,arrRGB[0],arrRGB[1],arrRGB[2])
             lednumber++;
        }     
    }

};

// WS2812 strip
exports.writeToStrip = function(message) {

    // will be a pattern of up to 5 leds that can repeat,fade,glow,pulse etc
    // all the options will be present in the message which will be a JSON object.
    // convert led data to array
    ledstrip.init(100);

    /* UintArray */
    /*the pixel-data, 24bit per pixel in
        RGB-format (0xff00000 is red).*/
    pixelData = new Uint32Array(100);


    var offset = 0;
  
  for(a= 0;a<1000;a++){
    for (var i = 0; i < 100; i++) {
         pixelData[i] = colorwheel((offset + i) % 256);
    }

     offset = (offset + 1) % 256;
     ledstrip.render(pixelData);
   
 //   for(a=0;a<100;a++) {
	// actually GRB
 //       pixelData[a] = rgb2Int(100,200,100);
 //   }

    ledstrip.render(pixelData);
  }

};

exports.colourStrip = function(colour) {

    ledstrip.init(100);

    pixelData = new Uint32Array(100);

       for(a=0;a<100;a++) {
	//actually GRB
       pixelData[a] = parseInt(colour,16);
  }

  ledstrip.render(pixelData);

}

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
