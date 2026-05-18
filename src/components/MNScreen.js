import { BaseComponent } from '../core/BaseComponent.js';

export class MNScreen extends BaseComponent {
  constructor () {
    super(document.createElement("div"));
    this.element.classList.add("mn-screen");
  }

  show(direction = "right") {
    this.element.classList.remove("exit-to-left", "exit-to-right", "enter-from-left", "enter-from-right", "show");
    this.element.classList.add(direction === "right" ? "enter-from-right" : "enter-from-left");

    // Force layout calculation
    this.element.offsetHeight;

    requestAnimationFrame(() => {
      this.element.classList.add("show");
      this.element.classList.remove("enter-from-right", "enter-from-left");
    });
  }

  hide(direction = "left", callback) {
    this.element.classList.remove("enter-from-left", "enter-from-right", "show");
    this.element.classList.add(direction === "left" ? "exit-to-left" : "exit-to-right");

    const onEnd = () => {
      this.removeEventListenerSafe(this.element, "transitionend", onEnd);
      this.element.classList.remove("exit-to-left", "exit-to-right");
      if (callback) callback();
    };
    
    this.addEventListenerSafe(this.element, "transitionend", onEnd, { once: true });
  }
}
