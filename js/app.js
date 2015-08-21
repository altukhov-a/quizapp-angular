var app = angular.module('quizApp', ['ngRoute', 'quizServices', 'quizControllers', 'quizDirectives']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/quiz/:userId', {
        templateUrl: 'template.html',
        controller: 'QuizListCtrl'
      }).
      when('/register', {
        templateUrl: 'welcome.html',
        controller: 'UserFormCtrl'
      }).
      when('/quiz/:result', {
        templateUrl: 'result.html',
        controller: 'QuizResultCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
