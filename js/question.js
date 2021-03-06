function Question(difficulty, timeLimit) {
    if (difficulty == null) {
        this.difficulty = 11; //at the moment this is just set to 11
    } else {
        this.difficulty = difficulty;
    }
    this.one = this.getRandomNumber();//number one
    this.two = this.getRandomNumber();//number two
    this.action = this.getAction();//what to do to the numbers
    this.answer = this.getAnswer(); //the answer of the question
    this.userAnswer = 0;//users answer
    this.score = 0;
    if (timeLimit == null) {
        this.timeLimit = 10;//how long to they have to answer the question
    } else {
        this.timeLimit = timeLimit;
    }
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