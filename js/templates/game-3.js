import {composeElements, createElement} from '../create-element';
import getFooter from './footer';
import getHeader from './header';
import getProgress from './progress';

export default (data) => {
  const {livesCount, goBack, answers, setAnswer, options} = data;

  const template = `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content game__content--triple">
      ${options.map((option, i) => `
        <div class="game__option" data-type="${option.type}">
          <img src="${option.src}" alt="Option ${i + 1}" width="304" height="455">
        </div>
      `).join(``)}
    </form>
    <div class="stats">
    </div>
  `;

  const thirdGame = createElement(template, {classList: [`game`]});

  thirdGame.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`game__option`)) {
      setAnswer(evt.target.dataset.type);
    }
  });

  thirdGame.querySelector(`.stats`).appendChild(getProgress({answers}));

  return composeElements([
    getHeader({gameStatisticsOn: true, livesCount, goBack}),
    thirdGame,
    getFooter()
  ]);
};
