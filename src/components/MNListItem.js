import { BaseComponent } from '../core/BaseComponent.js';

export class MNListItem extends BaseComponent {
  constructor(title = "", subtitle = "", leading = null, trailing = null) {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-list-item");

    this.titleText = title;
    this.subtitleText = subtitle;

    if (leading) {
      this.leadingEl = document.createElement("div");
      this.leadingEl.setAttribute("class", "mn-list-item-leading");
      if (typeof leading === "string") {
        this.leadingEl.textContent = leading;
      } else if (leading.element) {
        this.leadingEl.append(leading.element);
      } else if (leading instanceof HTMLElement) {
        this.leadingEl.append(leading);
      }
      this.element.append(this.leadingEl);
    }

    this.contentEl = document.createElement("div");
    this.contentEl.setAttribute("class", "mn-list-item-content");

    this.titleEl = document.createElement("div");
    this.titleEl.setAttribute("class", "mn-list-item-title");
    this.titleEl.textContent = this.titleText;
    this.contentEl.append(this.titleEl);

    if (this.subtitleText) {
      this.subtitleEl = document.createElement("div");
      this.subtitleEl.setAttribute("class", "mn-list-item-subtitle");
      this.subtitleEl.textContent = this.subtitleText;
      this.contentEl.append(this.subtitleEl);
    }

    this.element.append(this.contentEl);

    if (trailing) {
      this.trailingEl = document.createElement("div");
      this.trailingEl.setAttribute("class", "mn-list-item-trailing");
      if (typeof trailing === "string") {
        this.trailingEl.textContent = trailing;
      } else if (trailing.element) {
        this.trailingEl.append(trailing.element);
      } else if (trailing instanceof HTMLElement) {
        this.trailingEl.append(trailing);
      }
      this.element.append(this.trailingEl);
    }
  }

  setTitle(title) {
    this.titleText = title;
    this.titleEl.textContent = title;
    return this;
  }

  setSubtitle(subtitle) {
    this.subtitleText = subtitle;
    if (!this.subtitleEl) {
      this.subtitleEl = document.createElement("div");
      this.subtitleEl.setAttribute("class", "mn-list-item-subtitle");
      this.contentEl.append(this.subtitleEl);
    }
    this.subtitleEl.textContent = subtitle;
    return this;
  }

  onClick(callback) {
    this.addEventListenerSafe(this.element, "click", (e) => {
      callback(e);
    });
    return this;
  }
}
