var dict = new Array();
var root_words = new Array();
var child_map = new Map();
var word_exists = new Map();
var checked = new Array();
var sub_words = new Array();
// var sub_set = new Set();


function getRootWords() {
    // find possible root words (contain 6 letters)
    for (i = 0; i < dict.length; i++) {
        if (dict[i].length == 6) {
            root_words.push(dict[i]);
            child_map.set(dict[i], subwords = new Set());
            word_exists.set(dict[i], true);
        }
    }
}




// function getSubWords(word, sub_set) {
//     let subword;
//     for (i = 0; i < word.length; i++) {
//         subword = "";
//         if (i == 0) {
//             subword = word.slice(i + 1, word.length);

//         } else if (i == word.length - 1) {
//             subword = word.slice(0, i - 1);
//             console.log("here");

//         } else {
//             subword = subword.concat(word.splice(0, i - 1));

//             console.log("string" + subword);

//             subword = subword.concat(word.splice(i + 1, word.length - 1));
//         }

//         console.log(subword);

//         if (word_exists.has(subword)) {
//             sub_set.add(subword);

//         } else {
//             console.log("not a valid word");
//         }
//         getSubWords(subword, sub_set);
//     }
//     // return 
// }

function arrayify(string) {
    const array = [];
    for (i = 0; i < string.length; i++) {
        array.push(string[i]);
    }
    return array;
}

function removeNonCandidateWords(word, dictionary) {
    let dict = dictionary;
    j = 0;
    for (i = 0; i < dict.length; i++) {
        //     word_arr = arrayify(dict[i]);
        //     word_arr.map(char => {
        //         if (!(word.includes(char))) {
        //             console.log("removed");
        //             dict.splice(i, 1);
        //             j = 0;
        //         }
        //         j++;
        //     })
        if (i >= dict.length) {
            console.log("ERRRRORR");
            break;
        }

        while (typeof dict[i] !== 'undefined') {
            // console.log(dict[i].slice(j, j + 1));
            // console.log(dict[i]);
            //  || j >= word.length
            let wordCandidate = dict[i];
            if (!(word.includes(wordCandidate[j]))) {
                sub = dict.splice(i, 1);
                console.log("removed [ " + sub + " ]");
                j = 0;
            }
            j++;
        }
        console.log("j = " + j);
        console.log(dict[i]);
    }
    return dict;
}



function startGame() {

    for (i = 0; i < dictionary.length; i++) {
        if (dictionary[i].length <= 6 && dictionary[i].length >= 3) {
            dict.push(dictionary[i]);
        }
    }

    getRootWords();

    var word = "logger";
    var subword = "gore";
    var sub = "george";


    // var sub_set = child_map.get(word);


    getSubWords(word, sub_set);

    dict = removeNonCandidateWords(word, dict);





    console.log(dict);

}

function gameLoop() {

    while ((guess = prompt("enter a guess:")) !== "quit") {
        if (guess === null) {
            console.log("canceled");
            break;
        }
        console.log(guess);

    }


}