const time = require('./../time');

test('Rounds minute to the nearest 5 minute interval', () =>{
    expect(time.roundMinute(2)).toBe(0);
    expect(time.roundMinute(13)).toBe(15);
    expect(time.roundMinute(22)).toBe(20);
    expect(time.roundMinute(45)).toBe(45);
    expect(time.roundMinute(59)).toBe(60);
});

test('Converts numeric hour into words, adjusting to 12hr format', () =>{
    expect(time.formatHour(0)).toBe('twelve');
    expect(time.formatHour(1)).toBe('one');
    expect(time.formatHour(2)).toBe('two');
    expect(time.formatHour(3)).toBe('three');
    expect(time.formatHour(4)).toBe('four');
    expect(time.formatHour(5)).toBe('five');
    expect(time.formatHour(6)).toBe('six');
    expect(time.formatHour(7)).toBe('seven');
    expect(time.formatHour(8)).toBe('eight');
    expect(time.formatHour(9)).toBe('nine');
    expect(time.formatHour(10)).toBe('ten');
    expect(time.formatHour(11)).toBe('eleven');
    expect(time.formatHour(12)).toBe('twelve');
});

test('Constructs a sentence declaring the current time using passed in minute/hour', () =>{
    expect(time.buildSentence(2,1)).toBe('IT IS ONE OCLOCK');
    expect(time.buildSentence(5,2)).toBe('IT IS FIVE PAST TWO');
    expect(time.buildSentence(12,3)).toBe('IT IS TEN PAST THREE');
    expect(time.buildSentence(14,4)).toBe('IT IS QUARTER PAST FOUR');
    expect(time.buildSentence(21,5)).toBe('IT IS TWENTY PAST FIVE');
    expect(time.buildSentence(23,6)).toBe('IT IS TWENTY FIVE PAST SIX');
    expect(time.buildSentence(30,7)).toBe('IT IS HALF PAST SEVEN');
    expect(time.buildSentence(33,7)).toBe('IT IS TWENTY FIVE TO EIGHT');
    expect(time.buildSentence(40,8)).toBe('IT IS TWENTY TO NINE');
    expect(time.buildSentence(44,9)).toBe('IT IS QUARTER TO TEN');
    expect(time.buildSentence(52,10)).toBe('IT IS TEN TO ELEVEN');
    expect(time.buildSentence(54,11)).toBe('IT IS FIVE TO TWELVE');
    expect(time.buildSentence(60,12)).toBe('IT IS ONE OCLOCK');
    expect(time.buildSentence(0,4)).toBe('IT IS FOUR OCLOCK');
});

test('Builds minute text strings for intervals that aren\'t directly on the hour', () =>{
    expect(time.formatMinuteText(5)).toBe('five past');
    expect(time.formatMinuteText(10)).toBe('ten past');
    expect(time.formatMinuteText(15)).toBe('quarter past');
    expect(time.formatMinuteText(20)).toBe('twenty past');
    expect(time.formatMinuteText(25)).toBe('twenty five past');
    expect(time.formatMinuteText(30)).toBe('half past');
    expect(time.formatMinuteText(35)).toBe('twenty five to');
    expect(time.formatMinuteText(40)).toBe('twenty to');
    expect(time.formatMinuteText(45)).toBe('quarter to');
    expect(time.formatMinuteText(50)).toBe('ten to');
    expect(time.formatMinuteText(55)).toBe('five to');
});