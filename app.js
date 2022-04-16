/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

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
let colorRange = 255;
let diff = undefined;

function setGame() {
  roundEnded = false;
  containerBox.innerHTML = "";
  diff = Math.floor(Math.random() * level);

  //Set colour for 4 blocks
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  //Set colour for diff blocks
  // (color plus or minus a random number between the range) clamped to valid RGB range
  let red_diff =
    red +
    (Math.random() < 0.5 ? -1 : 1 * Math.floor(Math.random() * colorRange));
  let green_diff =
    green +
    (Math.random() < 0.5 ? -1 : 1 * Math.floor(Math.random() * colorRange));
  let blue_diff =
    blue +
    (Math.random() < 0.5 ? -1 : 1 * Math.floor(Math.random() * colorRange));

  for (let i = 0; i < level; ++i) {
    let guessBox = document.createElement("div");
    guessBox.addEventListener("click", () => checkTile(guessBox.id));
    guessBox.id = `guess-box-${i}`;
    guessBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    guessBox.classList.add("guess_box");
    containerBox.appendChild(guessBox);
    if (i == diff) {
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
  } else {
    score--;
  }
  console.log(score);
  roundEnded = true;
  if (
    (level < 8 && score > 4) ||
    (level < 11 && score > 3) ||
    (level < 13 && score > 2) ||
    level >= 13
  ) {
    level = Math.min(level + 1, 15);
  }
  if (
    (level < 8 && score > 6) ||
    (level < 11 && score > 5) ||
    (level < 13 && score > 3) ||
    level >= 13
  ) {
    colorRange = Math.max(10, colorRange - 15);
    if (level < 13) score = 0;
  }
  setGame();
}
// reset game

// update game

// next level

// guessBox.addEventListener();
