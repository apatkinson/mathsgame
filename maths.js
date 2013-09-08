function MathsGame(amountQuestions) {
    this.questions = [];
    this.amountQuestions = amountQuestions;
    this.currentQuestion = 0;
    this.wrongAnswers = [];
    this.started = 0;
    this.finished = 0;
    
    for (var i = 0; i < this.amountQuestions; i++) {
        this.questions.push(new Question());
    }
}

MathsGame.prototype.start = function() {
    if (!this.started) {
        $('#challenge label').html(this.questions[this.currentQuestion].questionString());
        this.started = this.getCurrentSeconds();
    }
};

MathsGame.prototype.saveAnswer = function() {
    this.questions[this.currentQuestion].userAnswer = parseInt($('#challenge input').val());
    console.log(this.questions[this.currentQuestion].userAnswer);
    if (this.questions[this.currentQuestion].userAnswer)
    $('#challenge input').val('');
};

MathsGame.prototype.newQuestion = function() {
    if (this.saveAnswer()) {
        if (this.currentQuestion < this.amountQuestions - 1) {
            this.currentQuestion ++;
            $('#challenge label').html(this.questions[this.currentQuestion].questionString());

        } else {
            if (!this.finished) {
                this.finished = this.getCurrentSeconds();
                this.finish();
            }
        }
    } else {
        consol.log('Please enter a number');
    }
};

MathsGame.prototype.finish = function() {
    $('#challenge').hide();
    var results = '';
    for (var i = 0; i < this.amountQuestions; i++) {
        if (this.questions[i].answer != this.questions[i].userAnswer) {
            this.wrongAnswers.push(i);
            results = results + '#'+(i+1) + ' - ' + this.questions[i].questionString() + ' = ' + this.questions[i].answer + '. Your answer: ' + this.questions[i].userAnswer + '<br>';
        }
    }
    results = results + '<br> You scored ' + (this.amountQuestions-this.wrongAnswers.length) + ' out of ' + this.amountQuestions;
    results = results + '<br> It took you ' + ((this.finished-this.started)/1000) + ' seconds';
    $('#result').html(results);
};

MathsGame.prototype.getCurrentSeconds = function() {
    return new Date().getTime();
}

function Question(difficulty) {
    this.difficulty = 11; //at the moment this is just set to 11
    this.one = this.getRandomNumber();//number one
    this.two = this.getRandomNumber();//number two
    this.action = this.getAction();//what to do to the numbers
    this.answer = this.getAnswer(); //the answer of the question
    this.userAnswer = 0;//users answer
}

//generates a random Int
Question.prototype.getRandomNumber = function() {
    return parseInt(Math.floor(Math.random()*this.difficulty), 10);
};

//generates the action, (+, -,  /, *)
Question.prototype.getAction = function() {
    return '+';
};

//work out the answer
Question.prototype.getAnswer = function() {
    return this.one+this.two;
}

//returns the question string
Question.prototype.questionString = function(){
    return this.one + ' ' + this.action + ' ' + this.two;
};


$(function(){
    var mathsGame = new MathsGame(10);

    $("body").keypress(function(e) {
        if (e.which == 32) {
            mathsGame.start();
        }
        if (e.which == 13) {
            mathsGame.newQuestion();
        }
    });
});
