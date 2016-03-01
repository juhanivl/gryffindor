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
};
    
});