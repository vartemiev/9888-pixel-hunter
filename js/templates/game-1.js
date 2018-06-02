import {createElement, composeElements} from '../create-element';
import getHeader from './header';
import getFooter from './footer';
import getProgress from './progress';
import {PicTypes} from "../constants";

export default (data) => {
  const {livesCount, options, answers, goBack, setAnswer} = data;

  const template = `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${options.map((option, i) => `
        <div class="game__option">
          <img src="${option.src}" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input name="question${i + 1}" type="radio" value="${PicTypes.PHOTO}">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${i + 1}" type="radio" value="${PicTypes.PAINTING}">
            <span>Рисунок</span>
          </label>
        </div>
      `).join(``)}
    </form>
    <div class="stats">
    </div>
  `;

  const firstGame = createElement(template, {classList: [`game`]});

  firstGame.addEventListener(`change`, () => {
    const checkedButtons = firstGame.querySelectorAll(`[type="radio"]:checked`);

    if (checkedButtons.length === 2) {
      setAnswer({first: checkedButtons[0].value, second: checkedButtons[1].value});
    }
  });

  firstGame.querySelector(`.stats`).appendChild(getProgress({answers}));

  return composeElements([
    getHeader({gameStatisticsOn: true, livesCount, goBack}),
    firstGame,
    getFooter()
  ]);
};
