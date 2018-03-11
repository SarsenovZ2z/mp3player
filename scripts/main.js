var player = document.getElementById("mp3-player");
var audioBox = document.getElementById("audio-box");
var audio = new Audio();
    audio.src = "samples/The Damned – Neat Neat Neat.mp3";
    audio.controls = true;
    audio.loop = true;
    audio.autoplay = true;

var context, analyser, canvas, ctx, source;
window.onload = function() {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    audioBox.appendChild(audio);
    context = new AudioContext();
    analyser =  context.createAnalyser();
    canvas = document.getElementById("audio-analyser");
    ctx = canvas.getContext("2d");

    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
}

function frameLooper() {
    window.requestAnimationFrame(frameLooper);
    var fbc  = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc);
//    console.log(fbc);
}
