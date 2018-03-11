var player = document.getElementById("mp3-player");
var visualizer = player.children[0];
    visualizer.width = player.offsetWidth;
    visualizer.height = player.offsetHeight;

var ctx = visualizer.getContext("2d");
var audioBox = player.children[1];

var analyser, audioCtx, source;
var samples = [
    "samples/Arctic Monkeys – Do I Wanna Know_.mp3",
    "samples/Gary Clark Jr. – Come Together.mp3",
    "samples/The Who – My Generation.mp3",
    "samples/The Damned – Neat Neat Neat.mp3"
];



function nextSample(t) {
    var newSample = samples[Math.round(Math.random()*3)];
    while(decodeURIComponent(t.src)==window.location+newSample) {
        newSample = samples[Math.round(Math.random()*3)];
    }
    t.src = newSample;
    t.play();
}

visualizer.onclick = function() {
    nextSample(audioBox.children[0]);
};
audioBox.children[0].onended = function() {
    nextSample(audioBox.children[0]);
};

window.onload = initMp3Player;
function initMp3Player() {
    nextSample(audioBox.children[0]);
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audioBox.children[0]);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    visualize();
}

function visualize() {
    window.requestAnimationFrame(visualize);

    var fbc = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.shadowBlur = 0;
    ctx.fillRect(0, 0, visualizer.width, visualizer.height);
    ctx.fillStyle = "red";
    ctx.shadowColor = "red";
    ctx.shadowBlur = 3;
    var cols = 50;
    var offset = 13;
    colWidth = (visualizer.width+offset-offset*cols)/cols;
    for (var i=0;i<cols;++i) {
        colx = i*(colWidth + offset);
        colHeight = Math.min(-(fbc[i]), 0)*1.5;
        ctx.fillRect(colx, visualizer.height, colWidth, colHeight);
    }
}
