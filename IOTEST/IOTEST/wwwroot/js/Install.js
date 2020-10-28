var app = new Vue({
    el: "#app",
    data: {
        deferredPrompt: null,
        IsIphone: /iPhone|iPad|iPod/i.test(navigator.userAgent),
        InstYet: false,
    },
    methods: {
        InstallClick() {
            if (this.IsIphone) new bootstrap.Modal(document.getElementById('guide')).show();
            else this.deferredPrompt.prompt();
        },
        ToWeb() {
            Cookies.set("Web", true, { expires: 228 });
            location.href = "/login";
        }
    },
    created() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
        window.addEventListener("appinstalled", () => {
            location.href = "/login";
            this.deferredPrompt = null;
        });
    },
    mounted() {
        setTimeout(() => {
            app.InstYet = (app.deferredPrompt == null && !app.IsIphone)
            console.log(app.InstYet);
        },100);

    }
})

