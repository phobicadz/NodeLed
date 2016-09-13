// led functions for Raspberry PI go here
ledstrip = require('rpi-ws281x-native');
//ledgrid = require('hooloovoo');

exports.writeToConsole =  function(message) {
    console.log(message);
};

// APA102 grid
exports.writeToBoard = function(message) {

    // convert JSON object
    

};

// WS2812 strip
exports.writeToStrip = function(message) {

    // will be a pattern of up to 5 leds that can repeat,fade,glow,pulse etc
    // all the options will be present in the message which will be a JSON object.
    // convert led data to array

};
