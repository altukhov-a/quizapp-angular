var app = angular.module('quizApp', ['ngRoute', 'quizServices', 'quizControllers']);

app.config(['$routeProvider',
    function ($routeProvider) {
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
            when('/report', {
                templateUrl: 'partials/report.html',
                controller: 'QuizReportCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
