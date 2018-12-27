// var colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// ];
numSquares = 6;
var colors = generateRandomColors(numSquares);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();//Funk. za random boju smo def. na dnu
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;//span elem. sa id-om colorDisplay prosljedjuemo odabranu boju cije je vrijednost random zbog funkcije pickColor()
var messageDisplay = document.querySelector("#message");//Za ispisivanje poruke ispod glavnog naslova
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function(){
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){//Ako postoji boja pri tom indexu
			squares[i].style.background = colors[i];//promijeniti boju prva tri kvadrata
		} else {
			squares[i].style.display = "none";//Za druga tri kvadrata stavljamo da ne budu prikazani da se ne vide
		}
	}
});

hardBtn.addEventListener("click", function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {		
			squares[i].style.background = colors[i];//promijeniti boju prva tri kvadrata		
			squares[i].style.display = "block";//Za druga tri kvadrata stavljamo da ne budu prikazani da se ne vide
		}
});

resetButton.addEventListener("click", function(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;

	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = colors[i];
	}
	messageDisplay.textContent = "";//Kada odemo na play again brisemo correct
	resetButton.textContent = "New Colors";
	h1.style.background = "steelblue";
});

for (var i = 0; i < squares.length; i++) {
		//add initial colors to squares
		squares[i].style.background = colors[i];

		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;//boja kvadrata smjestamo u ovu promj.	
			//compare color to pickedColor
			if(clickedColor == pickedColor){//Ako je odabrana boja jednaka hardkodiranoj:
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);//Odabranu boju sa click eventom prosljedjujemo funk. changeColors()
				
				h1.style.background = clickedColor;
				

			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
}

function changeColors(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.background = color;//Svim kvadratima se dodjeljuje ista boja
	}	
}

function pickColor(){//Za random broj za  odabir boje:
	//Zaokruzujemo broj a odsijecamo decimalna mjesta sa floor():
	var random = Math.floor(Math.random() * colors.length);//bit ce svi indexi od 0 - 5 kolika je duzina niza
	return colors[random];//Vracamo taj random broj i prosljedjujemo ga colors nizu kojeg vracamo a to znaci da ce sa tim random brojem neka boja iz niza biti odabrana shodno indexu
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
	 //get random color and push into array
	 arr.push(randomColor());//6 ce random rgb boja biti stavljeno u niz
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a red from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a green from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a blue from 0 - 255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b +")";
}