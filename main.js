var inputLetter;                    //letter which has been inputted
var imageNumber;                    //image number ehich has to be displayed
var chosenCategory;                 //chosen category of the word to be guessed
var categories;                     //all category names
var countCorrectGuesses;            //correct guesses counter
var lives = 10;                          //count of lives
var correctGuessCount;              // 'counter' in reference project This counts the number of correct guesses
var storedGuess = [];               //Stored guesses
var guess;                          // Geuss
var space;                          // Number of spaces in word ' '
var correct;
var answer;
var letterGuessedAlready = [];
var categoryName = document.getElementById("categoryName");
var chancesRemaining = document.getElementById("chancesRemaining");                //number of chances remaining
var showClue = document.getElementById('hint');
var spacemanImage = document.getElementById('spacemanImg');


// This function will be called when a letter has been inputed in the textfield
function inputOnchange() {
    let characterInput = document.getElementById("characterInput").value.toUpperCase();
    console.log('characterInput:'+characterInput);
    if(characterInput === " ") {
        alert("Spacebar is not considered as a character. Please guess some other letter.");
    }
    else {
        check(characterInput);
    }
}

//Category selector
var categorySelector = function () {
    if (chosenCategory == categories[0]) {
        categoryName.innerHTML = "Sports";
    } else if (chosenCategory == categories[1]) {
        categoryName.innerHTML = "Hollywood Movies";
    } else if (chosenCategory == categories[2]) {
        categoryName.innerHTML = "Cities Across The World";
    }
}


// Create geusses ul
result = function () {
    answer = document.getElementById('answer');
    createUL = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
        createUL.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === " ") {
            guess.innerHTML = " ";
            space = 1;
        } else {
            guess.innerHTML = "_";
        }

        storedGuess.push(guess);
        answer.appendChild(createUL);
        createUL.appendChild(guess);
    }
}

imageUpdater = function (imageNumber) {
    spacemanImage.src = "images/chancesRemaining-"+imageNumber+".jpeg";
}

//Counter of remaining lives (comments function in default project)
var remainingLivesCounter = function () {
    console.log("lives"+lives);
    chancesRemaining.innerHTML = "Chances Remaining: "+lives;
    if (lives < 1) {
        chancesRemaining.innerHTML= "Oh No! You lost! Better luck next time!";
        imageUpdater(0);
        document.getElementById('answer').style.visibility = "hidden";
        document.getElementById('answer').style.width = 0;
        document.getElementById('answer').style.height = 0;
        console.log('The answer is:'+answer);
        document.getElementById("onWrongGuessesAnswer").innerHTML = 'The answer is: '+answer;
    }
    else{
        //chancesRemaining.innerHTML = lives;
        document.getElementById('answer').style.visibility = "visible";
        imageUpdater(lives);
    }

    for (var i = 0; i < storedGuess.length; i++) {
        console.log('storedGuess: ' + storedGuess[i].value + ' storedGuess.length: ' + storedGuess.length);
        if ((countCorrectGuesses + space) === storedGuess.length) {
            // showLives.innerHTML = "You Win!";
            chancesRemaining.innerHTML = "Congratulations! You Win!"
            document.getElementById('answer').style.visibility = "visible";
        }
    }
}

// onInput Function
check = function (input) {
    var letterGuessed='';
    //letterGuessedAlready.concat(input);
    characterInput.value = "";
    // this.setAttribute("class", "active");
    // this.onclick = null;
    // if(letterGuessedAlready.length == 0){
    //     //letterGuessedAlready.splice(0,0,input);
    //     letterGuessedAlready.concat(input);
    //     console.log('Empty array');
    // }
    // else{
    //     letterGuessedAlready.push(input);
    //     console.log('letters guessed1:'+letterGuessedAlready);
    // }

    if(letterGuessedAlready.length == 0){
        console.log('if condition input letter:'+input);
        letterGuessed = input;
        letterGuessedAlready.splice(0,0,input);
        console.log('Empty letterGuessedAlready array');
    }
    else{
        // for(let i=0; i<letterGuessedAlready.length;i++){
        //     if(input !== letterGuessedAlready[i]){
        //         alert('That letter has already been guessed. Please enter another letter.')
        //     }
        //     else{
        //         letterGuessedAlready.push(input);
        //     }
        // }
        if(letterGuessedAlready.includes(input)){
            alert('That letter "'+ input +'" has already been guessed. Please enter another letter.');
        } else{
            console.log('else condition inside else condition input letter:'+input);
            letterGuessed = input;
            console.log('letters guessed:'+letterGuessed);
            letterGuessedAlready.push(input);
        }
        console.log('letterGuessedAlready:'+letterGuessedAlready);
    }

    for (var i = 0; i < word.length; i++) {
        console.log('word: ' + word[i] + ' word.length: ' + word.length);
        answer = word;
    
        if (word[i] === letterGuessed) {
            storedGuess[i].innerHTML = letterGuessed;
            // correctGuessCount += 1;
            countCorrectGuesses+=1;
        }
    }
    var indexOfLetterGuessed = (word.indexOf(letterGuessed));
    console.log('indexOfLetterGuessed: ' + indexOfLetterGuessed);
    if (indexOfLetterGuessed === -1) {
        lives -= 1;
        remainingLivesCounter();
        //animate();
    } else {
        remainingLivesCounter();
    }
}

//game initialization
gameInit = function () {
    categories = [
        ['CRICKET', 'HOCKEY', 'FOOTBALL', 'SOCCER', 'TENNIS', 'BASEBALL', 'CHESS'],
        ['THOR', 'BATMAN', 'THE IMITATION GAME', 'HARRY POTTER', 'THE GODFATHER'],
        ['ROSARIO', 'NEW YORK CITY', 'PRAGUE', 'AGRA', 'MANCHESTER']
    ];
    chosenCategory = categories[Math.floor(Math.random() * categories.length)];

    console.log('chosenCategory:' + chosenCategory);

    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];

    word = word.replace(/\s/g, " ");

    console.log('word:' + word);

    hints = [
        ["A game played using bat, ball and stumps.", "A game where goal is scored using stick, and ball.", "A game where 7 points are given when a end is crossed.", "A game where goal is scored by kicking ball into the net.", "A game involving 2 players hitting a ball towards each other.", "A game where point is scored by making homrerun.", "The game is won when you checkmate the opponent."],
        ["First full movie of God of Thunder", "Complete the phrase: I am -----", "Movie based on life of Alan Turing", "Series based on magic world. Main character: The boy who lived.", "I'm going to make an offer he can't refuse"],
        ["Birth place of Leo Messi", "The city in USA also known as Big Apple", "Capital of Czech Republic", "City of Taj Mahal", "City in England with teams named 'City' and 'United'"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = hints[catagoryIndex][hintIndex];
    storedGuess = [];
    lives = 10;
    space = 0;
    countCorrectGuesses = 0;
    result();
    remainingLivesCounter();
    categorySelector();
    imageUpdater(10);
}

gameInit();



document.getElementById('playAgain').onclick = function () {
   // correct.parentNode.removeChild(correct);
    createUL.parentNode.removeChild(createUL);
    letterGuessedAlready = [];
    // showClue.innerHTML = "";
    // context.clearRect(0, 0, 400, 400);
    gameInit();
}
