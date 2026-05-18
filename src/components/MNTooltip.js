import { BaseComponent } from '../core/BaseComponent.js';

export class MNTooltip extends BaseComponent {
  constructor(targetComponent, text, position = "top") {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-tooltip-wrapper");
    
    this.tooltipText = document.createElement("div");
    this.tooltipText.setAttribute("class", `mn-tooltip ${position}`);
    this.tooltipText.textContent = text;
    
    // Check if target is a BaseComponent or a direct DOM element
    if (targetComponent && targetComponent.element) {
        this.element.append(targetComponent.element);
    } else if (targetComponent instanceof HTMLElement) {
        this.element.append(targetComponent);
    }
    
    this.element.append(this.tooltipText);
  }
}
