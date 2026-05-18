import { BaseComponent } from '../core/BaseComponent.js';

export class MNDivider extends BaseComponent {
  constructor() {
    super(document.createElement("hr"));
    this.element.setAttribute("class", "mn-divider");
  }
  append() { }
}
