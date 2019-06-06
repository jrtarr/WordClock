const time = require('./utils/time');
const views = require('./utils/views');
const alarm = require('./utils/alarm')

//Set initial variables
const waitTime = 1000; //Amount of time for interval to wait - Five Minutes
const alarmTime = {
    hour: 0,
    min: 0
}
let mouseDownInterval = undefined;
let alarmSet = false;
let now = new Date();
let minute = now.getMinutes();
let hour = now.getHours();
let timeArray = time.buildSentence(minute,hour).split(' ');
//DOM Elements
const alarmButton = document.getElementById('alarm-button');
const alarmSetter = document.getElementById('alarm-setter');
const alarmContainer = document.getElementById('alarm-container');
const increment = document.getElementById('inc');
const decrement = document.getElementById('dec');

Notification.requestPermission().then( result =>{
    if(result !== 'granted'){
        alarmContainer.innerHTML = '<div id="alarm-form">Please enable notifications to set an alarm.</div>'
    }
});

views.renderClock();
views.activateTime(timeArray);

let offset = getTimeOffset(minute);
setTimeout(startClockInt(),offset);

//Event Listeners
//Toggle alarm display
alarmButton.addEventListener('click', e => {
    alarmContainer.classList.toggle('hidden');
});

//Set Alarm
alarmSetter.addEventListener('click', e =>{
    clearInterval(timeInt)
    alarmSet = true;
    offset = getTimeOffset(minute);
    alarmButton.classList.add('activated')
    setTimeout(startClockInt(),offset);
})

//Increment on Mousedown, stop on Mouseup/out
increment.addEventListener('mousedown', e => {
    !mouseDownInterval && startMousedownInt(5)
});
increment.addEventListener('mouseup', e => {
    mouseDownInterval && clearInt();
});
increment.addEventListener('mouseout', e => {
    mouseDownInterval && clearInt();
});

//Decrement on Mousedown, stop on Mouseup/out
decrement.addEventListener('mousedown', e => {
    !mouseDownInterval && startMousedownInt(-5)
});
decrement.addEventListener('mouseup', e => {
    mouseDownInterval && clearInt();
});
decrement.addEventListener('mouseout', e => {
    mouseDownInterval && clearInt();
});

//Functions
function getTimeOffset(min){
    let minuteOffset = new Date().getMinutes() % 5
    if(minuteOffset === 0){
        return 0;
    }else{
        const offset = ((minuteOffset - 5) * -1) * 6000 //gets the remaining milliseconds to the next 5 minute interval
        const curMilSec = new Date().getMilliseconds()
        const intMilSec = curMilSec + offset 
        return intMilSec - curMilSec
    }
}

function startClockInt(){
    timeInt = setInterval(()=>{
        now = new Date();
        minute = now.getMinutes();
        hour = now.getHours();
        if(alarmSet){
            if(hour >= alarmTime.hour && minute >= alarmTime.min){
                new Notification('Word:Clock Alarm!');
                alarmSet = false;
                alarmButton.classList.remove('activated');
            }
        }
        timeArray = time.buildSentence(minute,hour).split(' ');
        views.clearTime();
        views.activateTime(timeArray);
    },waitTime);
}

function clearInt(){
    clearInterval(mouseDownInterval);
    mouseDownInterval = undefined;
};

function startMousedownInt(amount){
    mouseDownInterval = setInterval(()=>{
        alarm.update(alarmTime,amount);
        alarm.render(alarmTime);
    },100);
};
