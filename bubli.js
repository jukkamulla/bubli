
var bubbleContainer = document.getElementsByClassName("bubble-container")[0];
var dimension = 5;
var value = 0;
var time = 0;
var sequenceTime = 10;
var timerInterval;
var bubbleInterval;
var level = 0;

function buildGameTable() {
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            value++;
            var newDiv = document.createElement('div');
            newDiv.classList.add("bubble");
            newDiv.classList.add("bubble-row");
            var valueElement = document.createElement('p');
            valueElement.classList.add("expression");
            newDiv.appendChild(valueElement);
            bubbleContainer.appendChild(newDiv);
        }
    }
}

function setTimerElements(second, hundredSecond){
    var timer = document.getElementById("timer").firstChild;
    timer.innerHTML = second + ":" + hundredSecond;
}

function setElapsedTime(numberArray) {
    var second;
    var hundredSecond;
    second = numberArray[0].toString();
    if (numberArray[1] == undefined) {
        numberArray[1] = "00"
    }
    hundredSecond = numberArray[1].toString();
    if (numberArray[0] < 10) {
        second = "0" + numberArray[0]
    }
    if (numberArray[1].length === 1) {
        hundredSecond = numberArray[1] + "0"
    }
    setTimerElements(second, hundredSecond);
}

function elapsedTime(){
    time++;
    var seconds = time / 100;
    var numberArray = seconds.toString().split(".");
    setElapsedTime(numberArray);
}

function play(){
    timerInterval = setInterval(elapsedTime, sequenceTime);
    bubbleInterval = setInterval(setValueOfBubbles, 3000);
    time = 0;
    removeBlinking();
    buildGameTable();
    setRandomGoalNumber();
    setValueOfBubbles();
}

function randomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setRandomGoalNumber(){
    var goalNumber = randomNumber(30, 100);
    var goalNumberElement = document.getElementById("goal-number").firstChild;
    goalNumberElement.innerHTML = goalNumber.toString();
}

function visibility(bubbleValue, bubbleP, bubbleDiv) {
    if (bubbleValue < 10 || bubbleValue > 50) {
        bubbleP.classList.remove("expression-visible");
        bubbleDiv.classList.remove("bubble-visible");
        bubbleP.classList.add("hided-expression");
        bubbleDiv.classList.add("hided-bubble");
    } else {
        bubbleP.classList.remove("hided-expression");
        bubbleDiv.classList.remove("hided-bubble");
        bubbleP.classList.add("expression-visible");
        bubbleDiv.classList.add("bubble-visible");
    }
}
function setValueOfBubbles(){
    var bubbles = document.getElementsByClassName("bubble");
    for (var i = 0; i < bubbles.length; i++) {
        var bubbleValue = randomNumber(1, 99);
        var bubbleDiv = bubbles[i];
        var bubbleP = bubbleDiv.firstChild;
        bubbleP.innerHTML = bubbleValue.toString();
        visibility(bubbleValue, bubbleP, bubbleDiv);
    }
}

function win(){
    clearInterval(timerInterval);
    level++;
    var levelNumber = document.getElementById("level-number");
    levelNumber.innerHTML = level.toString();
    addBlinking();
    removeGameTable();
}

function addBlinking(){
    var play = document.getElementById("button");
    play.classList.add("blinking");
}

function removeBlinking(){
    var play = document.getElementById("button");
    play.classList.remove("blinking");
}

function removeGameTable(){
    var container = document.getElementById("container");
    while (container.firstChild){
        container.removeChild(container.firstChild);
    }
}
