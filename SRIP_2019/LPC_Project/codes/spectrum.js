var spectrum;


var buttons = {
    play: document.getElementById("btn-play"),
    
};

var Spectrum = WaveSurfer.create({
    container: '#spectrum',
    waveColor: '0',
    progressColor: "0"
});

buttons.play.addEventListener("click", function(){
    Spectrum.play();

    buttons.pause.disabled = false;
    buttons.play.disabled = true;
}, false);


Spectrum.on('ready', function () {
    buttons.play.disabled = false;
});

window.addEventListener("resize", function(){
    var currentProgress = Spectrum.getCurrentTime() / Spectrum.getDuration();

   
    Spectrum.empty();
    Spectrum.drawBuffer();
    
    Spectrum.seekTo(currentProgress);


    buttons.play.disabled = false;

}, false);


Spectrum.load('spectrum')


 