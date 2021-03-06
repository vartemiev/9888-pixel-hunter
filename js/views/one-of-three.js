import {composeElements, createElement} from '../create-element';
import AbstractView from './Abstract/abstract';
import HeaderView from './Auxillary/header';
import FooterView from './Auxillary/footer';
import ProgressView from './Auxillary/progress';

export default class OneOfThreeView extends AbstractView {
  constructor({options, answers, livesCount, initialTime}) {
    super();

    this._options = options;
    this._answers = answers;

    const headerData = {
      gameStatisticsOn: true,
      initialTime,
      livesCount,
    };
    this._headerView = new HeaderView(headerData);

    this.bind();
  }

  get template() {
    return `
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content game__content--triple">
        ${this._options.map((option, i) => `
          <div class="game__option" data-type="${option.type}">
            <img src="${option.src}" alt="Option ${i + 1}" width="304" height="455">
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
    this.element.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`game__option`)) {
        this.onSetAnswer(evt.target.dataset.type);
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

  onTimeTick(newTime) {
    this._headerView.onTimeTick(newTime);
  }
}
