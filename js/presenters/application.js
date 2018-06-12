import Model from '../data/game-data';

import GreetingPresenter from './greeting';
import IntroPresenter from './intro';
import RulesPresenter from './rules';
import GamePresenter from './game';
import StatisticsPresenter from './statistics';

const model = new Model();

export default class Application {
  static showStatistics() {
    const statisticsPresenter = new StatisticsPresenter({
      goBack: () => {
        model.resetGame();
        Application.showGreeting();
      },
      statistics: model.statistics
    });

    statisticsPresenter.show();
  }

  static showIntro() {
    const introPresenter = new IntroPresenter({
      gotoNextScreen: Application.showGreeting
    });

    introPresenter.show();
  }

  static showGreeting() {
    const greetingPresenter = new GreetingPresenter({
      gotoNextScreen: Application.showRules
    });

    greetingPresenter.show();
  }

  static showRules() {
    const rulesPresenter = new RulesPresenter({
      gotoNextScreen: (name) => {
        model.setName(name);
        Application.showGame();
      },
      goBack: () => {
        model.resetGame();
        Application.showGreeting();
      }
    });

    rulesPresenter.show();
  }

  static showGame() {
    const gamePresenter = new GamePresenter({
      model,
      gotoNextScreen: Application.showStatistics,
      goBack: () => {
        model.resetGame();
        Application.showGreeting();
      }
    });

    gamePresenter.init();
  }
}
