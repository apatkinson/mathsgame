$(function(){
    function Challenge(difficulty){
        this.difficulty = 11;
        this.one = this.getRandomNumber();
        this.two = this.getRandomNumber();
    }
    
    Challenge.prototype.getChallenge = function() {
        return 10;
    };
    
    Challenge.prototype.getRandomNumber = function(){
        return Math.floor(Math.random()*this.difficulty);
    };
    
    var first = new Challenge();
    
    console.log(first);
    console.log(first.one);
});