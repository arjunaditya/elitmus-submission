const containerBox = document.querySelector(".guess_container");

// start game
const startGame = document.querySelector(".start-game");
startGame.addEventListener("click", game);

function game() {
  startGame.classList.add("hide");
  setGame();
}

// level info

// set game
let score = 0;
let roundEnded = true;
let guessBox = document.createElement("div");
let level = 4;
let diff = undefined;

function setGame() {
  diff = Math.floor(Math.random() * level);

  //Set colour for 4 blocks
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  //Set colour for diff blocks
  let red_diff = Math.floor(Math.random() * 255);
  let green_diff = Math.floor(Math.random() * 255);
  let blue_diff = Math.floor(Math.random() * 255);

  while (level-- > 0) {
    roundEnded = false;
    let guessBox = document.createElement("div");
    guessBox.addEventListener("click", () => checkTile(guessBox.id));
    guessBox.id = `guess-box-${level}`;
    guessBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    guessBox.classList.add("guess_box");
    containerBox.appendChild(guessBox);
    if (level == diff) {
      guessBox.style.backgroundColor = `rgb(${red_diff}, ${green_diff}, ${blue_diff})`;
      guessBox.classList.add("guess_box");
      containerBox.appendChild(guessBox);
    }
  }
  return diff;
}

// select tile
// check for correct tile
function checkTile(boxID) {
  if (!roundEnded && boxID.split("guess-box-")[1] == diff) {
    score++;
  }
  console.log(score);
  roundEnded = true;
}
// reset game

// update game

// next level

// guessBox.addEventListener();
