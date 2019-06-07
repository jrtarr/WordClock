const time = require('./utils/time');
const views = require('./utils/views');
const alarm = require('./utils/alarm')

let notificationsEnabled = !window.Notification || !Notification.requestPermission() ? false : true;
if(notificationsEnabled){
    Notification.requestPermission().then(result => {
        if(result === 'granted'){
            notificationsEnabled = true;
        };
    });
};

//Set initial variables
const waitTime = 1000; //Amount of time for interval to wait - Five Minutes
let now = new Date();
const alarmTime = {
    day: now.getDate(),
    month: now.getMonth()+1,
    year: now.getFullYear(),
    hour: 0,
    min: 0,
    meridien: 'AM'
};
let alarmSet = false;
let date = now.getDate();
let minute = now.getMinutes();
let hour = now.getHours();
let timeArray = time.buildSentence(minute,hour).split(' ');

//DOM Elements
const alarmToggle = document.getElementById('alarm-toggle');
const alarmButtonParents = Array.from(document.getElementsByClassName('alarm-adjust'));
const alarmSetter = document.getElementById('alarm-setter');
const alarmCancel = document.getElementById('alarm-cancel');
const alarmContainer = document.getElementById('alarm-container');

views.renderClock();
views.activateTime(timeArray);

let offset = getTimeOffset(minute);
setTimeout(startClockInt(),offset);

//Event Listeners
//Toggle alarm display
alarmToggle.addEventListener('click', e => {
    alarmContainer.classList.toggle('hidden');
});

//Alarm buttons for each part of the time
alarmButtonParents.forEach(el => {
    el.addEventListener('click', e => {
        if(e.target.classList.contains('inc')){
            alarm.increase(e.target.nextElementSibling,alarmTime);
        }else{
            alarm.decrease(e.target.previousElementSibling,alarmTime);
        }
    })
})

//Set Alarm
alarmSetter.addEventListener('click', e =>{
    alarm.set(alarmTime);
    clearInterval(timeInt);
    alarmSet = true;
    offset = getTimeOffset(minute);
    alarmToggle.classList.add('activated');
    setTimeout(startClockInt(),offset);
});

alarmCancel.addEventListener('click', e =>{
    alarmSet = false;
    alarmToggle.classList.remove('activated');
})

function getTimeOffset(min){
    let minuteOffset = new Date().getMinutes() % 5;
    if(minuteOffset === 0){
        return 0;
    }else{
        const offset = ((minuteOffset - 5) * -1) * 6000; //gets the remaining milliseconds to the next 5 minute interval
        const curMilSec = new Date().getMilliseconds();
        const intMilSec = curMilSec + offset;
        return intMilSec - curMilSec;
    };
}

function startClockInt(){
    timeInt = setInterval(()=>{
        now = new Date();
        date = now.getDate();
        minute = now.getMinutes();
        hour = now.getHours();
        if(alarmSet){
            if(alarm.isPast(alarmTime)){
                notificationsEnabled? new Notification('Word:Clock Alarm!') : alert('Word:Clock Alarm!');
                alarmSet = false;
                alarmButton.classList.remove('activated');
            };
        };
        timeArray = time.buildSentence(minute,hour).split(' ');
        views.clearTime();
        views.activateTime(timeArray);
    },waitTime);
};
