import { BaseComponent } from '../core/BaseComponent.js';

export class MNColorPicker extends BaseComponent {
  constructor (title = "", defaultColor = "#10b981") {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-color-picker");

    this.label = document.createElement("span");
    this.label.setAttribute("class", "mn-color-picker-label");
    this.label.textContent = title;

    const control = document.createElement("label");
    control.setAttribute("class", "mn-color-picker-control");

    this.dot = document.createElement("div");
    this.dot.setAttribute("class", "mn-color-picker-dot");
    this.dot.style.backgroundColor = defaultColor;

    this.valueSpan = document.createElement("span");
    this.valueSpan.setAttribute("class", "mn-color-picker-value");
    this.valueSpan.textContent = defaultColor;

    this.input = document.createElement("input");
    this.input.setAttribute("type", "color");
    this.input.setAttribute("class", "mn-color-picker-input");
    this.input.value = defaultColor;

    control.append(this.dot);
    control.append(this.valueSpan);
    control.append(this.input);

    this.element.append(this.label);
    this.element.append(control);

    this.addEventListenerSafe(this.input, "input", () => {
      const val = this.input.value;
      this.dot.style.backgroundColor = val;
      this.valueSpan.textContent = val;
    });
  }

  append() {}

  getValue() {
    return this.input.value;
  }

  setValue(color) {
    this.input.value = color;
    this.dot.style.backgroundColor = color;
    this.valueSpan.textContent = color;
    this.input.dispatchEvent(new Event("change", { bubbles: true }));
    return this;
  }

  setValueSilently(color) {
    this.input.value = color;
    this.dot.style.backgroundColor = color;
    this.valueSpan.textContent = color;
    return this;
  }

  onChange(callback) {
    this.addEventListenerSafe(this.input, "change", () => {
      callback(this.input.value);
    });
    return this;
  }
}
