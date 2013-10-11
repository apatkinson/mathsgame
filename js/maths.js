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
    if (isNaN(this.questions[this.currentQuestion].userAnswer)) { 
        return false;
    }
    $('#challenge input').val('');
    return true;
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
        //should probably alert the user and not just the developer!
        console.log('Please enter a number');
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

$(function(){
    var mathsGame = new MathsGame(10);

    $("body").keypress(function(e) {
        if (e.which == 13) {
            if (mathsGame.started) {
                mathsGame.newQuestion();
            } else {
                mathsGame.start();
            }
        }
    });
});
