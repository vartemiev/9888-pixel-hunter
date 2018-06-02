import {createElement, composeElements} from '../create-element';
import getFooter from './footer';

export default (data) => {
  const {gotoNextScreen} = data;

  const template = `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>
  `;

  const intro = createElement(template);
  intro.querySelector(`.intro__asterisk`).addEventListener(`click`, gotoNextScreen);

  return composeElements([intro, getFooter()]);
};
