'use strict';

/* Directives */
var quizDirectives = angular.module('quizDirectives', ['quizServices']);

quizDirectives.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'partials/quiz.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.score = {};
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = {};
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.group = q.group;
					if (scope.score[q.group] == null) {
						scope.score[q.group] = "";
					}
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score[scope.group] = scope.score[scope.group] + '1';
					scope.correctAns = true;
				} else {
					scope.score[scope.group] = scope.score[scope.group] + '0';
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

quizDirectives.factory('quizFactory', ['Questions', function(QuestionService) {
	var questions = QuestionService.query();
	console.log(questions);
	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
}]);