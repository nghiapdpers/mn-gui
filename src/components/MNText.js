import { BaseComponent } from '../core/BaseComponent.js';

export class MNText extends BaseComponent {
  constructor (content = "") {
    super(document.createElement("span"));
    this.element.setAttribute("class", "mn-normal-text");
    this.element.textContent = content;
  }

  setValue(val) {
    this.element.textContent = val;
    return this;
  }

  getValue() {
    return this.element.textContent;
  }

  append() { }
}
