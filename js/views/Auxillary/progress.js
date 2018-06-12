import {createElement} from '../../create-element';
import {QUESTIONS_COUNT} from '../../constants';
import AbstractView from '../Abstract/abstract';

export default class ProgressView extends AbstractView {
  constructor({answers}) {
    super();

    this._answers = answers;
  }

  get template() {
    const unknownAnswers = Array(QUESTIONS_COUNT - this._answers.length)
        .fill(`<li class="stats__result stats__result--unknown"></li>`);

    return this._answers
        .map((answer) => `<li class="stats__result stats__result--${answer}"></li>`)
        .concat(unknownAnswers)
        .join(``);
  }

  render() {
    return createElement(this.template, {elem: `ul`, classList: [`stats`]});
  }
}
