const alarmMinEl = document.getElementById('alarm-min');
const alarmHourEl = document.getElementById('alarm-hour');
const meridienEl = document.getElementById('meridien');

function render({min, hour, meridien}){
    alarmHourEl.textContent = leadingZero(formatHour(hour));
    alarmMinEl.textContent = leadingZero(min);
    meridienEl.textContent = meridien;
}

function set(alarm){
    //Checks if the alarm is set for a time prior to the current time. If so, sets the alarm for that time the next day
    const {min, hour} = alarm;
    let date = new Date();
    if(hour < date.getHours()){
        date.setDate(date.getDate() + 1);
        alarm.day = date.getDate();
        alarm.month = date.getMonth()+1;
        alarm.year = date.getFullYear();
    }else if(min <= date.getMinutes() && hour <= date.getHours()){
        date.setDate(date.getDate() + 1);
        alarm.day = date.getDate();
        alarm.month = date.getMonth()+1;
        alarm.year = date.getFullYear();
    }else{
        alarm.day = date.getDate();
        alarm.month = date.getMonth()+1;
        alarm.year = date.getFullYear();
    }
}

function isPast({day,month,year,hour,min}){
    const today = new Date()
    if((day <= today.getDate()) && (month <= today.getMonth()+1) && (year <= today.getFullYear()) && (hour <= today.getHours()) && (min <= today.getMinutes())){
        return true;
    }else{
        return false;
    }
}

function leadingZero(x){
    return x < 10 ? '0' + x.toString() : x;
}

function formatHour(x){
    if(x > 12){
        return x - 12;
    }else if (x === 0){
        return 12;
    }else{
        return x
    }
}

function increase(element,alarm){
    const portion = element.id;
    const hourAdjust = alarm.meridien === 'AM' ? 0 : 12;
    if(portion === 'alarm-hour'){
        if(alarm.hour + 1 < 12 + hourAdjust){
            alarm.hour += 1;
        }else{
            alarm.meridien === 'AM' ? alarm.hour = 0 : alarm.hour = 12;
        }
    }else if(portion === 'alarm-min'){
        if(alarm.min + 5 < 60){
            alarm.min += 5;
        }else{
            alarm.min = 0 ;
        }
    }else{
        setMeridien(element,alarm);
    }
    render(alarm);
}

function decrease(element,alarm){
    const portion = element.id;
    const hourAdjust = alarm.meridien === 'AM' ? 12 : 0;
    if(portion === 'alarm-hour'){
        if(alarm.hour - 1 >= 12 - hourAdjust){
            alarm.hour -= 1;
        }else{
            alarm.meridien === 'AM' ? alarm.hour = 11 : alarm.hour = 23;
        }
    }else if(portion === 'alarm-min'){
        if(alarm.min - 5 >= 0){
            alarm.min -= 5;
        }else{
            alarm.min = 55 ;
        }
    }else{
        setMeridien(element,alarm);
    }
    render(alarm);
}

function setMeridien(element,alarm){
    if(element.textContent === 'AM'){
        alarm.meridien = 'PM';
        alarm.hour += 12;
    }else{
        alarm.meridien = 'AM';
        alarm.hour -= 12;
    }
}

module.exports = { render, set, increase, decrease, isPast, formatHour };