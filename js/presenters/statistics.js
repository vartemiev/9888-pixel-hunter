import StatisticsView from '../views/statistics';
import {showScreen} from '../show-screen';

export default class StatisticsPresenter {
  constructor({goBack, statistics}) {
    this._statisticsView = new StatisticsView({statistics});

    this._statisticsView.onGoBack = goBack;
  }

  show() {
    showScreen(this._statisticsView.element);
  }
}
