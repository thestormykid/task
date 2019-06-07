window.forum = angular.module('myApp', ['ui.bootstrap', 'ngAnimate', 'ui.router']);


forum.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './app/templates/home.html',
            controller: 'homeCtrl'
        })

}])