var isInstall = window.matchMedia('(display-mode: standalone)').matches;
if (isInstall == false && location.pathname != "/install") location.href = "/install";
if (isInstall == true && location.pathname == "/install") location.href = "/login";




if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => navigator.serviceWorker.ready.then((worker) => {
            worker.sync.register('syncdata');
        }))
        .catch((err) => console.log(err));
}


