var imageNumber;
var chosenCategory;
var categories;
var countCorrectGuesses;
var lives = 10;
var storedGuess = [];
var guess;
var space;
var answer;
var letterGuessedAlready = [];

var categoryName = document.getElementById("categoryName");
var chancesRemaining = document.getElementById("chancesRemaining");
var showClue = document.getElementById('hint');
var spacemanImage = document.getElementById('spacemanImg');

//Onchange function of input field
function inputOnchange() {
    let characterInput = document.getElementById("characterInput").value.toUpperCase();
    if(characterInput === " ") {
        alert("Space is not considered as a character. Please guess some other letter.");
    }
    else {
        check(characterInput);
    }
}

//Category selector, it is selected automatically
var categorySelector = function () {
    if (chosenCategory == categories[0]) {
        categoryName.innerHTML = "Sports";
    } else if (chosenCategory == categories[1]) {
        categoryName.innerHTML = "Hollywood Movies";
    } else if (chosenCategory == categories[2]) {
        categoryName.innerHTML = "Cities Across The World";
    }
}

// Create ul for displaying name
result = function () {
    answer = document.getElementById('answer');
    createUL = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
        createUL.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === " ") {
            guess.innerHTML = " ";
            space += 1;
        } else {
            guess.innerHTML = "_";
        }

        storedGuess.push(guess);
        answer.appendChild(createUL);
        createUL.appendChild(guess);
    }
}

//Image which is updated on the screen on wrong guess is called below
imageUpdater = function (imageNumber) {
    spacemanImage.src = "images/chancesRemaining-"+imageNumber+".jpeg";
}

//Counter of remaining lives (comments function in default project)
var remainingLivesCounter = function () {
    chancesRemaining.innerHTML = "Chances Remaining: "+lives;
    if (lives < 1) {
        chancesRemaining.innerHTML= "Oh no, you lost! Better luck next time!";
        imageUpdater(0);
        document.getElementById('answer').style.visibility = "hidden";
        document.getElementById('answer').style.width = 0;
        document.getElementById('answer').style.height = 0;
        document.getElementById("onWrongGuessesAnswer").innerHTML = 'The answer is: '+answer;
        document.getElementById('onWrongGuessesAnswer').style.width = "initial";
        document.getElementById('onWrongGuessesAnswer').style.height = "initial";
    }
    else{
        document.getElementById('answer').style.visibility = "visible";
        imageUpdater(lives);
    }

    for (var i = 0; i < storedGuess.length; i++) {
        if ((countCorrectGuesses + space) === storedGuess.length) {
            chancesRemaining.innerHTML = "Congratulations! You Win!"
            document.getElementById('answer').style.visibility = "visible";
        }
    }
}

// onInput Function
check = function (input) {
    var letterGuessed='';
    characterInput.value = "";

    if(letterGuessedAlready.length == 0){
        letterGuessed = input;
        letterGuessedAlready.splice(0,0,input);
        document.getElementById('lettersGuessed').innerHTML = "Letters already guessed: "+letterGuessedAlready;
    }
    else{
        if(letterGuessedAlready.includes(input)){
            alert('That letter "'+ input +'" has already been guessed. Please enter another letter.');
        } else {
            letterGuessed = input;
            letterGuessedAlready.push(input);
            document.getElementById('lettersGuessed').innerHTML = "Letters already guessed: "+ letterGuessedAlready;
        }
    }

    for (var i = 0; i < word.length; i++) {
        answer = word;
    
        if (word[i] === letterGuessed) {
            storedGuess[i].innerHTML = letterGuessed;
            countCorrectGuesses+=1;
        }
    }
    var indexOfLetterGuessed = (word.indexOf(letterGuessed));
    if (indexOfLetterGuessed === -1) {
        lives -= 1;
        remainingLivesCounter();
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

    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];

    word = word.replace(/\s/g, " ");

    hints = [
        ["A game played using bat, ball and stumps.", "A game where goal is scored using stick and ball and each team has 11 players.", "A game where 7 points are given when a player reaches the end line.", "A game where goal is scored by kicking ball into the net.", "A game involving 2 or 4 players hitting a ball with racket across the net.", "A game where point is scored by making homerun.", "The game is won when you checkmate the opponent."],
        ["First full movie of God of Thunder", "Complete the phrase: I am -----", "Movie based on life of Alan Turing", "Movie series based on magic world. Main character:- The boy who lived.", "Famous Dialogue:- I'm going to make an offer he can't refuse"],
        ["Birth place of Leo Messi", "The city in USA also known as Big Apple", "Capital of Czech Republic", "City of Taj Mahal", "City in England with teams named 'City' and 'United'"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = hints[catagoryIndex][hintIndex];
    document.getElementById('lettersGuessed').innerHTML = "No letters guessed yet!"
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


//Play again button onclick
document.getElementById('playAgain').onclick = function () {
    createUL.parentNode.removeChild(createUL);
    document.getElementById('answer').style.width = "initial";
    document.getElementById('answer').style.height = "initial";
    document.getElementById('onWrongGuessesAnswer').style.visibility = "hidden";
    document.getElementById('onWrongGuessesAnswer').style.width = 0;
    document.getElementById('onWrongGuessesAnswer').style.height = 0;
    letterGuessedAlready = [];
    gameInit();
}