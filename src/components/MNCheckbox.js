import { BaseComponent } from '../core/BaseComponent.js';

export class MNCheckbox extends BaseComponent {
  constructor (title = "", checked = false) {
    super(document.createElement("label"));
    this.element.setAttribute("class", "mn-checkbox-container");

    this.input = document.createElement("input");
    this.input.setAttribute("type", "checkbox");
    this.input.checked = checked;

    this.checkmark = document.createElement("span");
    this.checkmark.setAttribute("class", "mn-checkmark");

    this.label = document.createElement("span");
    this.label.textContent = title;

    this.element.append(this.input);
    this.element.append(this.checkmark);
    this.element.append(this.label);
  }

  append() { }

  getValue() {
    return this.input.checked;
  }

  setValue(val) {
    this.input.checked = val;
    this.input.dispatchEvent(new Event("change"));
    return this;
  }

  setValueSilently(val) {
    this.input.checked = val;
    return this;
  }

  onChange(callback) {
    this.addEventListenerSafe(this.input, "change", () => {
      callback(this.input.checked);
    });
    return this;
  }

  clone() {
    const clonedInstance = super.clone();
    clonedInstance.input = clonedInstance.element.querySelector("input");
    clonedInstance.checkmark = clonedInstance.element.querySelector(".mn-checkmark");
    clonedInstance.label = clonedInstance.element.querySelector("span:not(.mn-checkmark)");
    return clonedInstance;
  }
}
