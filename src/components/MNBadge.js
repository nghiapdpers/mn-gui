import { BaseComponent } from '../core/BaseComponent.js';

export class MNBadge extends BaseComponent {
  constructor(content = "", type = "primary") {
    super(document.createElement("span"));
    this.element.setAttribute("class", `mn-badge mn-badge-${type}`);
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
