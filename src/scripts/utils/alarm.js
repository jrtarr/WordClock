const alarmMinEl = document.getElementById('alarm-min');
const alarmHourEl = document.getElementById('alarm-hour');
const meridienEl = document.getElementById('meridien');

function update(alarm,amount){
    let {min,hour} = alarm;
    if(min + amount >= 60){
        hour = updateHour(hour,1)
        min = 0;
    }else if(min + amount < 0){
        hour = updateHour(hour,-1)
        min = 55;
    }else{
        min += amount;
    }
    alarm.hour = hour;
    alarm.min = min;
};

function render({min, hour}){
    alarmHourEl.textContent = leadingZero(formatHour(hour));
    alarmMinEl.textContent = leadingZero(min);
    meridienEl.textContent = checkMeridian(hour);
};

function leadingZero(x){
    return x < 10 ? '0' + x.toString() : x;
};

function formatHour(x){
    if(x > 12){
        return x - 12;
    }else if (x === 0){
        return 12;
    }else{
        return x
    }
};

function updateHour(x,amount){
    return x + amount < 0 ? x = 23 : x + amount
}

function checkMeridian(x){
    return x > 11 ? 'PM' : 'AM';
}

export { update, render };