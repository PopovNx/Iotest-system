const app = new Vue({
    el: "#app",
    data: {
        needRegister: false,
        code: "",
    },
    methods: {
        GotoModel() {
            location.href = "/test?" + this.code;
        }
    },
    mounted() {

    }
});