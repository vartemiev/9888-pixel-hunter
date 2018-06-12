import {AnswerTypes, LIVES_COUNT, QUESTIONS_COUNT} from '../constants';
import getScoreCount from '../get-score-count';

export default class Model {
  constructor() {
    this._statistics = {};

    this._setInitialState();
  }

  _setInitialState() {
    this._livesCount = LIVES_COUNT;
    this._answers = [];
    this._name = ``;
  }

  get answers() {
    return this._answers;
  }

  get livesCount() {
    return this._livesCount;
  }

  get statistics() {
    return this._statistics[this._name];
  }

  setName(name) {
    this._name = name;
  }

  setAnswer(answer) {
    this._answers.push(answer);
  }

  reduceLives() {
    --this._livesCount;
  }

  saveGameResult() {
    const {_statistics, _name, _answers, _livesCount} = this;

    if (!_statistics[_name]) {
      _statistics[_name] = [];
    }

    if (_answers.length === QUESTIONS_COUNT) {
      _statistics[_name] = [
        {
          speedBonus: _answers.filter((answer) => answer === AnswerTypes.FAST).length,
          slownessPenalty: _answers.filter((answer) => answer === AnswerTypes.SLOW).length,
          livesCount: _livesCount,
          answers: _answers,
          total: getScoreCount(_answers, _livesCount)
        },
        ..._statistics[_name]
      ];
    } else {
      const unknownAnswers = Array(QUESTIONS_COUNT - _answers.length)
          .fill(AnswerTypes.UNKNOWN);

      _statistics[_name] = [
        {answers: _answers.concat(unknownAnswers)},
        ..._statistics[_name]
      ];
    }
  }

  resetGame() {
    this._setInitialState();
  }
}
