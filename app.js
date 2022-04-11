const containerBox = document.querySelector(".guess_container");
let guessBox = document.createElement("div");
let level = 4;

let diff = Math.floor(Math.random()*level)

//Set colour for 4 blocks
var red = Math.floor(Math.random()*255);
var green = Math.floor(Math.random()*255);
var blue = Math.floor(Math.random()*255);

//Set colour for diff blocks
var red_diff = Math.floor(Math.random()*255);
var green_diff = Math.floor(Math.random()*255);
var blue_diff = Math.floor(Math.random()*255);

while (level-- > 0) {
  let guessBox = document.createElement("div");
  guessBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  guessBox.classList.add("guess_box");
  containerBox.appendChild(guessBox);
  if(level == diff){
    guessBox.style.backgroundColor = `rgb(${red_diff}, ${green_diff}, ${blue_diff})`;
    guessBox.classList.add("guess_box");
    containerBox.appendChild(guessBox);
  }
}

guessBox.addEventListener()
