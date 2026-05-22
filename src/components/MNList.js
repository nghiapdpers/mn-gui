import { BaseComponent } from '../core/BaseComponent.js';

export class MNList extends BaseComponent {
  constructor() {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-list");
  }

  addItem(item) {
    if (Array.isArray(item)) {
      item.forEach(i => {
        if (i && i.element) {
          this.element.append(i.element);
        } else if (i instanceof HTMLElement) {
          this.element.append(i);
        }
      });
    } else {
      if (item && item.element) {
        this.element.append(item.element);
      } else if (item instanceof HTMLElement) {
        this.element.append(item);
      }
    }
    return this;
  }

  append(nodes) {
    return this.addItem(nodes);
  }
}
