'use strict';

/* Services */

var questionServices = angular.module('questionServices', ['ngResource']);

questionServices.factory('Question', ['$resource',
  function($resource){
    return $resource('questions/questions.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
