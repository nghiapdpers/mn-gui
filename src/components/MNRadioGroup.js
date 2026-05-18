import { BaseComponent } from '../core/BaseComponent.js';

export class MNRadioGroup extends BaseComponent {
  constructor(options = [], selectedValue = "") {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-radio-group");
    this.radios = [];
    
    options.forEach(opt => {
      const label = document.createElement("label");
      label.setAttribute("class", "mn-radio-label");
      
      const input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("class", "mn-radio-input");
      input.setAttribute("name", "mn-radio-" + Math.random().toString(36).substr(2, 9));
      input.setAttribute("value", opt.value);
      if (opt.value === selectedValue) input.checked = true;
      
      const dot = document.createElement("span");
      dot.setAttribute("class", "mn-radio-dot");
      
      const text = document.createElement("span");
      text.textContent = opt.label;
      
      label.append(input);
      label.append(dot);
      label.append(text);
      this.element.append(label);
      
      this.radios.push(input);
      
      this.addEventListenerSafe(input, "change", () => {
         if (input.checked) {
             this.element.dispatchEvent(new Event("change", { bubbles: true }));
         }
      });
    });
  }
  
  getValue() {
    const checked = this.radios.find(r => r.checked);
    return checked ? checked.value : null;
  }
  
  setValue(val) {
    const radio = this.radios.find(r => r.value === val);
    if (radio) {
        radio.checked = true;
        this.element.dispatchEvent(new Event("change", { bubbles: true }));
    }
    return this;
  }
  
  setValueSilently(val) {
    const radio = this.radios.find(r => r.value === val);
    if (radio) radio.checked = true;
    return this;
  }
  
  onChange(callback) {
    this.addEventListenerSafe(this.element, "change", () => {
      callback(this.getValue());
    });
    return this;
  }

  persist(key) {
    const StatePersistence = window.StatePersistence || globalThis.StatePersistence;
    if (StatePersistence) {
      const saved = StatePersistence.get(key);
      if (saved !== null) {
        this.setValueSilently(saved);
      }
      this.onChange((val) => {
        StatePersistence.set(key, val);
      });
    }
    return this;
  }
}
