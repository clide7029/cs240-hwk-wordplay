var dict = new Array();
var root_words = new Array();
var sub_words = new Array();
var guessed = new Map();


// trim down the dictionary
setUpGame();

// start the game immediately when the page loads
document.addEventListener('DOMContentLoaded', startGame());


/* 
initialize one-time setup of important data structures
*/
function setUpGame() {

    // eliminate all words less than 3 or greater than 6 letters long
    for (i = 0; i < dictionary.length; i++) {
        if (dictionary[i].length <= 6 && dictionary[i].length >= 3) {
            dict.push(dictionary[i]);
        }
    }

    // find possible root words (contain 6 letters)
    for (i = 0; i < dict.length; i++) {
        if (dict[i].length == 6) {
            root_words.push(dict[i]);
        }
    }
}

/* 
checks whether a candidate word is a subword the first word 
@param word the root word
@param subword the candidate subword
 */
function isSubWord(word, subword) {
    let w = word;
    // check each character in candidate sub-word for membership in root-word
    for (let i = 0; i < subword.length; i++) {
        if (w.includes(subword[i])) {
            // remove char from temp word (checking for char duplicates)
            w = w.replace(subword[i], '');
        } else {
            return false;
        }
    }
    return true;
}

/* 
takes a dictionary and a word, creating a sub-array of sub-words
@param word the root-word
@param dict the dictionary of candidate words
@return subwords a sub-array of dict which contains only sub-words of word
 */
function trimDict(word, dict) {
    let i = 0;
    subwords = dict;
    // until there are no valid word left to check:
    while (subwords[i] !== null && typeof subwords[i] !== 'undefined') {
        // see if that word is a sub-word of target root-word
        if (!isSubWord(word, subwords[i])) {
            // if not, get rid of it
            subwords.splice(i, 1);
        } else {
            i++;
        }
    }
    return subwords;
}

/* 
scrambles the order of letters in a String
@param word the word to mix up
@return STRING the scrambled word
 */
function scramble(word) {
    // turn string into array
    arr = word.split('');
    for (let i = 0; i < arr.length - 1; i++) {
        // choose a random idx
        idx = Math.floor(Math.random() * (word.length));

        // swap char
        char = arr[i];
        arr[i] = arr[idx];
        arr[idx] = char;
        word.replace(char, word[idx]);
    }

    // turn array back into string and return it
    return arr.join('');
}

/* 
returns a random word and sets sub_words to be only 
the sub-words of chosen random word
@return word the random word
 */
function getRandomWord() {
    // get random word
    r = Math.floor(Math.random() * (root_words.length - 1));
    word = root_words[r];

    // create array of subwords for chosen random word
    sub_words = trimDict(word, dict);

    return word;
}

/* 
print the current state of the game
@param word the scrambled word to be displayed to user
 */
function printGame(word) {
    console.clear();
    console.log("Available letters: " + word);
    for (let i = 0; i < sub_words.length; i++) {
        if (guessed.get(sub_words[i])) {
            // reveal guessed words
            console.log(sub_words[i]);
        } else {
            // hide unguessed words
            blank = "";
            for (let j = 0; j < sub_words[i].length; j++) {
                blank += '-';
            }
            console.log(blank);
        }

    }
}

/* 
end the game and prompt user to replay 
@param word the goal word to be displayed to user 
@return BOOLEAN whether the user wants to replay
 */
function endGame(word) {
    console.clear();
    console.log("the word was: " + word);

    // reveal all the sub-words
    for (let i = 0; i < sub_words.length; i++) {
        console.log(sub_words[i]);
    }

    console.log("Congratulation, you guessed " + guessed.size + " / " + sub_words.length + " words correctly")

    // clear all global data structures
    dict.splice(0, dict.length);
    root_words.splice(0, root_words.length);
    sub_words.splice(0, sub_words.length);
    guessed.clear();

    // prompt user to replay
    return confirm("want to try again?");
}

/* 
start the game and select a random word
 */
function startGame() {

    // pick a random target word
    word = getRandomWord();

    // get the game going
    if (gameLoop(word)) {
        location.reload(true);
    }

}

/* 
repeatedly prompt user to input guesses
@param word the target root-word
@return BOOLEAN whether the user wants to replay
 */
function gameLoop(word) {

    scram = scramble(word);
    printGame(scram);

    while (true) {
        // prompt the user for input
        guess = prompt("enter a guess:");

        // if they quit or hit cancel, exit
        if (guess === null || guess === "quit") {
            return endGame(word);
        }

        // user wants to scramble word
        if (guess === "*") {
            scram = scramble(scram);
            printGame(scram);
            alert("available letters have been scrambled!");
            continue;
        }

        /* evaluate user's guess */
        if (guessed.get(guess)) {
            // guess already found
            alert("word has already been found");

        } else if (dict.includes(guess)) {
            // guessed correctly
            guessed.set(guess, true);
            alert("you correctly guessed: " + guess);

        } else {
            // guessed is not correct   
            alert("word guessed is not a valid English sub-word (or too long/short)")
        }

        // user guessed all the sub-words. They Win!
        if (guessed.size === sub_words.length) {
            return endGame(word);
        }

        // print current state of the game
        printGame(scram);
    }


}