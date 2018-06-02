import {showScreen} from './show-screen';
import {model, generateQuestion} from './data/game-data';
import {ScreenTypes, AnswerTypes, GREETING_SCREEN, INTRO_SCREEN, STATS_SCREEN, QUESTIONS_COUNT} from './constants';

import getIntro from './templates/intro';
import getGreeting from './templates/greeting';
import getRules from './templates/rules';
import getStats from './templates/stats';
import getFirstGame from './templates/game-1';
import getSecondGame from './templates/game-2';
import getThirdGame from './templates/game-3';

const LevelConstructors = {
  [ScreenTypes.THO_OF_THO]: getFirstGame,
  [ScreenTypes.PHOTO_OR_PAINT]: getSecondGame,
  [ScreenTypes.ONE_OF_THREE]: getThirdGame,
};

let currentQuestion = null;

const setAnswer = (answer, callback) => {
  let isRight = false;

  switch (currentQuestion.type) {
    case ScreenTypes.THO_OF_THO:
      isRight = answer.first === currentQuestion.answer.first &&
        answer.second === currentQuestion.answer.second;
      break;

    case ScreenTypes.ONE_OF_THREE:
    case ScreenTypes.PHOTO_OR_PAINT:
      isRight = answer === currentQuestion.answer;
      break;
  }

  model.setAnswer(isRight ? AnswerTypes.CORRECT : AnswerTypes.WRONG);

  if (!isRight) {
    model.reduceLives();
  }

  if (model.state.livesCount < 0 || model.state.answers.length === QUESTIONS_COUNT) {
    model.saveGameResult();
    gotoScreen(STATS_SCREEN);
  } else {
    callback();
  }
};

const gotoScreen = (screenNumber) => {
  const screenType = model.state.screens[screenNumber];

  const gotoNextScreen = () => gotoScreen(++screenNumber);
  const goBack = () => {
    model.resetGame();
    gotoScreen(GREETING_SCREEN);
  };

  let nextScreen = null;

  switch (screenType) {
    case ScreenTypes.INTRO:
      nextScreen = getIntro({gotoNextScreen});
      break;

    case ScreenTypes.GREETING:
      nextScreen = getGreeting({gotoNextScreen, goBack});
      break;

    case ScreenTypes.RULES:
      nextScreen = getRules({
        gotoNextScreen,
        setName: (name) => model.setName(name),
        goBack
      });
      break;

    case ScreenTypes.STATS:
      nextScreen = getStats({
        statistics: model.state.statistics[model.state.name],
        goBack
      });
      break;

    case ScreenTypes.THO_OF_THO:
    case ScreenTypes.ONE_OF_THREE:
    case ScreenTypes.PHOTO_OR_PAINT:
      currentQuestion = generateQuestion(screenType);

      nextScreen = LevelConstructors[screenType]({
        livesCount: model.state.livesCount,
        options: currentQuestion.options,
        answers: model.state.answers,
        setAnswer: (answer) => setAnswer(answer, gotoNextScreen),
        goBack
      });
      break;
  }

  showScreen(nextScreen);
};

gotoScreen(INTRO_SCREEN);
