function MathsGame() {
    this.questions = [];
    this.currentQuestion = 0;
    this.wrongAnswers = [];
    this.started = false;
    this.timerId = 0;
}

/**
 * Start the game, write a new question to the screen.
 */
MathsGame.prototype.start = function() {
    if (!this.started) {    
        this.writeNewQuestion();
        this.started = true;
        
        self = this;
        this.timerId = setInterval(function(){self.tick()}, 1000);
    }
};

MathsGame.prototype.tick = function() {
    console.log('tick');
    if (this.questions[this.currentQuestion - 1].timeLimit) {
        this.questions[this.currentQuestion - 1].timeLimit --;
        console.log(this.questions[this.currentQuestion - 1].timeLimit);
        
        if (this.questions[this.currentQuestion - 1].timeLimit <= 0){
            this.finish(2);
            clearInterval()
        }
    }
}

/**
 * check the users answer is a number and
 * check to see if it is the correct answer 
 */
MathsGame.prototype.checkAnswer = function() {
    if (this.questions[this.questions.length - 1].userAnswer != this.questions[this.questions.length - 1].answer) {
        console.log('wrong answer, oops');
        this.finish(1);
        
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
    
    if (isNaN(this.questions[this.questions.length - 1].userAnswer)) { 

        return false; //the user has entered a non numeric number, do nothing.
    }
    
    return true;
};

/**
 * clear the current question and values
 * and then write a new question to the page.
 */
MathsGame.prototype.writeNewQuestion = function() {
    $('#challenge input').val('');
    this.questions.push(new Question()); //file is included to handle generation of a question object
    $('#challenge label').html(this.questions[this.currentQuestion].questionString());
    this.currentQuestion++;
};

/**
 * after the game has started use next question to reset everything, validate the
 * users input and write the next question.
 */
MathsGame.prototype.nextQuestion = function() {
    if (this.saveAnswer()) {
        console.log('answer ok');
        if (this.checkAnswer()) {
            this.writeNewQuestion(); 
        }
    }
};

/**
 * at any point you can finish the game, and this hides everything and shows
 * the score you got.
 * 
 * @param int exit the exit condition, 1 = wrong answer, 2 = time is up
 */
MathsGame.prototype.finish = function(exit) {
    clearInterval(this.timerId);
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
