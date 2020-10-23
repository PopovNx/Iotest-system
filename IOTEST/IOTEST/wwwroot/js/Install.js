var canvasDiv = document.getElementById('particle-canvas');
var options = {
    particleColor: '#0fffff',
    background: "#0f0f0f",
    interactive: true,
    density: 9000,
};
var particleCanvas = new ParticleNetwork(canvasDiv, options);