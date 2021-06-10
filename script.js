var chordsList = 'Am,A,A7,B,Bm,B7,Bb,C,C7,Dm,D,D7,E,Em,E7,F,F7,G,Gm,G7';

const loadChords = () => {
    let temp = chordsList.split(',');
    for (let index = 0; index < temp.length; index++) {
        document.getElementById("chordsSelect").innerHTML += `<option value="` + temp[index] + `">` + temp[index] + `</option>`
       
    }
}

loadChords();

// 1 - get the song words
const orgenizeTheWords = () => {
    // textarea with words
    let ta = document.getElementById("wordsTa");
    // if the TA is empty => return;
    if (ta.value.trim() == '') {
        return;
    }
    // get the output board div
    let board = document.getElementById("cordsBoard");
    // load the words inside the board
    board.innerHTML = splitTheWords(ta.value.replaceAll('\n','br '));
}

// 2 - 
const splitTheWords = (str) => {
    let wordsArr = str.split(' ');
    let res = '';
    for (let index = 0; index < wordsArr.length; index++) {        
        res += addSpan(wordsArr[index])
    }
    return res;
} 

// 3 -
const addSpan= (str) => {
    if (str.indexOf('br') > -1) {        
        return '<span class="word" onclick="choosChorde(this)">' + str.replaceAll('br','</span>' + addBlankWords(4)) + addBlankWords(1) + '<br>';
    }
    return '<span class="word" onclick="choosChorde(this)">' + str + '</span>' + addBlankWords(2);
}

// 4 - 
const addBlankWords = (numOfBlankWords) => {
    let res = '';
    for (let index = 0; index < numOfBlankWords; index++) {
        res += '<span class="word" onclick="choosChorde(this)">&nbsp;&nbsp;&nbsp;</span>';  
    }
    return res;
}

// 5 -
var chosenElement;

// 6 - 
const choosChorde = (element) => {
    if (element.innerText.trim() == '') {
        element.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    }
    document.querySelector("#chords > h2 > div > button").disabled = false;
    element.style.backgroundColor = 'rgb(238, 238, 238)';
    chosenElement = element;
}

// 7 -
const ok = () => {
    let select = document.getElementById("chordsSelect");
    let chord = select[select.selectedIndex].value;
    chosenElement.classList.add("chordClass"); 
    chosenElement.setAttribute("chord", chord);
    chosenElement.style.backgroundColor = '#fff';
    document.querySelector("#chords > h2 > div > button").disabled = true;
}

const ask = () => {
    document.querySelector('.alert-bg').style.display = 'block';
}



function browse(tabId) {
    let x = document.querySelectorAll('.tabs');
    for (let index = 0; index < x.length; index++) {
        x[index].style.display = 'none';
    }
    document.getElementById(tabId).style.display = 'block';

    if (tabId == 'chords') {
        orgenizeTheWords();
    }
}
