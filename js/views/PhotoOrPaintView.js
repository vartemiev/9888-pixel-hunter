import {composeElements, createElement} from '../create-element';
import {PicTypes} from '../constants';
import AbstractView from './Abstract/AbstractView';
import HeaderView from './Auxillary/HeaderView';
import FooterView from './Auxillary/FooterView';
import ProgressView from './Auxillary/ProgressView';

export default class PhotoOrPaintView extends AbstractView {
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
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this._options[0].src}" alt="Option 1" width="705" height="455">
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
      this.onSetAnswer(this.element.querySelector(`[type="radio"]:checked`).value);
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
