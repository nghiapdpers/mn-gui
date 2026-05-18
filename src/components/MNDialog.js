import { getShadowRoot } from '../core/BaseComponent.js';

export class MNDialog {
  static show({ title = "Xác nhận", message = "", confirmText = "OK", cancelText = "Hủy", onConfirm = null, onCancel = null } = {}) {
    const overlay = document.createElement("div");
    overlay.setAttribute("class", "mn-dialog-overlay");
    
    const dialog = document.createElement("div");
    dialog.setAttribute("class", "mn-dialog");
    
    const titleEl = document.createElement("h3");
    titleEl.setAttribute("class", "mn-dialog-title");
    titleEl.textContent = title;
    
    const msgEl = document.createElement("p");
    msgEl.setAttribute("class", "mn-dialog-message");
    msgEl.textContent = message;
    
    const actions = document.createElement("div");
    actions.setAttribute("class", "mn-dialog-actions");
    
    const cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("class", "mn-button");
    cancelBtn.style.borderColor = "var(--mn_border)";
    cancelBtn.style.color = "var(--mn_onSurface)";
    cancelBtn.textContent = cancelText;
    
    const confirmBtn = document.createElement("button");
    confirmBtn.setAttribute("class", "mn-button");
    confirmBtn.textContent = confirmText;
    
    actions.append(cancelBtn);
    actions.append(confirmBtn);
    
    dialog.append(titleEl);
    dialog.append(msgEl);
    dialog.append(actions);
    overlay.append(dialog);
    
    getShadowRoot().append(overlay);
    
    // Trigger animation
    setTimeout(() => {
        overlay.classList.add("mn-show");
    }, 10);
    
    const close = () => {
      overlay.classList.remove("mn-show");
      setTimeout(() => overlay.remove(), 250);
    };
    
    cancelBtn.addEventListener("click", () => {
      close();
      if (onCancel) onCancel();
    });
    
    confirmBtn.addEventListener("click", () => {
      close();
      if (onConfirm) onConfirm();
    });
  }
}
