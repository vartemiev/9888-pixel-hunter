import {composeElements, createElement} from '../create-element';
import AbstractView from './Abstract/AbstractView';
import HeaderView from './Auxillary/HeaderView';
import FooterView from './Auxillary/FooterView';

export default class RulesView extends AbstractView {
  constructor() {
    super();

    this._headerView = new HeaderView({gameStatisticsOn: false});

    this.bind();
  }

  get template() {
    return `
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
  }

  render() {
    return composeElements([
      this._headerView.element,
      createElement(this.template, {classList: [`rules`]}),
      (new FooterView()).element
    ]);
  }

  bind() {
    const rulesInput = this.element.querySelector(`.rules__input`);
    const rulesButton = this.element.querySelector(`.rules__button`);

    rulesButton.addEventListener(`click`, () => this.onClick(rulesInput.value));
    rulesInput.addEventListener(`input`, (evt) => {
      rulesButton.disabled = evt.target.value === ``;
    });

    this._headerView.onGoBack = () => this.onGoBack();
  }

  onClick() {

  }

  onGoBack() {

  }
}
