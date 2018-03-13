var player = document.getElementById("mp3-player");
var visualizer = player.children[0];
    visualizer.width = window.innerWidth;
    visualizer.height = window.innerHeight;

var ctx = visualizer.getContext("2d");
var audioBox = player.children[1];

var analyser, audioCtx, source;

window.addEventListener("load", initMp3Player, false);
function initMp3Player() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audioBox.children[0]);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    document.getElementById("player-navigator").value = "samples/The Jon Spenser Blues Explosion – Bellbottoms.mp3";
    audioBox.children[0].src = "samples/The Jon Spenser Blues Explosion – Bellbottoms.mp3";
    audioBox.children[0].play();
    visualize();
}

function visualize() {
    requestAnimationFrame(visualize);

    var fbc = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc);

    if (detectmob()) {
        ctx.clearRect(0, 0, visualizer.width, visualizer.height);
    }
    else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(0, 0, visualizer.width, visualizer.height);
    }

    var cols = 300;
    if (detectmob()) {
        cols = 40;
    }
    colWidth = 0.3;
    var offset = (visualizer.width-cols*colWidth)/(cols+1);
    var k = (visualizer.height*2/3)/255;

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

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();



function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ) {
    return true;
  }
 else {
    return false;
  }
}
