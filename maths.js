function MathsGame(amountQuestions) {
    this.questions = [];
    this.amountQuestions = amountQuestions;
    this.currentQuestion = 0;
    this.started = false;
    this.finished = false;
    for (var i = 0; i < this.amountQuestions; i++) {
        this.questions.push(new Question());
    }
}

MathsGame.prototype.start = function() {
    if (!this.started) {
        $('#challenge label').html(this.questions[this.currentQuestion].questionString());
        this.started = true;
    }
};

MathsGame.prototype.saveAnswer = function() {
    this.questions[this.currentQuestion].userAnswer = parseInt($('#challenge input').val());
    $('#challenge input').val('');
};

MathsGame.prototype.newQuestion = function() {
    this.saveAnswer();
    if (this.currentQuestion < this.amountQuestions - 1) {
        this.currentQuestion ++;
        $('#challenge label').html(this.questions[this.currentQuestion].questionString());
        
    } else {
        if (!this.finished) {
            this.finished = true;
            this.finish();
        }
    }
};

MathsGame.prototype.finish = function() {
    $('#challenge').hide();
    var html = '';
    for (var i = 0; i < this.amountQuestions; i++) {
        html = html + (i+1) + ' - was:' + this.questions[i].answer + ' your answer: ' + this.questions[i].userAnswer + '<br>';
    }
    $('#result').html(html);
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