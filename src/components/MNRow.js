import { BaseComponent } from '../core/BaseComponent.js';

export class MNRow extends BaseComponent {
  constructor () {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-row mn-padding");
  }
}
