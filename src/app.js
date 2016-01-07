angular.module('myApp', ['myModule'])
.controller('GreetingsController', function () {
  this.greeting = "Hello, you!";
  this.who = "Angular";
});