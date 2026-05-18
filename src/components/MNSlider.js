import { BaseComponent } from '../core/BaseComponent.js';

export class MNSlider extends BaseComponent {
  constructor (title = "", min = 0, max = 100, value = 50, step = 1) {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-slider-container");

    const header = document.createElement("div");
    header.setAttribute("class", "mn-slider-header");

    const label = document.createElement("span");
    label.textContent = title;

    this.valueDisplay = document.createElement("span");
    this.valueDisplay.textContent = value;

    header.append(label);
    header.append(this.valueDisplay);

    this.input = document.createElement("input");
    this.input.setAttribute("type", "range");
    this.input.setAttribute("min", min);
    this.input.setAttribute("max", max);
    this.input.setAttribute("value", value);
    this.input.setAttribute("step", step);
    this.input.setAttribute("class", "mn-slider");

    this.element.append(header);
    this.element.append(this.input);

    this.addEventListenerSafe(this.input, "input", () => {
      this.valueDisplay.textContent = this.input.value;
    });
  }

  append() { }

  getValue() {
    return Number(this.input.value);
  }

  setValue(val) {
    this.input.value = val;
    this.valueDisplay.textContent = val;
    this.input.dispatchEvent(new Event("input"));
    return this;
  }

  setValueSilently(val) {
    this.input.value = val;
    this.valueDisplay.textContent = val;
    return this;
  }

  onChange(callback) {
    this.addEventListenerSafe(this.input, "input", () => {
      callback(Number(this.input.value));
    });
    return this;
  }

  clone() {
    const clonedInstance = super.clone();
    clonedInstance.input = clonedInstance.element.querySelector(".mn-slider");
    clonedInstance.valueDisplay = clonedInstance.element.querySelector(".mn-slider-value") || clonedInstance.element.querySelector("span:last-child");
    return clonedInstance;
  }
}
