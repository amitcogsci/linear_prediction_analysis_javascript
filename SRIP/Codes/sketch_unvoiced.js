var source, fft;
var bNormalize = true;
var centerClip = false;
var sound;

function preload(){
    sound = loadSound("unvoiced.wav");
  }

function setup() {
  createCanvas(1000, 250);
  noFill();
  button = createButton('generate')
  button.mouseClicked(togglePlay)
  fill(0,0,0);
  text('amplitude values along the time domain for unvoiced sound', 0, 12);
  fill(255,0,0);
  text('generated autocorrelation signal of the unvoiced sound', 600, 12);

  fft = new p5.FFT();
  fft.setInput(sound);
}

function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.play();
      
    
    }
  }

function draw() {
    rawplot();
    residueplot();
}


function rawplot(){
    beginShape();
    noFill();
    stroke(0,0,0); 
    strokeWeight(1);
    waveform = fft.waveform();

  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, 400);
    var y = map( waveform[i], 1, -1, 0, height);
  
    vertex(x,y);

  }
  endShape();
}
//extracting autocorrelation samples
function residueplot(){
    stroke(255,0,0);
    beginShape()
    noFill();
    
  var timeDomain = fft.waveform(2048, 'float32');
  var corrBuff = autoCorrelate(timeDomain);

  
  for (var j = 0; j < corrBuff.length; j++) {
    var w = map(j, 0, corrBuff.length, 450, width);
    var h = map(corrBuff[j], -1, 1, height, 0);
    vertex(w,h);
  }
  endShape();

}




function autoCorrelate(buffer) {
  var newBuffer = [];
  var nSamples = buffer.length;

  var autocorrelation = [];

  if (centerClip) {
    var cutoff = 0.1;
    for (var i = 0; i < buffer.length; i++) {
      var val = buffer[i];
      buffer[i] = Math.abs(val) > cutoff ? val : 0;
    }
  }

  for (var lag = 0; lag < nSamples; lag++){
    var sum = 0; 
    for (var index = 0; index < nSamples; index++){
      var indexLagged = index+lag;
      if (indexLagged < nSamples){
        var sound1 = buffer[index];
        var sound2 = buffer[indexLagged];
        var product = sound1 * sound2;
        sum += product;
      }
    }

    // average to a value between -1 and 1
    newBuffer[lag] = sum/nSamples;
  }

  if (bNormalize){
    var biggestVal = 0;
    for (var index = 0; index < nSamples; index++){
      if (abs(newBuffer[index]) > biggestVal){
        biggestVal = abs(newBuffer[index]);
      }
    }
    for (var index = 0; index < nSamples; index++){
      newBuffer[index] /= biggestVal;
    }
  }

  return newBuffer;
}