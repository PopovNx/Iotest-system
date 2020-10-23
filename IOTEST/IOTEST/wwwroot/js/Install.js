var app = new Vue({
    el: "#app",
    data: {
        seen: true
    },
    mounted() {
      
    }
})

var canvasDiv = document.getElementById('canvAn1');
var options = {
    particleColor: '#0fffff',
    background: "#0f0f0f",
    interactive: true,
    density: 9000,

};
var particleCanvas = new ParticleNetwork(canvasDiv, options);
