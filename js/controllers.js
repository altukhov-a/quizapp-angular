'use strict';

/* Controllers */

var quizControllers = angular.module('quizControllers', ['quizServices', 'chart.js', 'ngSanitize', 'ngCsv', 'firebase']);

quizControllers.controller('UserFormCtrl', ['$scope', '$location', 'User',
    function ($scope, $location, User) {
        $scope.user = {};

        $scope.update = function (user) {
            $scope.user = angular.copy(user);
            User.setUser($scope.user);
        };

        $scope.submit = function () {
            $location.path('/quiz');
        };
    }
]);

quizControllers.controller('QuizListCtrl', ['$scope', '$location', '$firebaseArray', 'Questions', 'Score', 'User',
    function ($scope, $location, $firebaseArray, Questions, Score, User) {
        $scope.answerMode = true;
        var questions = Questions.query().$promise.then(
            //success
            function (value) {
                questions = value;
                console.info('questions ' + questions);
                $scope.id = 0;
                $scope.inProgress = true;
                $scope.score = {};
                $scope.result = '';
                $scope.getQuestion();
            },
            //error
            function (error) {/*Do something with error*/
            }
        );

        $scope.getQuestion = function () {
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
                var ref = new Firebase("https://quizweb.firebaseio.com/records");
                var dbData = $firebaseArray(ref);
                dbData.$add({
                    FIO: User.getFIO(),
                    Work: User.getWork(),
                    Interest: User.getInterest(),
                    Result: $scope.result
                });
                $location.path('/result');
            }
        };

        $scope.checkAnswer = function () {
            if (!$('input[name=answer]:checked').length) return;

            var ans = $('input[name=answer]:checked').val();

            if (ans == $scope.options[$scope.answer]) {
                $scope.result = $scope.result + '1';
                $scope.score[$scope.group].answers.push(1);
                $scope.score[$scope.group].yes++;
                $scope.correctAns = true;
            } else {
                $scope.result = $scope.result + '0';
                $scope.score[$scope.group].answers.push(0);
                $scope.score[$scope.group].no++;
                $scope.correctAns = false;
                $scope.ans = $scope.options[$scope.answer];
            }

            $scope.answerMode = false;
        };

        $scope.nextQuestion = function () {
            $scope.id++;
            $scope.getQuestion();
        }

    }
]);

quizControllers.controller('QuizResultCtrl', ['$scope', 'Score',
    function ($scope, Score) {
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
    }
]);


quizControllers.controller('QuizReportCtrl', ['$scope', '$firebaseArray',
    function ($scope, $firebaseArray) {
        var ref = new Firebase("https://quizweb.firebaseio.com/records");
        var dbData = $firebaseArray(ref);
        dbData.$loaded()
            .then(function () {
                console.info(dbData);
                $scope.getArray = [];
                for (var i in  dbData) {
                    $scope.getArray.push({
                        a: dbData[i].FIO,
                        b: dbData[i].Work,
                        c: dbData[i].Interest,
                        d: dbData[i].Result
                    });
                }
                $scope.getHeader = function () {
                    return ['ФИО', 'Профессия', 'Интересы', 'Ответы']
                };
            })
            .catch(function (err) {
                console.error(err);
            });
    }
]);
