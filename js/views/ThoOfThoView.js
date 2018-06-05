import {composeElements, createElement} from '../create-element';
import {PicTypes} from '../constants';
import AbstractView from './Abstract/AbstractView';
import HeaderView from './Auxillary/HeaderView';
import FooterView from './Auxillary/FooterView';
import ProgressView from './Auxillary/ProgressView';

export default class ThoOfThoView extends AbstractView {
  constructor({options, answers, livesCount}) {
    super();

    this._options = options;
    this._answers = answers;
    this._livesCount = livesCount;

    const headerData = {
      gameStatisticsOn: true,
      livesCount: this._livesCount
    };
    this._headerView = new HeaderView(headerData);

    this.bind();
  }

  get template() {
    return `
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      <form class="game__content">
        ${this._options.map((option, i) => `
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
  }

  render() {
    return composeElements([
      this._headerView.element,
      createElement(this.template, {classList: [`game`]}),
      (new FooterView()).element
    ]);
  }

  bind() {
    this.element.addEventListener(`change`, () => {
      const checkedButtons = this.element.querySelectorAll(`[type="radio"]:checked`);

      if (checkedButtons.length === 2) {
        this.onSetAnswer({first: checkedButtons[0].value, second: checkedButtons[1].value});
      }
    });

    const progressView = new ProgressView({answers: this._answers});
    this.element.querySelector(`.stats`).appendChild(progressView.element);

    this._headerView.onGoBack = () => this.onGoBack();
  }

  onSetAnswer() {

  }

  onGoBack() {

  }
}
