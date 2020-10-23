var app = new Vue({
    el: "#app",
    data: {
        deferredPrompt: null
    },
    methods: {
        InstallClick() {
            this.deferredPrompt.prompt();
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

