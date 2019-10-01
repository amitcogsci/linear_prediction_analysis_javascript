var source, fft; 
var bNormalize = true;
var centerClip = false;
var sound;

function preload(){
    sound = loadSound("unvoiced_sample.wav");
  }
function setup() {
  createCanvas(1250, 450);
  noFill();
  button = createButton('generate')
  button.mouseClicked(togglePlay)
  fill(0,0,0);
  text('Drag and select the window waveform, click on window to play',370, 9)
  fill(255,0,0);
  text('Windowed Waveform', 80, 200);
  fill(255,0,0);
  text('Autocorrelation signal for unvoiced sound sample', 80, 430);
  fill(255,0,0)
  text('LP Log Spectrum', 650,200)
  fill(255,0,0)
  text('Log Spectrum', 650,440)
  fft()
  new_fft()
}

function fft() {
  fft = new p5.FFT();
  fft.setInput(sound);


}

function new_fft(){
  fft_new = new p5.FFT(0.8, 32);
  fft_new.setInput(sound);
}


function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.play();
      }
  }
function draw() {
   
    residueplot();
    residueplot2()
    rawplot()
    rawplot1();
}

function rawplot1(){
  beginShape();
  noFill();
  stroke(0,0,0);
  strokeWeight(1);
  waveform1 = fft.waveform();
for (var i = 0; i< waveform1.length; i++){
  var x = map(i, 0, waveform1.length, 0, 450);
  var y = map( waveform1[i], 1, -1, 200, 0);
vertex(x,y);
}
endShape();
}

function rawplot(){
    beginShape();
    noFill();
    stroke(0,0,0);
    strokeWeight(1);
    waveform = fft_new.waveform();
for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 500, 1000);
    var y = map( waveform[i], 1, -1, 5, 200);
  vertex(x,y);
}
  endShape();
}


function residueplot(){
  stroke(0,0,0);
  beginShape()
  noFill();
var timeDomain = fft.waveform(2048, 'float32');
var corrBuff = autoCorrelate(timeDomain);
for (var j = 0; j < corrBuff.length; j++) {
  var w = map(j, 0, corrBuff.length, 0, 500);
  var h = map(corrBuff[j], -1, 1, 500, 200);
  vertex(w,h);
}
endShape();
}

function residueplot2(){
  beginShape();
  noFill();
  stroke(0,0,0);
  strokeWeight(1);
let spectrum = fft.analyze();
for (var i = 0; i< spectrum.length; i++){
      var x = map(i, 0, spectrum.length, 500, 1000);
      var y = map( spectrum[i], 250, 0, 200, 400);
      vertex(x,y);
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

  