angular.module('myApp')
    .controller('settingsController', function ($scope) {


//SETTINGS
$scope.toggleTheme = function (theme, text) {
    console.log("theme colour: " + theme);
    console.log("text color" + text);
    //BACKGROUND
    document.getElementById("navbar").style.backgroundColor = theme;
    document.getElementById("hamburger").style.backgroundColor = theme;
    document.getElementById("body").style.backgroundColor = theme;
    document.getElementById("imageViewModal").style.backgroundColor = theme;
    //TEXT
    document.getElementById("navbar").style.color = text;
    document.getElementById("hamburger").style.color = text;
    document.getElementById("body").style.color = text;
    document.getElementById("imageViewModal").style.color = text;
    
    document.getElementById("home-navbar").style.color = text;
    document.getElementById("image-navbar").style.color = text;
    document.getElementById("video-navbar").style.color = text;
    document.getElementById("audio-navbar").style.color = text;
    document.getElementById("register-navbar").style.color = text;
    document.getElementById("settings-navbar").style.color = text;
    document.getElementById("editor-navbar").style.color = text;
    document.getElementById("upload-navbar").style.color = text;
    document.getElementById("login-navbar").style.color = text;
    document.getElementById("account-navbar").style.color = text;
    document.getElementById("logout-navbar").style.color = text;
    document.getElementById("commentdiv").style.color = 'black';
};
    
});