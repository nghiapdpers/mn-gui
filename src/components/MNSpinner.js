import { BaseComponent } from '../core/BaseComponent.js';

export class MNSpinner extends BaseComponent {
  constructor(size = "24px", color = "var(--mn_primary)") {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-spinner");
    this.element.style.width = size;
    this.element.style.height = size;
    this.element.style.borderTopColor = color;
  }
}
