gamePattern = [];
userClickedPattern = [];
buttonColors = ["green", "red", "yellow", "blue"];
var started = false;
var level = 0;
$("body").keypress(function (e) {
    if (!started) {
        $("#heading").text("Level " + level);
        nextone();
        started = true;
    }
});
// user clicked buttons
$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextone();
            }, 1000);
        }
    }
    else {
        var str = "wrong";
        playSound(str);
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 500);
        $("h1").text("Game Over, Press Any Key to Restart 😐");
        startOver();
    }
}

function nextone() {
    // changing level title
    userClickedPattern = [];
    level++;
    $("#heading").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // Animate
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePressed(userChosenColor) {
    $("." + userChosenColor).addClass("pressed");
    setTimeout(function () {
        $("." + userChosenColor).removeClass("pressed");
    }, 100);
}
// Restarting the game
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}