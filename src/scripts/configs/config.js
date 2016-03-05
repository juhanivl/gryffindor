angular.module('myApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'AjaxCtrl'
            })
            .when('/images', {
                templateUrl: 'views/images.html',
                controller: 'AjaxCtrl'
            })
            .when('/audios', {
                templateUrl: 'views/audios.html',
                controller: 'AjaxCtrl'
            })
            .when('/videos', {
                templateUrl: 'views/videos.html',
                controller: 'AjaxCtrl'
            })
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'AjaxCtrl'
            })
            .when('/myFiles', {
                templateUrl: 'views/userFiles.html',
                controller: 'AjaxCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });