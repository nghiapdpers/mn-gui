import { BaseComponent } from '../core/BaseComponent.js';

export class MNAccordion extends BaseComponent {
  constructor (title = "", isExpanded = false) {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-accordion" + (isExpanded ? " mn-expanded" : ""));

    this.header = document.createElement("div");
    this.header.setAttribute("class", "mn-accordion-header");

    this.titleSpan = document.createElement("span");
    this.titleSpan.textContent = title;

    // Premium inline SVG chevron
    this.chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.chevron.setAttribute("class", "mn-accordion-chevron");
    this.chevron.setAttribute("viewBox", "0 0 24 24");
    this.chevron.innerHTML = `<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>`;

    this.header.append(this.titleSpan);
    this.header.append(this.chevron);

    this.body = document.createElement("div");
    this.body.setAttribute("class", "mn-accordion-body");

    this.element.append(this.header);
    this.element.append(this.body);

    this.addEventListenerSafe(this.header, "click", () => {
      this.element.classList.toggle("mn-expanded");
    });
  }

  append(nodes) {
    if (Array.isArray(nodes)) {
      nodes.forEach(node => this.body.append(node.element));
    } else {
      this.body.append(nodes.element);
    }
    return this;
  }
}
