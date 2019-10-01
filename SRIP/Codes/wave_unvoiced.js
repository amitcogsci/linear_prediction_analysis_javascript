   var buttons = {
        play: document.getElementById("btn-play"),
    };
var Spectrum = WaveSurfer.create({
        container: '#audio-spectrum',
        progressColor: "#03a9f4",
        waveColor:"#03a9f4"
    });
buttons.play.addEventListener("click", function(){
        Spectrum.play();
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

Spectrum.on('ready', function () {
       
         Spectrum.enableDragSelection({
             color: 'hsla(400, 100%, 30%, 0.1)',
             resize: true,
            });
      });
Spectrum.on('region-click', function(region, e) {
            e.stopPropagation();
            Spectrum.play(region.start, region.end);
            });
Spectrum.load('unvoiced_sample.wav');