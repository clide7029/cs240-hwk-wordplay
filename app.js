var dict = new Array();
var root_words = new Array();
var sub_words = new Array();
var guessed = new Map();


function getRootWords() {
    // find possible root words (contain 6 letters)
    for (i = 0; i < dict.length; i++) {
        if (dict[i].length == 6) {
            root_words.push(dict[i]);
        }
    }
}

function isSubWord(word, subword) {
    let w = word;
    let seen = [];
    for (let i = 0; i < subword.length; i++) {
        if (w.includes(subword[i])) {
            w = w.replace(subword[i], '');
            seen.push(subword[i]);
        } else {
            return false;
        }
    }
    return true;
}

function trimDict(word, dict) {
    let i = 0;
    subwords = dict;
    while (subwords[i] !== null && typeof subwords[i] !== 'undefined') {
        if (!isSubWord(word, subwords[i])) {
            // console.log("removed [ " + subwords[i] + " ]");
            subwords.splice(i, 1);
        } else {
            i++;
        }
    }
    return subwords;
}




function startGame() {

    for (i = 0; i < dictionary.length; i++) {
        if (dictionary[i].length <= 6 && dictionary[i].length >= 3) {
            dict.push(dictionary[i]);
        }
    }

    getRootWords();

    let r = Math.floor(Math.random() * (root_words.length - 1));
    let word = root_words[r];
    sub_words = trimDict(word, dict);

    gameLoop(word);

}


function gameLoop(word) {


    while (true) {
        guess = prompt("enter a guess:");
        if (guess === null || guess === "quit") {
            console.log("canceled");
            break;
        }

        if (guess === "*") {
            scram = scramble(scram);
            alert("available letters have been scrambled!");
        }
        if (dict.includes(guess)) {
            guessed.set(guess, true);
            alert("you guessed: " + guess);
        }

    }


}