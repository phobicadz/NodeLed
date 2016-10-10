var count = 0; 
var intervalObject = setInterval(getLucky
    , 1000); 
var loop = true;

function getLucky() {
        count++; 
        console.log(count, 'seconds passed'); 
        if (count == 5) { 
          console.log('looping'); 
          clearInterval(intervalObject);
          if(loop) {
            count = 0; 
            intervalObject = setInterval(getLucky
                , 1000); 
        }
    }
}