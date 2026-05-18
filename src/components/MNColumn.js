import { BaseComponent } from '../core/BaseComponent.js';

export class MNColumn extends BaseComponent {
  constructor () {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-column mn-padding");
  }
}
