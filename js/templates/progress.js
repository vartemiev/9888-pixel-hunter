import {createElement} from '../create-element';
import {QUESTIONS_COUNT} from '../constants';

export default (data) => {
  const {answers} = data;

  const unknownAnswers = Array(QUESTIONS_COUNT - answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`);

  const template = answers
      .map((answer) => `<li class="stats__result stats__result--${answer}"></li>`)
      .concat(unknownAnswers)
      .join(``);

  return createElement(template, {elem: `ul`, classList: [`stats`]});
};
