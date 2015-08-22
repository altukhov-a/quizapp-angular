'use strict';

/* Controllers */

var quizControllers = angular.module('quizControllers', ['quizServices', 'chart.js', 'ngSanitize', 'ngCsv', 'firebase']);

quizControllers.controller('UserFormCtrl', ['$scope', '$location',
    function ($scope, $location) {
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
    function ($scope, $routeParams, $location, Questions, Score) {
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
                    $scope.score[q.group] = {
                        answers: [],
                        yes: 0,
                        no: 0
                    };
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
                $scope.score[$scope.group].answers.push(1);
                $scope.score[$scope.group].yes++;
                $scope.correctAns = true;
            } else {
                $scope.score[$scope.group].answers.push(0);
                $scope.score[$scope.group].no++;
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
    function ($scope, $routeParams, Score) {
        $scope.userId = $routeParams.userId;
        $scope.score = Score.getScore();
        $scope.labels = [];
        $scope.data = [[], []];
        for (var i in $scope.score) {
            $scope.labels.push(i);
            $scope.data[0].push($scope.score[i].no);
            $scope.data[1].push($scope.score[i].yes);
            console.info(i);
        }
        Chart.defaults.global.colours = [
            '#F7464A', // red
            '#46BFBD' // green
        ];
        $scope.series = ['Кол-во ошибочных ответов', 'Кол-во верных ответов'];

        $scope.getArray = [{a: 1, b: 2}, {a: 3, b: 4}];
        $scope.getHeader = function () {
            return ["ФИО", "B"]
        };
    }
]);


quizControllers.controller('QuizReportCtrl', ['$scope',
    function ($scope) {
        $scope.getArray = [{a: 'test1', b: 2}, {a: 'test3', b: 4}];
        $scope.getHeader = function () {
            return ['ФМО', 'Профессия', 'Интересы', 'Ответы']
        };
    }
]);
