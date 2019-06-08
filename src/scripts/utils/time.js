const converter = require('number-to-words');

function roundMinute(minute){
    if (minute % 5 <= 2){ //Round down for ~first half of minutes in between 5 min intervals
        return Math.floor(minute/5)*5;
    }else{
        return Math.ceil(minute/5)*5;
    }
}

function formatHour(hour){
    if(hour > 0 && hour <= 12){
        return converter.toWords(hour);
    }else if(hour > 12){
        return converter.toWords(hour - 12);
    }else{
        return 'twelve' //convert 12am from 00 to 12;
    }
}

function buildSentence(minute,hour){
    //Get initial time values
    let interval = roundMinute(minute);
    //Adjust to read for next hour if past X:30
    minute <= 30 ? hour = formatHour(hour) : hour = formatHour(hour+1);

    if (interval === 60 || interval === 0){
        return `It is ${hour} OClock`.toUpperCase();
    }else{
        return `It is ${formatMinuteText(interval)} ${hour}`.toUpperCase();
    }
}

function formatMinuteText(interval){
    let preposition;
    let num;
    //Get correct preposition
    if (interval > 30){
        preposition = 'to';
        interval = 60 - interval; //Adjust interval to look towards next hour
    }else{
        preposition = 'past';
    }
    //Check current interveral and convert to words
    if ((interval !== 0) && (interval % 15 === 0)){
        if(interval === 30){
            num = 'half';
        }else{
            num = 'quarter';
        }
    }else{
        num = converter.toWords(interval).replace('-',' ');
    }
    return `${num} ${preposition}`; //return formatted string, adding 'minutes' if not a previously corrected word
}

module.exports = { roundMinute,buildSentence,formatHour,formatMinuteText };