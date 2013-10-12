function MathsGame() {
    this.questions = [];
    this.currentQuestion = 0;
    this.wrongAnswers = [];
    this.started = false;
    this.timerId = 0;
    this.timeLimit = 10;
    this.difficulty = 11;
}

/**
 * Start the game, write a new question to the screen.
 */
MathsGame.prototype.start = function() {
    $('#instructions').hide();
    if (!this.started) {    
        this.writeNewQuestion(); //write the new question to game
        this.started = true; //mark it as started
    }
};

MathsGame.prototype.tick = function() {
    if (this.questions[this.currentQuestion].timeLimit) {
        this.questions[this.currentQuestion].timeLimit --;
        if (this.questions[this.currentQuestion].timeLimit <= 0){
            this.finish(2);
            clearInterval()
        }
    }
    this.drawCountdown();
}

MathsGame.prototype.drawCountdown = function() {
    var countdown = '';
    if (this.questions != null) {
        countdown = this.questions[this.currentQuestion].timeLimit;
    }
    $('.countdown').html(countdown);
}

/**
 * check the users answer is a number and
 * check to see if it is the correct answer 
 */
MathsGame.prototype.checkAnswer = function() {
    if (this.questions[this.currentQuestion].userAnswer != this.questions[this.currentQuestion].answer) {
        console.log('wrong answer, oops');
        this.finish(1);
        
        return false;
    }
    if (isNaN(this.questions[this.currentQuestion].userAnswer)) { 
        
        return false;
    }
    
    return true;
}

/**
 * save the answer that the user types.
 */
MathsGame.prototype.saveAnswer = function() {
    this.questions[this.currentQuestion].userAnswer = parseInt($('#challenge input').val());
    
    if (isNaN(this.questions[this.currentQuestion].userAnswer)) { 

        return false; //the user has entered a non numeric number, do nothing.
    }
    
    return true;
};

/**
 * clear the current question and values
 * and then write a new question to the page.
 */
MathsGame.prototype.writeNewQuestion = function() {
    $('#challenge input').val(''); //reset the value in the form
    this.questions.push(new Question(this.difficulty, this.timeLimit)); //file is included to handle generation of a question object
    this.currentQuestion = this.questions.length-1; //set the current question we are on, Q1 is 0 for array purposes.
    this.drawCountdown() //draw a new countdown
    $('#challenge label').html(this.questions[this.currentQuestion].questionString()); //write the question out
    
    this.difficulty = this.difficulty + this.currentQuestion;
    
    
    clearInterval(this.timerId);//clear old question timer
    self = this; //start the timer.
    this.timerId = setInterval(function(){self.tick()}, 1000);
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
    $('#enter').hide();
    $('#submit').show();
    var results = '';
    for (var i = 0; i < this.amountQuestions; i++) {
        if (this.questions[i].answer != this.questions[i].userAnswer) {
            this.wrongAnswers.push(i);
            results = results + '#'+(i+1) + ' - ' + this.questions[i].questionString() + ' = ' + this.questions[i].answer + '. Your answer: ' + this.questions[i].userAnswer + '<br>';
        }
    }
    results = results + '<br> NOPE, ' + this.questions[this.currentQuestion].questionString() + ' is ' + this.questions[this.currentQuestion].answer;
    results = results + '<br> You put: ' + this.questions[this.currentQuestion].userAnswer;
    results = results + '<br> You scored: ' + (this.currentQuestion);
    $('#result').html(results);
};

/**
 * get current seconds of the system
 */
MathsGame.prototype.pressEnter = function() {
        if (this.started) {
            this.nextQuestion();
        } else {
            this.start();
        }
        $('.input').focus();
}

$(function(){
    var mathsGame = new MathsGame();
    $('.input').focus();
    $("body").keypress(function(e) {
        if (e.which == 13) {
            mathsGame.pressEnter(e); 
        }
    });
    $('#enter').click(function(){
       mathsGame.pressEnter(); 
    });
    
    $.getJSON( "/mathsgame/get-results.php", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });
        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "#scores" );
    });
    
    $('name-submit').click(function(){
       if ($('.name').val() != ''){
           $.ajax({
                type: "POST",
                url: "/mathsgame/put-results.php",
                data: { name: "andrew", score: 11 }
            })
                .done(function( msg ) {
                alert( "Data Saved: " + msg );
            });
        this.hide();
       } 
    });
    
});
