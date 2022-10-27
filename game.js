// alert('working move!');

//global variables

let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

//know if game has started

let started = false;

//keep track of the level
let level = 0;



//event for keypress

$(document).keydown(function(){
    if(!started){
        $('#level-title').text('level ' + level)

        nextSequence();
        started = true;
    }
      
})




$('.btn').click(function(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor)
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
})

//start over function


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }else{
        
        playSound('wrong');

        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over')
        }, 200)
        $('#level-title').text('Game Over, Press Any Key to Restart')
        // console.log('Wrong');

        startOver();
    }
}








//function for the sequence of the animation 
function nextSequence(){
    userClickedPattern = [];
    level++;

    $('#level-title').text('level ' + level);



    //random number and random color to begin

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];

    console.log(randomNumber);
    console.log(randomChosenColor);

    // add the chosen color to the array of pattern

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    //animate the blinking effect and initial opening sound

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 
    playSound(randomChosenColor);
 
    //event listener for user click

    
   
   


// let audio = new Audio('sounds/' + randomChosenColor + '.mp3')
// audio.play();

}


//activating the function and viewing the array.

//function for playing the needed sound 
function playSound(name){
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

//animation of the button based on the color
function animatePress(currentColor){
 $('#' + currentColor).addClass('pressed');
    setTimeout(function(){
       $('#' + currentColor).removeClass('pressed'); 
    }, 100)
}

