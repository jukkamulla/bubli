
/*var bubbleContainer = document.getElementsByClassName("bubble-container")[0];
var dimension = 5;
var value = 0;

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
buildGameTable();*/

var time = 0;
var sequenceTime = 10;
var interval;
var level = 0;

function elapsedTime(){
    time++;
    var seconds = time / 100;
    var numberArray = seconds.toString().split(".");
    var second;
    var hundredSecond;
    var timer = document.getElementById("timer").firstChild;
    second = numberArray[0].toString();
    if (numberArray[1] == undefined){
        numberArray[1] = "00"
    }
    hundredSecond = numberArray[1].toString();
    if (numberArray[0] < 10){
        second = "0" + numberArray[0]
    }
    if (numberArray[1].length === 1){
        hundredSecond = numberArray[1] + "0"
    }
    timer.innerHTML = second + ":" + hundredSecond;
}

function play(){
    interval = setInterval(elapsedTime, sequenceTime);
    time = 0;
}

function win(){
    clearInterval(interval);
    level++;
    var levelNumber = document.getElementById("level-number");
    levelNumber.innerHTML = level.toString();

}