const alarm = require('./../alarm');

const now = new Date()

const alarmTime = {
    day: now.getDate(),
    month: now.getMonth()+1,
    year: now.getFullYear(),
    hour: now.getHours(),
    min: now.getMinutes(),
    meridien: 'AM'
}

test('Checks to see if the alarm time is equal to or before the current time', () =>{
    expect(alarm.isPast(alarmTime)).toBe(true);
});

test('Converts input hour to 12 hour format for display',()=>{
    expect(alarm.formatHour(15)).toBe(3);
    expect(alarm.formatHour(0)).toBe(12);
    expect(alarm.formatHour(5)).toBe(5);
    expect(alarm.formatHour(24)).toBe(12);
})