// Declare error counter 
var errorCounter = 0
// Declare matching pair counter
var matchPairCounter=0
// Declare a card set
var setOfCard
// Declare Number of Rows and Column
var maxNumberOfRows = 4
var maxNumberOfColumns =5
// Declare variable for selected card
var firstCardSelected
var secondCardSelected
// Declare currentBoard array to store card
var currentBoard = []
// Declare the array of image name
var cardImageName = ["boo","bowser-jr","bowser","daisy","diddy","donkey","luigi","mario","peach","yoshi"]

const correctSound = new Audio("/assets/super_mario_bros.mp3")

window.onload = function() { // Add function to window when loading
    shuffleCards();
    startGame();
}

function shuffleCards() {
    /*
        Function: Generate random 28 sets of card
        Param: None
        Return: None
    */
    setOfCard = cardImageName.concat(cardImageName); //two of each card
    console.log("Begin List: " + setOfCard);
    //shuffle
    for (let i = 0; i < setOfCard.length; i++) {
        let j = Math.floor(Math.random() * setOfCard.length); //get random index
        //swap
        let temp = setOfCard[i];
        setOfCard[i] = setOfCard[j];
        setOfCard[j] = temp;
    }
    console.log("After Shuffle: " + setOfCard);
}

function startGame() {
    /*
    Function: starting the game
    Parameter: None
    Return: None
    */

    //arrange the currentBoard 4x5
    for (let row = 0; row < maxNumberOfRows; row++) {
        let cards = [];
        for (let column = 0; column < maxNumberOfColumns; column++) {
            let cardImg = setOfCard.pop();
            cards.push(cardImg); //JS

            // <img id="0-0" class="card" src="water.jpg">
            let card = document.createElement("img"); //create img element for card
            card.id = row.toString() + "-" + column.toString(); //assign ID for each card
            card.src = "/assets/" + cardImg + ".png"; // assign src img for each card
            card.classList.add("card"); //assign class for the card
            card.addEventListener("click", selectCard); //assign listener for on click
            document.getElementById("board").append(card); // add card to the currentBoard
        }
        currentBoard.push(cards); //add cards to currentBoard array
    }
    console.log("My Current Board: " + currentBoard);
    setTimeout(hideCards, 5000);
}

function hideCards() { 
    /*
    Function: hiding the cards after selecting incorrect cards
    Parameter: None
    Return: None
    */
    for (let row = 0; row < maxNumberOfRows; row++) {
        for (let column = 0; column < maxNumberOfColumns; column++) {
            let card = document.getElementById(row.toString() + "-" + column.toString()); // assign card to according element
            card.src = "/assets/question-block.jpg"; // assign card src
        }
    }
}

function selectCard() {
    /*
    Function: selecting the card
    Parameter: None
    Return: None
    */
    if (this.src.includes("question-block")) { // if card src contains question block cover img is true
        //console.log("Card1: ", firstCardSelected)
        //console.log("Card2: ",secondCardSelected)
        if (!firstCardSelected) {  //nested if  // if firstCardSelected is null
            firstCardSelected = this; // card 1 = selected card

            let coords = firstCardSelected.id.split("-"); //"0-1" -> ["0", "1"]  //split id into 2 element in arr
            let row = parseInt(coords[0]);//convert card to integer in arr
            let column = parseInt(coords[1]);

            firstCardSelected.src = "/assets/" + currentBoard[row][column] + ".png"; //choose a card in the declared currentBoard above
        }
        else if (!secondCardSelected && this != firstCardSelected) {  // if card 2 is null and chosen card is diff than card 1
            secondCardSelected = this; //card 2 is selected

            let coords = secondCardSelected.id.split("-"); //"0-1" -> ["0", "1"] // split id into 2 elements in arr
            let row = parseInt(coords[0]); //convert card to integer in arr
            let column = parseInt(coords[1]);

            secondCardSelected.src = "/assets/" + currentBoard[row][column] + ".png"; //choose a card in the declared currentBoard above
            setTimeout(update, 1000);
        }
        //console.log("Card1: ", firstCardSelected) 
        //console.log("Card2: ",secondCardSelected)
    }
}

function update() {
    /*
    Function: update the function when there are matching pairs vs unmatching pairs 
    Parameter: counter
    Return: None
    */     
    if (firstCardSelected.src != secondCardSelected.src) { //if cards aren't the same, flip both back
        firstCardSelected.src = "/assets/question-block.jpg"; //flip back to question-block img
        secondCardSelected.src = "/assets/question-block.jpg";
        errorCounter += 1; //if there's unmatching pairs, add 1+ to errors
        document.getElementById("errors").innerText = errorCounter; //change the errors counter of id element in html
        isLose(errorCounter)
    }
    else {
        playSound() 
        pauseSound()
        matchPairCounter += 1;
        console.log("match: " , matchPairCounter)
        isWin(matchPairCounter)  
    }
    resetSelectedCard()
}

function isLose(counter){
    /*
    Function: if count to 2 unmatching pairs, player lose. Then show alert 
    Parameter: counter
    Return: None
    */ 
    if(counter === 2 ){
        alert("Loser")
        return
    }
}

function isWin(counter){
    /*
    Function: if count to 10 matching pairs, player wins. Then show alert and play sounds
    Parameter: counter
    Return: None
    */ 
    if (counter === 3){
        playSound()
        alert("Winner Chicken Dinner")
        return
    }
}

function resetSelectedCard(){
    /*
    Function: reset card value to null
    Parameter: None
    Return: None
    */        
    firstCardSelected = null; 
    secondCardSelected = null; 
}

function playSound (){
    /*
    Function: if cards are the same, play congrats sounds
    Parameter: None
    Return: None
    */    
    correctSound.play()
}

function pauseSound () { 
    /*
    Function: set time for sounds to 1s
    Parameter: None
    Return: None
    */
    setTimeout(function(){
        correctSound.pause();
    },1000);
}

