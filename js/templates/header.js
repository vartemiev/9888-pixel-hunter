import {createElement} from '../create-element';

const LIVES_COUNT = 3;

export default (data) => {
  const {livesCount, gameStatisticsOn, goBack} = data;

  const lives = Array(LIVES_COUNT)
      .fill(`img/heart__full.svg`, 0, livesCount)
      .fill(`img/heart__empty.svg`, livesCount, LIVES_COUNT + 1);

  const template = `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    ${gameStatisticsOn ? (`
      <h1 class="game__timer"></h1>
      <div class="game__lives">
        ${lives.map((life) => `
          <img src="${life}" class="game__heart" alt="Life" width="32" height="32">
        `).join(``)}
      </div>
    `) : ``}
  `;

  const header = createElement(template, {elem: `header`, classList: [`header`]});
  header.querySelector(`.back`).addEventListener(`click`, goBack);

  return header;
};

