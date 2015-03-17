
var bubbleContainer = document.getElementsByClassName("bubble-container")[0];
var dimension = 5;
var value = 0;
var time = 0;
var sequenceTime = 10;
var visibilityTime = 2500;
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
    bubbleInterval = setInterval(setValueOfBubbles, visibilityTime);
    time = 0;
    removeBlinking();
    buildGameTable();
    setRandomGoalNumber();
    setValueOfBubbles();
    removeAllChild("message");
}

function randomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setRandomGoalNumber(){
    var randomGoalNumber = randomNumber(30, 100);
    var randomGoalNumberElement = document.getElementById("goal-number").firstChild;
    randomGoalNumberElement.innerHTML = randomGoalNumber.toString();
}

function setValueOfBubbles(){
    var bubbles = document.getElementsByClassName("bubble");
    for (var i = 0; i < bubbles.length; i++) {
        var bubbleValue = randomNumber(-50, 50);
        var bubbleDiv = bubbles[i];
        var bubbleP = bubbleDiv.firstChild;
        bubbleP.innerHTML = bubbleValue.toString();
        visibility(bubbleValue, bubbleP, bubbleDiv);
    }
}

function visibility(bubbleValue, bubbleP, bubbleDiv) {
    if (bubbleValue < -20 || bubbleValue > 30) {
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

function win(){
    clearInterval(timerInterval);
    level++;
    var levelNumber = document.getElementById("level-number");
    levelNumber.innerHTML = level.toString();
    addBlinking();
    removeAllChild("container");
    congratulation();
}

function addBlinking(){
    var play = document.getElementById("button");
    play.classList.add("blinking");
}

function removeBlinking(){
    var play = document.getElementById("button");
    play.classList.remove("blinking");
}

function removeAllChild(id){
    var container = document.getElementById(id);
    while (container.firstChild){
        container.removeChild(container.firstChild);
    }
}

function congratulation(){
    var message = document.getElementById("message");
    var messageText = document.createElement("p");
    messageText.innerHTML = "Nice work! Press to Play for new round!";
    messageText.classList.add("message");
    message.appendChild(messageText);
}

function collectionPossibilities(elementOpacity, text) {
    if (elementOpacity > 0) {
        var counterElement = document.getElementById("counter-number").firstChild;
        var goalNumber = parseInt(document.getElementById("goal-number").firstChild.innerHTML);
        var counterNumber = parseInt(counterElement.innerHTML);
        if (isNaN(counterNumber)) {
            counterNumber = 0;
        }
        var clickedNumber = parseInt(text);
        if (isNaN(clickedNumber)) {
            clickedNumber = 0;
        }
        var newCounterValue = counterNumber + clickedNumber;
        if (newCounterValue > goalNumber) {
            newCounterValue = 0;
        } else if (newCounterValue === goalNumber) {
            clearInterval(1);
            win();
        }
        counterElement.innerHTML = (newCounterValue).toString();
    }
}
document.addEventListener('click', function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    var elementOpacity = window.getComputedStyle(target, null).getPropertyValue('opacity');
    var text = target.textContent;
    if (target.className ==! "expression expression-visible" && target.className ==! "bubble bubble-row bubble-visible") {
        return false;
    }
    collectionPossibilities(elementOpacity, text);
}, false);



