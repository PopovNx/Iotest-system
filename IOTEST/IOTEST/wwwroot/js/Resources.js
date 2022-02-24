const app = new Vue({
    el: "#app",
    data: {
        imgSelect: null,
        imgFile: null,
        imgBase64: "",
        ResName:""
    },
    methods: {
        LoadImg() {
            const files = this.$refs.picInp.files;
            if (files.length !== 1) return;
            this.imgFile = files[0];
        },
        AddRes(){
            const tx = this.ResName;
   
        }
    },
    watch: {
        imgFile: function (e) {
            
            const reader = new FileReader();
            reader.onload=(e)=> this.imgBase64 = e.target.result
            reader.readAsDataURL(this.imgFile);
        }
    },
    computed: {},
    async mounted() {

    }
});
