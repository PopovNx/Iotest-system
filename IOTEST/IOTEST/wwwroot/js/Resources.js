const app = new Vue({
    el: "#app",
    data: {
        imgSelect: null,
        imgFile: null,
        imgBase64: "",
        ResName: ""
    },
    methods: {
        LoadImg() {
            const files = this.$refs.picInp.files;
            if (files.length !== 1) return;
            this.imgFile = files[0];
        },
        async AddRes() {
            const tx = this.ResName;
            const fx = this.imgFile;
            const Data = new FormData();
            Data.append('method', 'AddResource');
            Data.append('Name', tx);
            Data.append('Image', fx);
            const result = await axios.post('/method', Data, {headers: {'Content-Type': 'multipart/form-data'}});
        }
    },
    watch: {
        imgFile: function (e) {
            const reader = new FileReader();
            reader.onload = (e) => this.imgBase64 = e.target.result
            reader.readAsDataURL(e);
        }
    }
});
