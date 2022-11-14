const display=document.getElementById("clock");
//setting audio for alarm from link.
const audio=new Audio('image/sia.mp3');
audio.loop=true;

let alarmTime=null;
let alarmTimeout=null;

const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm');
//to store all the alarms belong set in array;
const alarmList=[];
//starting count as 1;
//in order to play alarm audio at correct time;
function ringing(now){
    audio,play();
    window.alert(`Hey! it is  $(now)`);

}
// updating time every second;
function updateTime(){
    var Today = new Date();
    var hour = formatTime(Today.getHours());
    var minutes=formatTime(Today.getMinutes());
    var seconds=formatTime(Today.getSeconds());
    var zone = hour>=12?"PM":"AM";
    if(hour>12){
        hour=hour%12;
        hour="0"+hour;
    }
    var now=`${hour}:${minutes}:${seconds}${zone}`;
    display.innerText=`${hour}:${minutes}:${seconds} ${zone}`;
    //we check do alarmList array contain time current time now;
    //if yes, we call function to ring
    if(alarmList.includes(now)){
        ringing(now);
    }

}
//setting correct format of time by converting 1:2:3 as 01:02:03
function formatTime(time){
    if(time<10 && time.length !=2){
        return "0"+time;
    }
    return time;
}
//function to clear/stop the currently playing alarm.
function clearAlarm(){
    audio.pause();
    if(alarmTimeout){
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }

}
//to remove an alarm from list and webpage when "Delete Alarm" event is placed;
myList.addEventListener('click',e=>{
    console.log("removing element");
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }

})
//removes an alarm from the array when "Delete Alarm" is clicked
remove=(value)=>{
    let newList=alarmList.filter((time)=>time!=value);
    alarmList.length=0;
    alarmList.push.apply(alarmList,newList);

    console.log("newList",newList);
    console.log("alarmList",alarmList);

}
//Adds newAlarm to the unordered list as a newlist item on webpage
function showNewAlarm(newAlarm){
    const html=`
    <li class="time-list">
           <span class ="time"> ${newAlarm}</span>
           <button class="deleteAlarm time-control" id="delete-button" onclick="remove(this.value)" value=${newAlarm}>Delete Alarm</button>
    </li>`
    myList.innerHTML+=html

};
//event to set a new alarm whenever the form is submitted
addAlarm.addEventListener('submit',e=>{
    e.preventDefault();
    //const new Alarm = addAlarm.alarmTime.value;
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h==='0'){
        new_h='00'
    }
    let new_m=formatTime(addAlarm.a_minute.value);
    if(new_m==='0'){
        new_m='00'
    }
    let new_s=formatTime(addAlarm.a_second.value);
    if(new_s==='0'){
        new_s='00'
    }
    let new_z=addAlarm.zone.value;

    const newAlarm=`${new_h}:${new_m}:${new_s} ${new_z}`;
    //add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        }else{
            alert(`Alarm for ${newAlarm} already set.`);

        }
    }else{
            alert("Invalid Time Entered")
    }

})
//calls updateTime() every second
setInterval(updateTime,1000);
