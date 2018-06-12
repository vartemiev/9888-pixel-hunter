import GreetingView from '../views/greeting';
import {showScreen} from '../show-screen';

export default class GreetingPresenter {
  constructor({gotoNextScreen}) {
    this._greetingView = new GreetingView();

    this._greetingView.onClick = gotoNextScreen;
  }

  show() {
    showScreen(this._greetingView.element);
  }
}
