import RulesView from '../views/rules';
import {showScreen} from '../show-screen';

export default class RulesPresenter {
  constructor({goBack, gotoNextScreen}) {
    this._rulesView = new RulesView();

    this._rulesView.onGoBack = goBack;
    this._rulesView.onClick = gotoNextScreen;
  }

  show() {
    showScreen(this._rulesView.element);
  }
}
