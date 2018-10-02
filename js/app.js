//Array to hold our cards
 let icons=["fa fa-diamond","fa fa-diamond","fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb","fa fa-paper-plane-o","fa fa-paper-plane-o"];



const cardsContainer = document.querySelector(".deck");

let openedCards=[];
let matchedCards=[];


//create the cards
function startgame(){
	//icons=shuffle(icons);
for(let i=0; i<icons.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML=`<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);


    
    click(card);
  }
}



  // After click

  function click(card) {
   
  card.addEventListener("click", function() {
  

      const currentCard = this;
      const previousCard = openedCards[0];
      //we have an existing opened card
      if(openedCards.length === 1 ) {

        card.classList.add("open","show","disable");
        openedCards.push(this);

      //we should compare our 2 opened cards!
      compare(currentCard,previousCard);

   }



   else{

   	currentCard.classList.add("open","show","disable");
   	openedCards.push(this);
   }



  });


}


function compare(currentCard,previousCard){



       if(currentCard.innerHTML === previousCard.innerHTML){

       	 currentCard.classList.add("match");
       	 previousCard.classList.add("match");

       	 matchedCards.push(currentCard,previousCard);

       	 openedCards=[];

       	 
       	 isOver();


       }else{
         
         
          setTimeout(function() {
            currentCard.classList.remove("open","show","disable");
       	    previousCard.classList.remove("open","show","disable");
            openedCards=[];
          },200);
       

       	
       }
       addMove();
}


function isOver() {
	
   if(matchedCards.length === icons.length){

       var modal=document.getElementById("myModal");
       //alert(`Congratulations.You have won the game by ${moves} moves and ${minute} minute ${second} seconds`);
      const winMessage = document.querySelector(".modal-message");
      modal.style.display="block";

      const successMovesContainer=document.querySelector(".successMoves");
      successMovesContainer.innerHTML=moves + 1;

      const rankContainer = document.querySelector( ".playerRanking" );
      rankContainer.innerHTML =   starsContainer.innerHTML;

  // Add time to the Modal

 const totalHours       = document.querySelector("#totalHours");

 const totalMinutes     = document.querySelector("#totalMinutes");

 const totalSeconds     = document.querySelector("#totalSeconds");

    totalHours.innerHTML   = hour;

    totalMinutes.innerHTML = minute;

    totalSeconds.innerHTML = second;




    var timer=document.querySelector(".timer");
    timer.innerHTML=`0 mins 0 secs`;
    clearInterval(interval);
   }

}


const playAgainBtn = document.querySelector( ".play-again" );

playAgainBtn.addEventListener( "click", function() {

  // Start the game again from within the modal
cardsContainer.innerHTML="";
    startgame();

  matchedCards=[];
  openedCards=[];
  moves=0;
  movesContainer.innerHTML=moves;
  starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

  //reset timer
  var timer=document.querySelector(".timer");
  timer.innerHTML=`0 mins 0 secs`;
  clearInterval(interval);

var modal = document.getElementById('myModal');
modal.style.display = "none";

} );


const closeBtn =document.querySelector(".close");
closeBtn.addEventListener("click",function(){
  var modal = document.getElementById('myModal');
modal.style.display = "none";

});





//To count the number of moves
const movesContainer=document.querySelector(".moves");
let moves=0;
movesContainer.innerHTML=0;
function addMove(){
	moves++;
	movesContainer.innerHTML=moves;
	if(moves===1){
		second=0;
		minute=0;
		hour=0;
		startTimer();
	}
	rating();
}


//Rating
const starsContainer = document.querySelector(".stars");
function rating() {
	if(moves>15 && moves<26){
		starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
	}
	else if(moves>25){
		starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li>`;
	}else{
		starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
	}
}



//Restart the game
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click",function(){

    cardsContainer.innerHTML="";
    startgame();

	matchedCards=[];
  openedCards=[];
	moves=0;
	movesContainer.innerHTML=moves;
	starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

	//reset timer
	var timer=document.querySelector(".timer");
	timer.innerHTML=`0 mins 0 secs`;
	clearInterval(interval);

var modal = document.getElementById('myModal');
modal.style.display = "none";
});









//Start the game 
startgame();

//game timer

var second=0, minute=0;
var timer=document.querySelector(".timer");
var interval;
function startTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute +" mins" + second + "secs";
		second++;
		if(second===60){
			minute++;
			second=0;
		}
		if(minute===60){
			hour++;
			minute=0;
		}
	},1000);
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}






