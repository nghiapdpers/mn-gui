import { BaseComponent } from '../core/BaseComponent.js';

export class MNSwitch extends BaseComponent {
  constructor (title = "") {
    super(document.createElement("label"));
    this.element.setAttribute("class", "mn-toggle");

    this.input = document.createElement("input");
    this.input.setAttribute("type", "checkbox");
    this.input.setAttribute("class", "mn-toggle-checkbox");

    this.sw = document.createElement("div");
    this.sw.setAttribute("class", "mn-toggle-switch");

    this.label = document.createElement("span");
    this.label.setAttribute("class", "mn-toggle-label");
    this.label.textContent = title;

    this.element.append(this.input);
    this.element.append(this.sw);
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
    clonedInstance.input = clonedInstance.element.querySelector(".mn-toggle-checkbox");
    clonedInstance.sw = clonedInstance.element.querySelector(".mn-toggle-switch");
    clonedInstance.label = clonedInstance.element.querySelector(".mn-toggle-label");
    return clonedInstance;
  }
}
