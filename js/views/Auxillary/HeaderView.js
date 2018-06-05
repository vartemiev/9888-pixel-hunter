import {LIVES_COUNT} from '../../constants';
import {createElement} from "../../create-element";
import AbstractView from "../Abstract/AbstractView";

export default class HeaderView extends AbstractView {
  constructor({gameStatisticsOn, livesCount}) {
    super();

    this._gameStatisticsOn = gameStatisticsOn;
    this._lives = Array(LIVES_COUNT)
        .fill(`img/heart__full.svg`, 0, livesCount)
        .fill(`img/heart__empty.svg`, livesCount, LIVES_COUNT + 1);

    this.bind();
  }

  get template() {
    return `
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      ${this._gameStatisticsOn ? (`
        <h1 class="game__timer"></h1>
        <div class="game__lives">
          ${this._lives.map((life) => `
            <img src="${life}" class="game__heart" alt="Life" width="32" height="32">
          `).join(``)}
        </div>
      `) : ``}
    `;
  }

  render() {
    return createElement(this.template, {elem: `footer`, classList: [`footer`]});
  }

  bind() {
    this.element.querySelector(`.back`).addEventListener(`click`, () => this.onGoBack());
  }

  onGoBack() {

  }
}
