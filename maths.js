function MathsGame(amountQuestions) {
    this.questions = [];
    this.currentQuestion = 0;
    this.started = false;
    for (var i = 0; i < amountQuestions; i++) {
        this.questions.push(new Question());
    }
}

MathsGame.prototype.start = function() {
    if (!this.started) {
        $('#challenge label').html(this.questions[this.currentQuestion].questionString());
        this.started = true;
    }
}

MathsGame.prototype.saveAnswer = function() {
    this.questions[this.currentQuestion].userAnswer = parseInt($('#challenge input').val());
    $('#challenge input').val('');
};

MathsGame.prototype.newQuestion = function() {
    this.saveAnswer();
    if (this.currentQuestion <= this.questions.length) {
        this.currentQuestion ++;
        $('#challenge label').html(this.questions[this.currentQuestion].questionString());
    } else {
        console.log('finished');
    }
};



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
    var mathsGame = new MathsGame(5);

    $("body").keypress(function(e) {
        if (e.which == 32) {
            mathsGame.start();
        }
        if (e.which == 13) {
            mathsGame.newQuestion();
            console.log(mathsGame);
        }
    });
});