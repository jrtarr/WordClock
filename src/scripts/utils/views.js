const clockTable = document.getElementById('clock-table');

const clockVector = [
    'ITLISASAMPM',
    'ACQUARTERDC',
    'TWENTYFIVEX',
    'HALFSTENFTO',
    'PASTERUNINE',
    'ONESIXTHREE',
    'FOURFIVETWO',
    'EIGHTELEVEN',
    'SEVENTWELVE',
    'TENSEOCLOCK'
];

//Render the base clock
function renderClock(){
    clockVector.forEach( (row,index) => {
        const newRow = document.createElement('tr');
        newRow.classList.add('clock-row');
        newRow.id = `row-${index}`;
        for(let i=0; i < row.length; i++){
            const letter = row.charAt(i);
            const cell = document.createElement('td');
            cell.classList.add('clock-cell');
            cell.textContent = letter;
            newRow.appendChild(cell);
        };
        clockTable.appendChild(newRow);
    });
};

//Takes in sentence array and turns on specific  letters
function activateTime(timeArray){
    let cursor = [0,0];
    //Loop over each word in the time array looking for letter matches
    timeArray.forEach( word => {
        let wordDetected = false;
        while(!wordDetected){
            const rowString = clockVector[cursor[0]];
            wordDetected = rowString.includes(word,cursor[1]);
            if(wordDetected){
                let index = rowString.search(word);
                const length = (word.length - 1) + index;
                const rowEl = document.getElementById(`row-${cursor[0]}`);
                for(index; index <= length; index++){
                    rowEl.children[index].classList.toggle('on');
                    if(cursor[1] > 10){
                        cursor[1] = 0;
                    }else{
                        cursor[1] = index;
                    }
                };
            }else{
                cursor[0] += 1;
                cursor[1] = 0;
            }
        };
    });
};

//Turns off all letters when the 5 minute interval hits
function clearTime(){
    clockVector.forEach((row,index)=>{
        const rowEl = document.getElementById(`row-${index}`);
        for(let i = 0; i < row.length; i++){
            rowEl.children[i].classList.remove('on');
        };
    });
};

export {renderClock,activateTime,clearTime};