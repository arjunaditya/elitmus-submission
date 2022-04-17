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

const containerBox = document.querySelector(".guess-container");
const infoContainer = document.querySelector(".info-container");
const scoreDiv = document.querySelector("#score");
const levelDiv = document.querySelector("#level");

// start game
const startGame = document.querySelector(".start-game");
startGame.addEventListener("click", game);

function game() {
  startGame.classList.add("hide");
  infoContainer.classList.remove("hide");
  setGame();
}

// level info

// set game
let intScore = 0;
let score = 0;
let roundEnded = true;
let guessBox = document.createElement("div");
let level = 3;
let colorRange = 200;
let diff = undefined;
let diffInc = true;

function genRandDiff() {
  return Math.random() < 0.5 ? -1 : 1 * Math.floor(Math.random() * colorRange);
}

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
  let red_diff = (red + genRandDiff()).clamp(0, 255);
  let green_diff = (green + genRandDiff()).clamp(0, 255);
  let blue_diff = (blue + genRandDiff()).clamp(0, 255);

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
  scoreDiv.textContent = `Score: ${score}`;
  levelDiv.textContent = `Level: ${level - 2}`;
  return diff;
}

// select tile
// check for correct tile
function checkTile(boxID) {
  if (!roundEnded && boxID.split("guess-box-")[1] == diff) {
    intScore++;
    score++;
    scoreDiv.style.color = "green";
    // alert(`Correct!\nYour score is: ${score}`);
  } else {
    intScore--;
    scoreDiv.style.color = "red";
    // alert(`Wrong!\nYour score is: ${score}`);
  }
  levelDiv.style.color = "black";
  roundEnded = true;
  if (
    diffInc &&
    ((level < 4 && intScore > 3) ||
      (level >= 4 && level < 6 && intScore > 2) ||
      (level >= 6 && level < 8 && intScore > 1) ||
      level >= 8)
  ) {
    level = Math.min(level + 1, 10);
    if (level <= 9) {
      // alert(`New Level Reached 🎉🎉🎉\nLEVEL ${level - 2}`);
      levelDiv.style.color = "green";
    }
    diffInc = false;
  }
  if (
    (level < 4 && intScore > 4) ||
    (level >= 4 && level < 6 && intScore > 3) ||
    (level >= 6 && level < 8 && intScore > 2) ||
    level >= 8
  ) {
    colorRange = Math.max(20, colorRange - 3 * level);
    if (level < 9) intScore = 0;
    diffInc = true;
  }
  // console.table({ intScore, level, colorRange });
  setGame();
}
