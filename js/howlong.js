function MathsGame() {
    this.questions = [];
    this.currentQuestion = 0;
    this.wrongAnswers = [];
}

/**
 * Start the game, write a new question to the screen.
 */
MathsGame.prototype.start = function() {
        this.writeNewQuestion();
};

/**
 * check the users answer is a number and
 * check to see if it is the correct answer 
 */
MathsGame.prototype.checkAnswer = function() {
    if (this.questions[this.questions.length - 1].userAnswer != this.questions[this.questions.length - 1].answer) {
        console.log('wrong answer, oops');
        this.finish();
        
        return false;
    }
    if (isNaN(this.questions[this.questions.length - 1].userAnswer)) { 
        
        return false;
    }
    
    return true;
}

/**
 * save the answer that the user types.
 */
MathsGame.prototype.saveAnswer = function() {
    this.questions[this.questions.length - 1].userAnswer = parseInt($('#challenge input').val());
};

/**
 * clear the current question and values
 * and then write a new question to the page.
 */
MathsGame.prototype.writeNewQuestion = function() {
    $('#challenge input').val('');
    this.questions.push(new Question());
    $('#challenge label').html(this.questions[this.currentQuestion].questionString());
    this.currentQuestion++;
};

/**
 * after the game has started use next question to reset everything, validate the
 * users input and write the next question.
 */
MathsGame.prototype.nextQuestion = function() {
    this.saveAnswer();
    if (this.checkAnswer()) {
        this.writeNewQuestion(); 
    }
};

/**
 * at any point you can finish the game, and this hides everything and shows
 * the score you got.
 */
MathsGame.prototype.finish = function() {
    $('#challenge').hide();
    var results = '';
    for (var i = 0; i < this.amountQuestions; i++) {
        if (this.questions[i].answer != this.questions[i].userAnswer) {
            this.wrongAnswers.push(i);
            results = results + '#'+(i+1) + ' - ' + this.questions[i].questionString() + ' = ' + this.questions[i].answer + '. Your answer: ' + this.questions[i].userAnswer + '<br>';
        }
    }
    results = results + '<br> NOPE, ' + this.questions[(this.currentQuestion-1)].questionString() + ' is ' + this.questions[(this.currentQuestion-1)].answer;
    results = results + '<br> You put: ' + this.questions[(this.currentQuestion-1)].userAnswer;
    results = results + '<br> You scored: ' + (this.currentQuestion-1);
    $('#result').html(results);
};

/**
 * get current seconds of the system
 */
MathsGame.prototype.getCurrentSeconds = function() {
    return new Date().getTime();
}

$(function(){
    var mathsGame = new MathsGame();

    $("body").keypress(function(e) {
        if (e.which == 32) {
            mathsGame.start();
        }
        if (e.which == 13) {
            mathsGame.nextQuestion();
        }
    });
});
