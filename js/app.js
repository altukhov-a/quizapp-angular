var app = angular.module('quizApp', ['ngRoute', 'quizServices', 'quizControllers']);

app.config(['$routeProvider',
    function ($routeProvider) {
        //noinspection JSUnresolvedFunction
        $routeProvider.
            when('/', {
                templateUrl: 'partials/welcome.html',
                controller: 'UserFormCtrl'
            }).
            when('/quiz/:userId', {
                templateUrl: 'partials/quiz.html',
                controller: 'QuizListCtrl'
            }).
            when('/result/:userId', {
                templateUrl: 'partials/result.html',
                controller: 'QuizResultCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
