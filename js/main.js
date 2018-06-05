import {showScreen} from './show-screen';
import {model, generateQuestion} from './data/game-data';
import {ScreenTypes, AnswerTypes, GREETING_SCREEN, INTRO_SCREEN, STATS_SCREEN, QUESTIONS_COUNT} from './constants';

import IntroView from './views/IntroView';
import GreetingView from './views/GreetingView';
import RulesView from './views/RulesView';
import StatsView from './views/StatsView';
import ThoOfThoView from './views/ThoOfThoView';
import OneOfThreeView from './views/OneOfThreeView';
import PhotoOrPaintView from './views/PhotoOrPaintView';

const LevelConstructors = {
  [ScreenTypes.THO_OF_THO]: ThoOfThoView,
  [ScreenTypes.PHOTO_OR_PAINT]: PhotoOrPaintView,
  [ScreenTypes.ONE_OF_THREE]: OneOfThreeView,
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

  let nextScreenView = null;

  switch (screenType) {
    case ScreenTypes.INTRO:
      nextScreenView = new IntroView();
      nextScreenView.onClick = gotoNextScreen;

      break;

    case ScreenTypes.GREETING:
      nextScreenView = new GreetingView();
      nextScreenView.onClick = gotoNextScreen;

      break;

    case ScreenTypes.RULES:
      nextScreenView = new RulesView();
      nextScreenView.onGoBack = goBack;
      nextScreenView.onClick = (name) => {
        model.setName(name);
        gotoNextScreen();
      };

      break;

    case ScreenTypes.STATS:
      nextScreenView = new StatsView({statistics: model.state.statistics[model.state.name]});
      nextScreenView.onGoBack = goBack;

      break;

    case ScreenTypes.THO_OF_THO:
    case ScreenTypes.ONE_OF_THREE:
    case ScreenTypes.PHOTO_OR_PAINT:
      currentQuestion = generateQuestion(screenType);

      nextScreenView = new LevelConstructors[screenType]({
        livesCount: model.state.livesCount,
        options: currentQuestion.options,
        answers: model.state.answers,
      });

      nextScreenView.onSetAnswer = (answer) => setAnswer(answer, gotoNextScreen);
      nextScreenView.onGoBack = goBack;

      break;
  }

  showScreen(nextScreenView.element);
};

gotoScreen(INTRO_SCREEN);
