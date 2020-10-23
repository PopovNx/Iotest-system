Vue.component('backganim', {
    template: '<div id="canvAn1" class="BackD1"></div>',
    mounted: function () {
        var canvasDiv = document.getElementById('canvAn1');
        var options = {
            particleColor: '#0fffff',
            background: "#0f0f0f",
            interactive: true,
            density: 6000,
        };
        var particleCanvas = new ParticleNetwork(canvasDiv, options);
    },
})
