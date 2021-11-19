const app = new Vue({
    el: "#app",
    data: {
        deferredPrompt: -1,
        IsIphone: /iPhone|iPad|iPod/i.test(navigator.userAgent),
        InstYet: false,
    },
    methods: {
        InstallClick() {
            if (this.IsIphone) new bootstrap.Modal(document.getElementById('guide')).show();
            else this.deferredPrompt.prompt();
        },
        ToWeb() {
            Cookies.set("Web", true, {expires: 228});
            location.href = "/login";
        }
    },
    created() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            this.deferredPrompt = e;
            app.InstYet = false;
        });
        window.addEventListener("appinstalled", (e) => {
            location.href = "/login";
            this.deferredPrompt = null;
            app.InstYet = true;
        });
    },
    mounted() {
        setTimeout(() => {
            app.InstYet = (app.deferredPrompt ===-1 && !app.IsIphone)
        }, 100);
    }
});