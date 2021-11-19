if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => navigator.serviceWorker.ready.then((worker) => {
            worker.sync.register('syncdata');
        }))
        .catch((err) => console.log(err));
}
const LoadBackground = ()=>{
    const canvasDiv = document.getElementById('Background');
    const options = {
        particleColor: '#0fffff',
        background: "#0f0f0f",
        interactive: true,
        density: 6000,  };
    const particleCanvas = new ParticleNetwork(canvasDiv, options)
}
