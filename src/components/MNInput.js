import { BaseComponent } from '../core/BaseComponent.js';

export class MNInput extends BaseComponent {
  constructor (placeholder = "") {
    super(document.createElement("input"));
    this.element.setAttribute("placeholder", placeholder);
    this.element.setAttribute("class", "mn-input");
  }

  append() { }

  getValue() {
    return this.element.value;
  }

  setValue(val) {
    this.element.value = val;
    this.element.dispatchEvent(new Event("input"));
    return this;
  }

  setValueSilently(val) {
    this.element.value = val;
    return this;
  }

  onChange(callback) {
    this.addEventListenerSafe(this.element, "input", () => {
      callback(this.element.value);
    });
    return this;
  }

  onSubmit(callback) {
    this.addEventListenerSafe(this.element, "change", () => {
      this.element.blur();
      callback(this.element.value);
    });
    return this;
  }

  // Maintain backward compatibility for typo
  onSummit(callback) {
    return this.onSubmit(callback);
  }

  onFocus(callback) {
    this.addEventListenerSafe(this.element, "focus", () => {
      callback(this.element.value);
    });
    return this;
  }
}
