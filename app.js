const containerBox = document.querySelector(".guess_container");
let guessBox = document.createElement("div");
let level = 5;

guessBox.classList.add("guess_box");
containerBox.appendChild(guessBox);

while (level-- > 0) {
  containerBox.innerHTML += `<div class="guess_box"></div>`;
}
