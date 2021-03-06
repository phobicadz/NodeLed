// led functions for Raspberry PI go here
ledstrip = require('rpi-ws281x-native');
ledgrid = require('hooloovoo');
// look at using spi as hooloovoo seems shit/or alter hooloovoo to make it less shit
// seems to refresh on every pixel

var intervalCallback;
var repeatLine = 0;
var loop = false;
var bounce = false;
var bounceDirection = "down";

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

// stop loop
exports.stopLoop = function() {
    clearTimeout(intervalCallback);
    loop = false;
}

// write pixel data, message contains JSON data
exports.writeToStrip = function(message) {
    // check to see if this is a repeating pattern
    // if so then write pixel data as a pattern loop ie each ten pixels repeated ten times over strip
    // in given period of time

    // clear any previous repeating pattern
    if (intervalCallback != null) clearTimeout(intervalCallback);

    ledstrip.init(100);
    lednumber = 0;
    pixelData = new Uint32Array(100);
  
    // check message for animate parameter
    if (message.animate)
    {
        loop = message.loop;
        repeatLine = 0;
        intervalCallback = setInterval(renderOnInterval,message.interval,message);
    }
    else
    {
        // check repeat to see if first ten pixels are to be repeated
        for(a=0;a<10;a++) {
            if (message.repeat == true) {
                line = message.ledpage[0];
            } 
            else {
                line = message.ledpage[a];
            }
            
            for(b=0;b<10;b++) {
                rgb = line[b].rgb.substr(4).replace(')','');
                arrRGB = rgb.split(",");
                pixelData[lednumber] = rgb2Int(arrRGB[1],arrRGB[0],arrRGB[2])
                lednumber++;
            }     
        }
    }

    ledstrip.render(pixelData);
};

// write pages as a sequence, individually animating them if require
exports.writeSequenceToStrip = function(message) {

    // expected parameters:-
    // array of page ids
    // interval between them
    // wether to loop the whole sequence or not
    
}


function renderOnInterval(message) {

     if((bounceDirection == "down" && repeatLine == 10) || (bounceDirection == "up" && repeatLine == -1)) {
            clearTimeout(intervalCallback);
        
            if(loop) { 
                if(message.bounce && bounceDirection == "up") {
                    bounceDirection = "down";
                    repeatLine = 0;
                } 
                else if (message.bounce && bounceDirection == "down") {
                    bounceDirection = "up";
                    repeatLine = 9;
                }
                else
                {
                    repeatLine = 0;
                }

                intervalCallback = setInterval(renderOnInterval,message.interval,message);
            } 
     }
     else
     {
        ledstrip.init(100);
        lednumber = 0;
        pixelData = new Uint32Array(100);
        line = message.ledpage[repeatLine];
        //console.log(repeatLine);
     //   console.log(bounceDirection);
 
        for(a=0;a<10;a++) {
                    for(b=0;b<10;b++) {
                        rgb = line[b].rgb.substr(4).replace(')','');
                        arrRGB = rgb.split(",");
                        pixelData[lednumber] = rgb2Int(arrRGB[1],arrRGB[0],arrRGB[2])
                        lednumber++;
                    }     
                }
        }

        ledstrip.render(pixelData);

        if(message.bounce && bounceDirection == "up")
        { repeatLine --; } else {  repeatLine ++; }
       
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
