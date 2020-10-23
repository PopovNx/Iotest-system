var app = new Vue({
    el: "#app",
    data: {
        deferredPrompt: null,
        IsIphone: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    },
    methods: {
        InstallClick() {
            if (this.IsIphone) new bootstrap.Modal(document.getElementById('guide')).show();
            else this.deferredPrompt.prompt();


        }
    },
    created() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
        window.addEventListener("appinstalled", () => {
            console.log("instaled")
            this.deferredPrompt = null;
        });
    },
    mounted() {
    }
})

