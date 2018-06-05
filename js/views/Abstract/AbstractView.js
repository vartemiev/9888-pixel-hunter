import {createElement} from "../../create-element";

export default class AbstractView {
  get template() {
    return ``;
  }

  render() {
    return createElement(this.template);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
    }

    return this._element;
  }

  bind() {

  }
}
