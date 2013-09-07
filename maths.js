function Challenge(difficulty){
    this.difficulty = 11; //at the moment this is just set to 11
    this.one = this.getRandomNumber();//number one
    this.two = this.getRandomNumber();//number two
    this.action = this.getAction();//what to do to the numbers
    this.answer = this.getAnswer(); //the answer of the challenge
    this.userAnswer = 0;//users answer
}
    
//generates a random Int
Challenge.prototype.getRandomNumber = function(){
    return parseInt(Math.floor(Math.random()*this.difficulty), 10);
};
    
//generates the action, (+, -,  /, *)
Challenge.prototype.getAction = function() {
    return '+';
};
    
//work out the answer
Challenge.prototype.getAnswer = function() {
    return this.one+this.two;
}
    
//returns the challenge string
Challenge.prototype.challengeString = function(){
    return this.one + this.action + this.two;
};
    
var first = new Challenge();
    
$(function(){    
    $('#challenge label').html(first.challengeString());
});