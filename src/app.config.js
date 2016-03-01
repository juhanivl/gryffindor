angular.module('myApp')

.config(function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/ˆ\s*(https?|ftp|mailto|coui|data|file):/);
   });