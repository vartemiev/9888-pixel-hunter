import {createElement, composeElements} from '../create-element';
import getFooter from './footer';
import getHeader from './header';

export default (data) => {
  const {gotoNextScreen, goBack, setName} = data;

  const template = `
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  `;

  const rules = createElement(template, {classList: [`rules`]});
  const rulesInput = rules.querySelector(`.rules__input`);
  const rulesButton = rules.querySelector(`.rules__button`);

  rulesButton.addEventListener(`click`, () => {
    setName(rulesInput.value);
    gotoNextScreen();
  });

  rulesInput.addEventListener(`input`, (evt) => {
    rulesButton.disabled = evt.target.value === ``;
  });

  return composeElements([
    getHeader({gameStatisticsOn: false, goBack}),
    rules,
    getFooter()
  ]);
};
