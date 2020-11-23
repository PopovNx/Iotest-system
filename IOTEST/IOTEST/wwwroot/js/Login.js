var app = new Vue({
    el: "#app",
    data: {

    },
    methods: {
        onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            var Data = new FormData();
            Data.append('method', 'AuchGoogle');
            Data.append('GivenName', profile.getGivenName());
            Data.append('FamilyName', profile.getFamilyName());
            Data.append('ImageURL', profile.getImageUrl());
            Data.append('Email', profile.getEmail());
            Data.append('IDToken', googleUser.getAuthResponse().id_token);
            axios.post('/method', Data).then(() => location = location); 
        }
    },
    mounted() {
        gapi.load('auth2', function () {
           var auth2 = gapi.auth2.init({
                client_id: '568231728412-9mu2l70s8c878a4gn4up9t9qjpgol360.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            });
            auth2.attachClickHandler(document.getElementById('BtnGoogle'), {}, app.onSignIn, function (error) {
                alert(JSON.stringify(error, undefined, 2));
            });
        });
    }
})
