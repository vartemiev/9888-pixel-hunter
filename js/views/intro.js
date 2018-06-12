import {composeElements, createElement} from '../create-element';
import AbstractView from './Abstract/abstract';
import FooterView from './Auxillary/footer';

export default class IntroView extends AbstractView {
  constructor() {
    super();
    this.bind();
  }

  get template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
    `;
  }

  render() {
    return composeElements([
      createElement(this.template),
      (new FooterView()).element
    ]);
  }

  bind() {
    this.element.querySelector(`.intro__asterisk`).addEventListener(`click`, () => this.onClick());
  }

  onClick() {

  }
}
