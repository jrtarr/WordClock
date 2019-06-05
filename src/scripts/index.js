const time = require('./utils/time')
const views = require('./utils/views')
const test = require('./utils/test')
//Set initial variables
let now = new Date()
let minute = now.getMinutes()
let hour = now.getHours()
timeArray = time.buildSentence(minute,hour).split(' ')

views.renderClock()
views.activateTime(timeArray)

setInterval(()=>{
    now = new Date()
    minute = now.getMinutes()
    hour = now.getHours()
    timeArray = time.buildSentence(minute,hour).split(' ')
    views.clearTime()
    views.activateTime(timeArray)
},300000)


