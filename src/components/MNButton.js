import { BaseComponent } from '../core/BaseComponent.js';

export class MNButton extends BaseComponent {
  constructor (title = "") {
    super(document.createElement("button"));
    this.element.setAttribute("class", "mn-button");
    this.element.textContent = title;
  }

  append() { }

  onClick(callback) {
    this.addEventListenerSafe(this.element, "click", (e) => {
      callback(e);
    });
    return this;
  }
}
