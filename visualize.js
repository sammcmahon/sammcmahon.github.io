var gridSize = 128;

// Setup audio
var listener = new THREE.AudioListener();

var sound = new THREE.Audio(listener);

// Get audio path from query string if there
var audioPath = 'audio/annoying.wav';
var searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('audio')) {
    audioPath = searchParams.get('audio');
}

var audioLoader = new THREE.AudioLoader();
audioLoader.load(audioPath, function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
});

var analyser = new THREE.AudioAnalyser(sound, gridSize * 16);

// Setup view scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 1.5;
camera.add(listener);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild(renderer.domElement);

var texture = new THREE.TextureLoader().load('texture.jpg');

// Setup geometry and texture
var geometry = new THREE.PlaneGeometry(1, 1, gridSize, gridSize);
var material = new THREE.MeshBasicMaterial({map: texture});

plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.z = Math.PI / 2;

function animate() {
    requestAnimationFrame(animate);
    var freqData = analyser.getFrequencyData();
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            plane.geometry.vertices[i * gridSize + j].z = freqData[i] / 256;
        }
    }
    plane.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);
}

animate();
