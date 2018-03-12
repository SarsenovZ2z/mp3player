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
    "samples/The Damned – Neat Neat Neat.mp3",
    "samples/Barry White – Never, Never Gonna Give Ya Up.mp3",
    "samples/Foster The People – Pumped up Kicks.mp3",
    "samples/Linkin Park – In The End.mp3",
    "samples/Nirvana – Smells like teen spirit (Original).mp3",
    "samples/Queen – Brighton Rock.mp3",
    "samples/The Jon Spenser Blues Explosion – Bellbottoms.mp3"
];



function nextSample(t) {
    var len = samples.length-1;
    var newSample = samples[Math.round(Math.random()*len)];
    while(decodeURIComponent(t.src)==window.location+newSample) {
        newSample = samples[Math.round(Math.random()*len)];
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

window.addEventListener("load", initMp3Player, false);
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

    if (detectmob()) {
        ctx.clearRect(0, 0, visualizer.width, visualizer.height);
    }
    else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(0, 0, visualizer.width, visualizer.height);
    }

    var cols = 100;
    if (detectmob()) {
        cols = 40;
    }
    colWidth = 3;
    var offset = (visualizer.width-cols*colWidth)/(cols+1);
    var k = (visualizer.height/2)/255;

    ctx.strokeStyle = "black";
    ctx.lineWidth = colWidth;
    ctx.beginPath();
    for (var i=0;i<cols;++i) {
        colx = i*(colWidth + offset)+offset;
        colHeight = -k*fbc[i];
        if (colHeight<0) {
            ctx.moveTo(colx, visualizer.height);
            ctx.lineTo(colx, visualizer.height+colHeight);
        }
    }
    ctx.stroke();
}

function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
