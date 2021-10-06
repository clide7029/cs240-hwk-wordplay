var dict = new Array();
var root_words = new Array();
var sub_words = new Array();
var guessed = new Map();


document.addEventListener('DOMContentLoaded', startGame());

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

function scramble(word) {
    arr = word.split('');
    for (let i = 0; i < arr.length - 1; i++) {
        idx = Math.floor(Math.random() * (word.length));

        char = arr[i];
        arr[i] = arr[idx];
        arr[idx] = char;
        word.replace(char, word[idx]);
    }

    return arr.join('');
}

function printGame(word) {
    console.clear();
    console.log("Available letters: " + word);
    for (let i = 0; i < sub_words.length; i++) {
        if (guessed.get(sub_words[i])) {
            console.log(sub_words[i]);
        } else {
            blank = "";
            for (let j = 0; j < sub_words[i].length; j++) {
                blank += '-';
            }
            console.log(blank);
        }

    }
}

function endGame(word) {
    console.clear();
    console.log("the word was: " + word);
    for (let i = 0; i < sub_words.length; i++) {
        console.log(sub_words[i]);
    }
    console.log("Congratulation, you guessed " + guessed.size + " / " + sub_words.length + " words correctly")

    sub_words.splice(0, sub_words.length);
    guessed.clear();

    return confirm("want to try again?");
}

function startGame() {

    for (i = 0; i < dictionary.length; i++) {
        if (dictionary[i].length <= 6 && dictionary[i].length >= 3) {
            dict.push(dictionary[i]);
        }
    }

    getRootWords();

    let r = Math.floor(Math.random() * (root_words.length - 1));
    // let word = "bat";
    let word = root_words[r];
    sub_words = trimDict(word, dict);

    if (gameLoop(word)) {
        location.reload(true);
        startGame();
    }

}


function gameLoop(word) {

    scram = scramble(word);
    printGame(scram);

    while (true) {
        guess = prompt("enter a guess:");
        if (guess === null || guess === "quit") {
            return endGame(word);
        }

        // user wants to scramble word
        if (guess === "*") {
            scram = scramble(scram);
            alert("available letters have been scrambled!");
        }

        // update list of guessed
        if (dict.includes(guess)) {
            guessed.set(guess, true);
            alert("you guessed: " + guess);
        }

        if (guessed.size === sub_words.length) {
            endGame(word);
        }
        printGame(scram);
    }


}