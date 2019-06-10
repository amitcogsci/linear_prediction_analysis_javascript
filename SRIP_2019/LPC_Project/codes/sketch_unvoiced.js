var button;
var cnv;
var waveform;

function preload(){
    sound = loadSound('/media/unvoiced.wav');
  }
  
  function setup(){
    cnv = createCanvas(600,200);
    background(0);
    button = createButton('generate')
    button.mouseClicked(togglePlay)
    fft = new p5.FFT();
    textSize(10);
  fill(255, 255, 255);
  text('amplitude values along the time domain for unvoiced sound sample' , 10, 12);
  }
   
  
  function draw(){
    beginShape();
    waveform = fft.waveform();
    noFill();
    stroke(255,0,0); 
    strokeWeight(1);
    
    for (var i = 0; i< waveform.length; i++){
      var x = map(i, 0, waveform.length, 0, width);
       var y = map( waveform[i], -1, 1, 0, height);
    
      vertex(x,y);
      

    }
    
    
    endShape();
  } 

      
  

  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.play();
    }
  }
    