window.forum = angular.module('myApp', ['ui.bootstrap', 'ngAnimate', 'ui.router']);

forum.config( function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('forum', {
            url: '/',
            templateUrl: 'app/templates/comment.html',
            controller: 'commentCtrl'
        })
        .state('signIn', {
            url: '/signIn',
            templateUrl: 'app/templates/signin.html',
            controller: 'userRegisterCtrl'
        })
        .state('signUp', {
            url: '/signUp',
            templateUrl: 'app/templates/signup.html',
            controller: 'userRegisterCtrl'
        })
})


forum.controller('mainCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {

    $rootScope.containsUser = localStorage.getItem('token');

    $scope.logout = function() {
        localStorage.setItem('token', "");
        $rootScope.containsUser = "";
        $location.path('/signIn');

    }

    $rootScope.setUser = function(token) {
        var token = token;
        $rootScope.containsUser = true;
        localStorage.setItem('token', token);
        $location.path('/')
    }

}])
