const time = require('./utils/time');
const views = require('./utils/views');

//Set initial variables
const waitTime = 300000; //Amount of time for interval to wait - Five Minutes
let now = new Date();
let minute = now.getMinutes();
let hour = now.getHours();
let timeArray = time.buildSentence(minute,hour).split(' ');
//DOM Elements
let container = document.getElementById('container')
let alarmButton = document.getElementById('alarm-button');
let alarmContainer = document.getElementById('alarm-container');

views.renderClock();
views.activateTime(timeArray);

setInterval(()=>{
    now = new Date();
    minute = now.getMinutes();
    hour = now.getHours();
    timeArray = time.buildSentence(minute,hour).split(' ');
    views.clearTime();
    views.activateTime(timeArray);
},waitTime);

alarmButton.addEventListener('click', e => {
    alarmButton.classList.toggle('on');
    alarmContainer.classList.toggle('hidden');
});
