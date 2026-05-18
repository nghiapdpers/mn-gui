import { BaseComponent } from '../core/BaseComponent.js';

export class MNTextArea extends BaseComponent {
  constructor(placeholder = "", rows = 3) {
    super(document.createElement("textarea"));
    this.element.setAttribute("placeholder", placeholder);
    this.element.setAttribute("class", "mn-textarea");
    this.element.setAttribute("rows", rows);
    
    this.addEventListenerSafe(this.element, "input", () => {
      this.element.style.height = "auto";
      this.element.style.height = (this.element.scrollHeight) + "px";
    });
  }
  
  getValue() { return this.element.value; }
  
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
    this.addEventListenerSafe(this.element, "input", () => callback(this.element.value));
    return this;
  }

  persist(key) {
    const StatePersistence = window.StatePersistence || globalThis.StatePersistence;
    if (StatePersistence) {
      const saved = StatePersistence.get(key);
      if (saved !== null) {
        this.setValue(saved);
      }
      this.onChange((val) => {
        StatePersistence.set(key, val);
      });
    }
    return this;
  }
}
