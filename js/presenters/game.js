import {
  AnswerTypes, Images, PicTypes, ScreenTypes,
  QUESTIONS_COUNT, START_TIME, FAST_TIME_RANGE, SLOW_TIME_RANGE
} from '../constants';

import {getRandom} from '../utils';
import PhotoOrPaintView from '../views/photo-or-paint';
import ThoOfThoView from '../views/two-of-two';
import OneOfThreeView from '../views/one-of-three';
import {showScreen} from '../show-screen';
import setTimer from '../timer';

const LevelConstructors = {
  [ScreenTypes.THO_OF_THO]: ThoOfThoView,
  [ScreenTypes.PHOTO_OR_PAINT]: PhotoOrPaintView,
  [ScreenTypes.ONE_OF_THREE]: OneOfThreeView,
};

export default class GamePresenter {
  constructor({model, gotoNextScreen, goBack}) {
    this._model = model;
    this._showStatistics = gotoNextScreen;
    this._showGreeting = goBack;
  }

  init() {
    this._screens = this._createScreens().reverse();

    this._gotoNextQuestion();
  }

  _setAnswer(answer) {
    this._stopTimer();

    let isRight = false;

    if (answer) {
      switch (this._currentQuestion.type) {
        case ScreenTypes.THO_OF_THO:
          isRight = answer.first === this._currentQuestion.answer.first &&
            answer.second === this._currentQuestion.answer.second;
          break;

        case ScreenTypes.ONE_OF_THREE:
        case ScreenTypes.PHOTO_OR_PAINT:
          isRight = answer === this._currentQuestion.answer;
          break;
      }
    }

    if (!isRight) {
      this._model.reduceLives();
    }

    this._model.setAnswer(this._getAnswerType(isRight));

    if (this._model.livesCount < 0 || this._model.answers.length === QUESTIONS_COUNT) {
      this._model.saveGameResult();
      this._showStatistics();
    } else {
      this._gotoNextQuestion();
    }

  }

  _getAnswerType(isRight) {
    if (!isRight) {
      return AnswerTypes.WRONG;
    }

    if (this._timer.time >= FAST_TIME_RANGE) {
      return AnswerTypes.FAST;
    }

    if (this._timer.time <= SLOW_TIME_RANGE) {
      return AnswerTypes.SLOW;
    }

    return AnswerTypes.CORRECT;
  }

  _gotoNextQuestion() {
    const currentScreen = this._screens.pop();

    this._currentQuestion = this._generateQuestion(currentScreen);

    const gameView = new LevelConstructors[currentScreen]({
      livesCount: this._model.livesCount,
      options: this._currentQuestion.options,
      answers: this._model.answers,
      initialTime: START_TIME,
    });

    gameView.onGoBack = this._showGreeting;
    gameView.onSetAnswer = (answer) => this._setAnswer(answer);


    showScreen(gameView.element);

    this._startTimer((newTime) => gameView.onTimeTick(newTime));
  }

  _startTimer(callback) {
    this._timer = setTimer(START_TIME);

    this._intervalId = setInterval(() => {
      if (!this._timer.tick().done) {
        callback(this._timer.time);
      } else {
        this._setAnswer(null);
      }

    }, 1000);
  }

  _stopTimer() {
    clearInterval(this._intervalId);
  }

  _createScreens() {
    const gameScreenTypes = [ScreenTypes.THO_OF_THO, ScreenTypes.PHOTO_OR_PAINT, ScreenTypes.ONE_OF_THREE];
    return Array(QUESTIONS_COUNT)
        .fill(null)
        .map(() => gameScreenTypes[getRandom(0, gameScreenTypes.length - 1)]);
  }

  _generateQuestion(type) {
    let question = null;

    switch (type) {
      case ScreenTypes.THO_OF_THO:
        question = {
          type: ScreenTypes.THO_OF_THO,
          options: [
            {src: Images.PAINTINGS[getRandom(0, 2)], type: PicTypes.PAINTING},
            {src: Images.PHOTOS[getRandom(0, 2)], type: PicTypes.PHOTO},
          ],
          answer: {
            first: PicTypes.PAINTING,
            second: PicTypes.PHOTO,
          }
        };
        break;

      case ScreenTypes.PHOTO_OR_PAINT:
        question = {
          type: ScreenTypes.PHOTO_OR_PAINT,
          options: [
            {src: Images.PAINTINGS[getRandom(0, 2)], type: PicTypes.PAINTING}
          ],
          answer: PicTypes.PAINTING
        };
        break;

      case ScreenTypes.ONE_OF_THREE:
        question = {
          type: ScreenTypes.PHOTO_OR_PAINT,
          options: [
            {src: Images.PHOTOS[getRandom(0, 2)], type: PicTypes.PHOTO},
            {src: Images.PHOTOS[getRandom(0, 2)], type: PicTypes.PHOTO},
            {src: Images.PAINTINGS[getRandom(0, 2)], type: PicTypes.PAINTING}
          ],
          answer: PicTypes.PAINTING
        };
        break;
    }

    return question;
  }
}
