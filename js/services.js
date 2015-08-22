'use strict';

/* Services */

var quizServices = angular.module('quizServices', ['ngResource']);

quizServices.factory('Questions', ['$resource',
        function ($resource) {
            return $resource('questions/questions.json', {}, {
                query: {method: 'GET', isArray: true}
            });
        }]
);

quizServices.factory('Score', ['$resource',
        function ($resource) {
            var score;
            return {
                getScore: function () {
                    return score;
                },
                setScore: function (value) {
                    score = value;
                }
            };
        }]
);
