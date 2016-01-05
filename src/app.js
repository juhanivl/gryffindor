angular.module('myApp', [])
.controller('GreetingsController', function () {
  this.greeting = "Hello, you!";
  this.who = "Angular";
});