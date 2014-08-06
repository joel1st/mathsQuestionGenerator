	var settings = {

	};
	var numFactory = {
		easy: function(addOrSub){
			return addOrSub ? Math.floor(Math.random()*10) : Math.floor(Math.random()*5) + 1;
		},
		medium: function(addOrSub){
			return addOrSub ? Math.floor(Math.random()*30)+5 : Math.floor(Math.random()*10)+2;
		},
		hard: function(addOrSub){
			return addOrSub ? Math.floor(Math.random()*120)+10 : Math.floor(Math.random()*25)+2;
		}
	};

	var questionGenerator = {
		addition: function(type){
			var val1 = numFactory[type](true),
				val2 = numFactory[type](true);
			return {
				question: val1 + ' + ' + val2 + " = ",
				answer: val1 + val2
			};	
		},
		subtraction: function(type){
			var val1 = numFactory[type](true),
				val2 = numFactory[type](true);
			return {
				question: val1 + ' - ' + val2 + " = ",
				answer: val1 - val2
			};	
		},
		multiply: function(type){
			var val1 = numFactory[type](true),
				val2 = numFactory[type](true);
			return {
				question: val1 + ' * ' + val2 + " = ",
				answer: val1 * val2
			};	
		},
		division: function(type){
			var value1 = numFactory[type](true),
				value2 = numFactory[type](true),
				value3 = value1 * value2; // to ensure divided item is a whole number
			return {
				question: value3 + ' / ' + value2 + " = ",
				answer: value3 / value2
			};
		}
	};

	var quizLogic = {
		startQuiz : function(arithmetic, difficulty){
			console.log("You have 2 minutes to answer as many questions as possible!");
			settings.currentGame = [];
			settings.difficulty = difficulty;
			settings.arithmetic = arithmetic;
			this.createQuestion();
			setTimeout(this.quizOver, 1000*60*.2);
		},
		createQuestion : function(){
			settings.currentQuestion = questionGenerator[settings.arithmetic](settings.difficulty);
			console.log(settings.currentQuestion.question);
		},
		testAnswer: function(answer){
			var answer = settings.currentQuestion.answer === answer;
			settings.currentGame.push(answer);
			console.log(answer + ' ' + settings.currentQuestion.answer);
			this.createQuestion();
		},
		quizOver : function(){
			var gameAnswers = settings.currentGame.length;
			var correct = settings.currentGame.reduce(function(prev, current){
				return prev + ((current) ? 1 : 0); 
			}, 0)
			console.log("You answered "+ gameAnswers + "questions, with an accuracy of :" + (correct/gameAnswers) + ' ' + correct+'/'+gameAnswers);
			settings = {};
			console.log("Want to start again?");
		}

	}