const time = require('./utils/time');
const views = require('./utils/views');
const alarm = require('./utils/alarm');

let notificationsEnabled = !(!window.Notification || !Notification.requestPermission());
if (notificationsEnabled) {
    Notification.requestPermission().then(result => {
        if (result === 'granted') {
            notificationsEnabled = true;
        }else{
            notificationsEnabled = false;
        }
    });
}

//Set initial variables
let timeInt = undefined;
const waitTime = 300000; 
let now = new Date();
let minute = 0;
let hour = 0;
const alarmTime = {
    day: now.getDate(),
    month: now.getMonth()+1,
    year: now.getFullYear(),
    hour: 0,
    min: 0,
    meridien: 'AM'
};
let alarmSet = false;
let timeArray;
//DOM Elements
const alarmToggle = document.getElementById('alarm-toggle');
const alarmButtonParents = Array.from(document.getElementsByClassName('alarm-adjust'));
const alarmSetter = document.getElementById('alarm-setter');
const alarmCancel = document.getElementById('alarm-cancel');
const alarmContainer = document.getElementById('alarm-container');



views.renderClock();
renderTime(now);

//Sets timeout to update clock at the next 5 minute division, then begin repeating update interval
let offset = getTimeOffset();
let timeout = setTimeout(()=>{
    now = new Date();
    renderTime(now)
    startClockInt();
},offset);


//Event Listeners
//Toggle alarm display
alarmToggle.addEventListener('click', () => {
    alarmContainer.classList.toggle('hidden');
});

//Alarm buttons for each part of the time
alarmButtonParents.forEach(el => {
    el.addEventListener('click', e => {
        if (e.target.classList.contains('inc')) {
            alarm.increase(e.target.nextElementSibling,alarmTime);
        } else if (e.target.classList.contains('dec')) {
            alarm.decrease(e.target.previousElementSibling,alarmTime);
        } else{
            return;
        }
    })
})

//Set Alarm
alarmSetter.addEventListener('click', () =>{
    alarm.set(alarmTime);
    console.log(alarmTime)
    alarmSet = true;
    clearInterval(timeInt);
    clearTimeout(timeout);
    alarmToggle.classList.add('activated');
    offset = getTimeOffset(minute);
    timeout = setTimeout(()=>{
        now = new Date();
        renderTime(now)
        startClockInt();
    },offset);
});

alarmCancel.addEventListener('click', () =>{
    alarmSet = false;
    alarmToggle.classList.remove('activated');
})

function getTimeOffset(){
    let minuteOffset = new Date().getMinutes() % 5;
    if (minuteOffset === 0) {
        return 0;
    }else {
        const offset = ((minuteOffset - 5) * -1) * 60000; //gets the remaining milliseconds to the next 5 minute interval
        const curMilSec = new Date().getMilliseconds();
        const curSec = (new Date().getSeconds()) * 1000; //gets current seconds in milliseconds
        return offset - (curSec + curMilSec);
    }
}
function renderTime(now){
    minute = now.getMinutes();
    hour = now.getHours();
    timeArray = time.buildSentence(minute,hour).split(' ');
    views.clearTime();
    views.activateTime(timeArray);
}

function checkAlarm(){
    if (alarmSet) {
        if (alarm.isPast(alarmTime)) {
            notificationsEnabled ? new Notification('Word:Clock Alarm!') : alert('Word:Clock Alarm!');
            alarmSet = false;
            alarmToggle.classList.remove('activated');
        }
    }
}

function startClockInt(){
    checkAlarm(); //Immediately check alarm to see if there's one for the current hour
    timeInt = setInterval(()=>{
        now = new Date();
        renderTime(now);
        checkAlarm();        
    },waitTime);
}

