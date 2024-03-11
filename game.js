

var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started=false;


function playSound(name){
     var audio = new Audio("./sounds/"+name+".mp3");
     audio.play();
  }

function nextSequence(){
     userClickedPattern=[];
     level++;
     $("h1").text("level "+level);
     var randomNumber = Math.floor(Math.random()*4);
     var randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour);
     $("#"+randomChosenColour).delay(0.1).fadeOut("fast").fadeIn("fast");
     playSound(randomChosenColour);
}

function animatePress(currentColor){
     $("#"+currentColor).addClass("pressed");
     setTimeout(function() {
          $("#"+currentColor).removeClass("pressed");
      }, 100);
  }


$(document).keypress(function() {
     if (!started) {
       $("#level-title").text("Level " + level);
       nextSequence();
       started = true;
     }
   });


$(".btn").click(function() {
   if(started=== true){
     var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);
   
     playSound(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length-1);
   }
   });
   
   function checkAnswer(currentLevel) {
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       console.log("success");
      
       if (userClickedPattern.length === gamePattern.length){
         setTimeout(function () {
           nextSequence();
         }, 1000);
       }
     } else {
      gameOver();
       console.log("wrong");
       startOver();
 
     }
 
 }


function gameOver(){
     playSound("wrong");
     $("body").addClass("game-over");
     $("h1").text("Game over. Press A Key to Start ");
     setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
}

function startOver(){
          level=0;
          gamePattern=[];
          userClickedPattern=[];
          started=false;
          

}




gameOn();
   