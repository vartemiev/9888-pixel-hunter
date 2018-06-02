import {composeElements, createElement} from '../create-element';
import getHeader from './header';
import getFooter from './footer';
import getProgress from './progress';
import {PicTypes} from '../constants';

export default (data) => {
  const {options, answers, livesCount, setAnswer} = data;

  const template = `
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${options[0].src}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="${PicTypes.PHOTO}">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="${PicTypes.PAINTING}">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      <div class="stats">
      </div>
    </div>
  `;

  const secondGame = createElement(template);

  secondGame.addEventListener(`change`, () => {
    setAnswer(secondGame.querySelector(`[type="radio"]:checked`).value);
  });

  secondGame.querySelector(`.stats`).appendChild(getProgress({answers}));

  return composeElements([
    getHeader({gameStatisticsOn: true, livesCount}),
    secondGame,
    getFooter()
  ]);
};
