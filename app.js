var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
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

app.factory('quizFactory', function() {
	var questions = [
		{
			question: 'Страна с наибольшим населением?',
			options: ['Индия', 'США', 'Китай', 'Россия'],
			group: '1',
			answer: 2
		},
		{
			question: "В аком году закончилась вторая мировая война?",
			options: ["1945", "1939", "1944", "1942"],
			group: '1',
			answer: 0
		},
		{
			question: "В какой стране появились первые бумажные деньги?",
			options: ["США", "Франция", "Италия", "Китай"],
			group: '2',
			answer: 3
		},
		{
			question: "В каком городе проводились летние олимпийские игры 1996 года?",
			options: ["Атланта", "Сидней", "Афины", "Пекин"],
			group: '2',
			answer: 0
		},
		{	
			question: "Кто изобрел телефон?",
			options: ["Альберт Эйнштейн", "Александр Грехем Белл", "Исаак Ньютон", "Мария Кюри"],
			group: '2',
			answer: 1
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});