import IntroView from '../views/intro';
import {showScreen} from '../show-screen';

export default class IntroPresenter {
  constructor({gotoNextScreen}) {
    this._introView = new IntroView();

    this._introView.onClick = gotoNextScreen;
  }

  show() {
    showScreen(this._introView.element);
  }
}
