
var alarmList = [];
var currentId = 1;

//Extracting and updating the current time after each second
function updateTime(){
    var now = new Date();
    var hours = new.getHours();
    var minutes = new.getMinutes();
    var seconds = new.getSeconds();

    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }

    now = `${hours}:${minutes}:${seconds}`;
    document.getElementById("display").innerHTML = now;

    //Alert shown when any of the alarm times is hit
    if(alarmList.includes(now)){
        alert("It's time to wake up !!!");
    }

}

var btn1 = document.getElementById("set-alarm-btn");
var alarmsList = document.getElementById("alarm-list");

//Adding the alarms on each clicks of the set-alarm-button
btn1.addEventListener('click', () =>{
    var alarmH = document.getElementById("a-hours").value;
    var alarmM = document.getElementById("a-minutes").value;
    var alarmS = document.getElementById("a-seconds").value;

    if(document.getElementById("a-hours").value == ""){
        alert("Please enter a time to set the alarm.");
        return;
    }
    if(document.getElementById("a-minutes").value == ""){
        alert("Please enter a time to set the alarm.");
        return;
    }
    if(document.getElementById("a-seconds").value == ""){
        alert("Please enter a time to set the alarm.");
        return;
    }

    if(alarmH < 10 && alarmH.length != 2){
        alarmH = "0" + alarmH;
    }
    if(alarmM < 10 && alarmM.length != 2){
        alarmM = "0" + alarmM;
    }
    if(alarmS < 10 && alarmS.length != 2){
        alarmS = "0" + alarmS;
    }

    var newAlarm = `${alarmH}:${alarmM}:${alarmS}`;

    //Checking the validity of each input
    if(alarmH > 23 || alarmH < 0 || alarmM > 59 || alarmM < 0 || alarmS > 59 || alarmS < 0){
        alert("Please enter a valid time.")
    }

    //Checking duplicacy
    else if(alarmList.includes(newAlarm)){
        alert("Alarm already exists.")
    }

    //Adding valid alarm to the list
    else{
        alarmsList.innerHTML += `
             <div id = "alarm-entry">
                  <span class = "alarm-display"> ${newAlarm} </span>
                  <button id = "delete-btn"> Delete Alarm </button>
            </div>
            
        `
        alarmList.push(newAlarm);
        currentId++;

    }
    var curr_alarms = document.querySelectorAll("#delete-btn");


     for(var i=0; i<curr_alarms.length;i++){
        curr_alarms[i].onclick = function(){

            this.parentNode.remove();

        }
     }

     //After each button press, reseting the input fields
     document.getElementById("a-hours").value = ""; 
     document.getElementById("a-minutes").value = ""; 
     document.getElementById("a-seconds").value = ""; 
});

//function call to update the time each second
setInterval(updateTime, 1000);
