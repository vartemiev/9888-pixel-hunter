const mainCentral = document.querySelector(`.central`);

export const showScreen = (screenElement) => {
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(screenElement);
};
