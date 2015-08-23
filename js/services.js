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
                if (user.thirdname == null) {
                    return user.name + ' ' + user.secondname;
                }
                return user.name + ' ' + user.secondname + ' ' + user.thirdname;
            },
            getWork: function () {
                if(user.profession != null) {
                    return user.profession;
                }
                return '';
            },
            getInterest: function () {
                if (user.interest != null) {
                    return user.interest;
                }
                return '';
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
