import { getShadowRoot } from '../core/BaseComponent.js';

export class MNToast {
  static container = null;
  
  static ensureContainer() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.setAttribute("id", "mn-toast-container");
      getShadowRoot().append(this.container);
    }
  }

  static show(message, type = "info", duration = 3000) {
    this.ensureContainer();
    
    const toast = document.createElement("div");
    toast.setAttribute("class", `mn-toast mn-toast-${type}`);
    toast.textContent = message;
    
    this.container.append(toast);
    
    // Force trigger layout
    toast.offsetHeight;
    
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
    
    setTimeout(() => {
      toast.classList.remove("show");
      const onEnd = () => {
        toast.removeEventListener("transitionend", onEnd);
        toast.remove();
      };
      toast.addEventListener("transitionend", onEnd, { once: true });
    }, duration);
  }
}
