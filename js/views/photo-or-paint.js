import {composeElements, createElement} from '../create-element';
import {PicTypes} from '../constants';
import AbstractView from './Abstract/abstract';
import HeaderView from './Auxillary/header';
import FooterView from './Auxillary/footer';
import ProgressView from './Auxillary/progress';

export default class PhotoOrPaintView extends AbstractView {
  constructor({options, answers, livesCount, initialTime}) {
    super();

    this._options = options;
    this._answers = answers;

    const headerData = {
      gameStatisticsOn: true,
      initialTime,
      livesCount
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

  onTimeTick(newTime) {
    this._headerView.onTimeTick(newTime);
  }
}
