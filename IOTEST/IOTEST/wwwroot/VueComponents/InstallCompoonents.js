Vue.component('backganim', {
    template: '<div id="canvAn1"></div>',
    mounted: function () {
        var canvasDiv = document.getElementById('canvAn1');
        var options = {
            particleColor: '#0fffff',
            background: "#0f0f0f",
            interactive: true,
            density: 9000,

        };
        var particleCanvas = new ParticleNetwork(canvasDiv, options);
    },
})
