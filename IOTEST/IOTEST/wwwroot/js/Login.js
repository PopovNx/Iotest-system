var app = new Vue({
    el: "#app",
    data: {

    },
    methods: {
      
    },
    mounted() {
        gapi.load('auth2', function () {
            auth2 = gapi.auth2.init({
                client_id: '568231728412-9mu2l70s8c878a4gn4up9t9qjpgol360.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            });
            attachSignin(document.getElementById('BtnGoogle'));
        });
    }
})
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {}, onSignIn, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}