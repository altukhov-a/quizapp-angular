'use strict';

/* Controllers */

var quizControllers = angular.module('quizControllers', ['quizServices']);

quizControllers.controller('UserFormCtrl', ['$scope', '$location',
    function UserFormCtrl($scope, $location) {
        $scope.user = {};

        $scope.update = function (user) {
            $scope.user = angular.copy(user);
            $scope.userId = user.name;
        };

        $scope.submit = function () {
            $location.path('/quiz/' + $scope.userId);
        };
    }
]);

quizControllers.controller('QuizListCtrl', ['$scope', '$routeParams', '$location', 'Questions', 'Score',
    function QuizListCtrl($scope, $routeParams, $location, Questions, Score) {
        $scope.userId = $routeParams.userId;
        var questions = Questions.query().$promise.then(
            //success
            function (value) {
                questions = value;
                console.info('questions ' + questions);
                $scope.id = 0;
                $scope.inProgress = true;
                $scope.score = {};
                $scope.getQuestion();
            },
            //error
            function (error) {/*Do something with error*/
            }
        );

        $scope.getQuestion = function () {
            console.info('$scope.id = ' + $scope.id);
            var q;
            if ($scope.id < questions.length) {
                q = questions[$scope.id];
            } else {
                q = false;
            }
            console.info(q);
            if (q) {
                $scope.question = q.question;
                $scope.options = q.options;
                $scope.answer = q.answer;
                $scope.group = q.group;
                if ($scope.score[q.group] == null) {
                    $scope.score[q.group] = "";
                }
                $scope.answerMode = true;
            } else {
                Score.setScore($scope.score);
                $location.path('/result/' + $scope.userId);
            }
        };

        $scope.checkAnswer = function () {
            if (!$('input[name=answer]:checked').length) return;

            var ans = $('input[name=answer]:checked').val();

            if (ans == $scope.options[$scope.answer]) {
                $scope.score[$scope.group] = $scope.score[$scope.group] + '1';
                $scope.correctAns = true;
            } else {
                $scope.score[$scope.group] = $scope.score[$scope.group] + '0';
                $scope.correctAns = false;
            }

            $scope.answerMode = false;
        };

        $scope.nextQuestion = function () {
            $scope.id++;
            $scope.getQuestion();
        }

    }
]);

quizControllers.controller('QuizResultCtrl', ['$scope', '$routeParams', 'Score',
    function QuizResultCtrl($scope, $routeParams, Score) {
        $scope.userId = $routeParams.userId;
        $scope.score = Score.getScore();
        console.info($scope.score);
    }
]);
