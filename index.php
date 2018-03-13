<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Mp3player by Z2z</title>
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <script>
            var samples = [
                <?php
                    $dir = "samples";
                    $samples = opendir($dir);
                    while (($file = readdir($samples))!==false) {
                        if (!is_dir($file)) {
                            echo "\"$file\",\n";
                        }
                    }
                ?>
            ];
        </script>
    </head>
    <body>
        <header></header>
        <div id="subheader"></div>
        <main>
            <div id="mp3-player">
                <canvas id="audio-visualizer"></canvas>
                <div id="audio-box">
                    <audio controls loop></audio>
                    <div id="playlist">
                        <select id="player-navigator">
                            <script>
                                samples.forEach(function(e) {
                                    document.write("<option value='samples/"+e+"'>"+e+"</option>");
                                });
                            </script>
                        </select>
                    </div>
                    <div id="upload-navigator">
                        <input id="uploadMp3" type="file" accept=".mp3"/>
                        <button onclick = "uploadMp3File()">Upload</button>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <script src="scripts/main.js"></script>
            <script>
                document.getElementById("player-navigator").onchange = function() {
                    audioBox.children[0].src = this.value;
                    audioBox.children[0].play();
                };

                function uploadMp3File() {
                    var uploadMp3 = document.getElementById("uploadMp3");
                    if (uploadMp3.files.length===0) {
                        alert("invalid file");
                    }
                    else if (uploadMp3.files[0].type === "audio/mp3") {

                    }
                }
            </script>
        </footer>
    </body>
</html>
