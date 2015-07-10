'use strict';

/* Services */

var quizServices = angular.module('quizServices', ['ngResource']);

quizServices.factory('Questions', ['$resource',
  function($resource){
	console.log("beep");
    return $resource('questions/questions.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
