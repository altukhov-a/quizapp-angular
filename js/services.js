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

quizServices.service('User',
    function () {
        var user = {
            name: '',
            secondname: '',
            thirdname: '',
            profession: '',
            interest: ''
        };
        return {
            getUser: function () {
                return user;
            },
            setUser: function (value) {
                user = value;
            },
            getFIO: function () {
                return user.name + ' ' + user.secondname + ' ' + user.thirdname;
            },
            getWork: function () {
                return user.profession;
            },
            getInterest: function () {
                return user.interest;
            }
        };
    });

quizServices.service('Score',
    function () {
        var score;
        return {
            getScore: function () {
                return score;
            },
            setScore: function (value) {
                score = value;
            }
        };
    });
