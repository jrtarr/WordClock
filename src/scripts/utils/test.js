const time = require('./time')
const views = require('./views')

//Quickly runs through all permutations between specified time and the end Hour
function interval(minute,hour,endHour){
    const test = setInterval(()=>{
        if(hour > endHour){
            clearInterval(test);
        }
        let timeArray = time.buildSentence(minute,hour).split(' ');
        views.clearTime();
        views.activateTime(timeArray);
        if(minute >= 60){
            hour += 1;
            minute = 0;
        }else{
            minute += 5;
        };
    },1500);
};

//Sets the clock to a specific time
function specific(minute,hour){
    let timeArray = time.buildSentence(minute,hour).split(' ');
    views.clearTime();
    views.activateTime(timeArray);
}

export { interval, specific }