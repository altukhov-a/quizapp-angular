'use strict';

/* Controllers */

var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('QuizListCtrl', ['$scope',
  function($scope) {
  }
]);

quizControllers.controller('UserFormCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.user = {};

    $scope.update = function(user) {
      $scope.user = angular.copy(user);
    };
    $http.get('partials/quiz.html').success(function(data) {

    });
  }
]);

quizControllers.controller('QuizResultCtrl', ['$scope',
  function($scope) {
  }
]);
