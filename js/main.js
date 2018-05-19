const LEFT = 37;
const RIGHT = 39;

const screens = [...document.querySelectorAll(`template`)].map((tmp) => tmp.content);
const mainCentral = document.querySelector(`.central`);

const showScreen = (screenNumber) => {
  const screen = screens[screenNumber].cloneNode(true);

  mainCentral.innerHTML = ``;
  mainCentral.appendChild(screen);
};

let curScreen = 0;
showScreen(curScreen);

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey) {
    if (evt.keyCode === RIGHT && curScreen + 1 < screens.length) {
      showScreen(++curScreen);
    } else if (evt.keyCode === LEFT && curScreen > 0) {
      showScreen(--curScreen);
    }
  }
});
