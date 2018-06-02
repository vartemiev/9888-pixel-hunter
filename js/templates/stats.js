import {composeElements, createElement} from '../create-element';
import getFooter from './footer';
import getHeader from './header';
import {AnswerTypes, AnswerValues, LIVE_BONUS} from '../constants';

export default (data) => {
  const {goBack, statistics} = data;

  const speedBonusOffset = AnswerValues[AnswerTypes.FAST] - AnswerValues[AnswerTypes.CORRECT];
  const slownessPenaltyOffset = AnswerValues[AnswerTypes.SLOW] - AnswerValues[AnswerTypes.CORRECT];

  const template = `
    <h1>${statistics[0].total ? `Победа` : `Поражение`}</h1>
    ${statistics.map((result, i) => `
      <table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td colspan="2">
            <ul class="stats">
              ${result.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`)}
            </ul>
          </td>
          <td class="result__points">${result.total ? `×&nbsp;${AnswerValues[AnswerTypes.CORRECT]}` : ``}</td>
          <td class="result__total">${result.total ? result.answers.filter((answer) => answer !== AnswerTypes.WRONG).length * AnswerValues[AnswerTypes.CORRECT] : `FAIL`}</td>
        </tr>
        ${result.speedBonus ? `
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${result.speedBonus}&nbsp;<span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">×&nbsp;${speedBonusOffset}</td>
            <td class="result__total">${speedBonusOffset * result.speedBonus}</td>
          </tr>        
        ` : ``}
        ${result.livesCount ? `
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${result.livesCount}&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;${LIVE_BONUS}</td>
            <td class="result__total">${LIVE_BONUS * result.livesCount}</td>
          </tr>
        ` : ``}        
        ${result.slownessPenalty ? `
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${result.slownessPenalty}&nbsp;<span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">×&nbsp;${slownessPenaltyOffset}</td>
            <td class="result__total">${slownessPenaltyOffset * result.slownessPenalty}</td>
          </tr>
        ` : ``}
        ${result.total ? `
          <tr>
            <td colspan="5" class="result__total  result__total--final">${result.total}</td>
          </tr>
        ` : ``}
      </table>
    `).join(``)}
  `;

  const stats = createElement(template, {classList: [`result`]});

  return composeElements([
    getHeader({gameStatisticsOn: false, goBack}),
    stats,
    getFooter()
  ]);
};
