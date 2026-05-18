import { BaseComponent } from '../core/BaseComponent.js';

export class MNProgressBar extends BaseComponent {
  constructor(initialValue = 0, showLabel = true) {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-progress-container");
    
    this.bar = document.createElement("div");
    this.bar.setAttribute("class", "mn-progress-bar");
    
    this.fill = document.createElement("div");
    this.fill.setAttribute("class", "mn-progress-fill");
    
    this.bar.append(this.fill);
    this.element.append(this.bar);
    
    this.showLabel = showLabel;
    if (showLabel) {
      this.label = document.createElement("div");
      this.label.setAttribute("class", "mn-progress-label");
      this.element.append(this.label);
    }
    
    this.setValue(initialValue);
  }
  
  setValue(percent) {
    const p = Math.max(0, Math.min(100, percent));
    this.fill.style.width = `${p}%`;
    if (this.showLabel && this.label) {
      this.label.textContent = `${Math.round(p)}%`;
    }
    return this;
  }
}
