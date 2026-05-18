import { getShadowRoot } from './BaseComponent.js';

export class Popup {
  constructor (theme) {
    this.isOpen = false;
    this.theme = theme;

    this.popupProps = {
      width: "360px",
      height: "480px",
      bottom: "80px",
      top: "",
      left: "",
      right: "20px",
    };

    this.toggleProps = {
      width: "50px",
      height: "50px",
      bottom: "20px",
      top: "",
      left: "",
      right: "20px",
      fontSize: "20px",
    };

    this.visibleToggle = true;
    this.icon = "🎲";
    this.child = document.createElement("div");
    this.shortcut = "Alt + M";
    this.title = "MNGUI Panel";
  }

  setTitle(title) {
    this.title = title;
    const titleEl = this.child.querySelector(".mngui-title");
    if (titleEl) {
      titleEl.textContent = title;
    }
  }

  setIcon(icon) {
    this.icon = icon;
  }

  setPopupSize(w, h) {
    this.popupProps.width = w;
    this.popupProps.height = h;
  }

  setPopupPosition(top, right, bottom, left) {
    this.popupProps.top = top;
    this.popupProps.right = right;
    this.popupProps.bottom = bottom;
    this.popupProps.left = left;
  }

  setToggleSize(w, h) {
    this.toggleProps.width = w;
    this.toggleProps.height = h;
  }

  setTogglePosition(top, right, bottom, left) {
    this.toggleProps.top = top;
    this.toggleProps.right = right;
    this.toggleProps.bottom = bottom;
    this.toggleProps.left = left;
  }

  append(child) {
    if (Array.isArray(child)) child.forEach(c => this.child.append(c.element));
    else this.child.append(child.element);
  }

  onShow(callback) {
    this.onShowCallback = callback;
  }

  onClose(callback) {
    this.onCloseCallback = callback;
  }

  setShortcut(shortcut) {
    this.shortcut = shortcut;
  }

  hideToggle() {
    if (('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      console.warn("This device supports touch events, so the toggle button will not be hidden.");
    } else {
      this.visibleToggle = false;
      this.popupProps = {
        width: "360px",
        height: "480px",
        bottom: "20px",
        top: "",
        left: "",
        right: "20px",
      };
    }
  }

  enableDragging() {
    const header = this.header;
    const popup = this.child;
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    header.addEventListener("mousedown", dragStart);
    header.addEventListener("touchstart", dragStart, { passive: true });

    function dragStart(e) {
      if (e.target.closest(".mngui-close-btn")) return;
      
      isDragging = true;
      const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
      
      startX = clientX;
      startY = clientY;
      
      const rect = popup.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      popup.style.left = `${initialLeft}px`;
      popup.style.top = `${initialTop}px`;
      popup.style.right = "auto";
      popup.style.bottom = "auto";
      
      document.addEventListener("mousemove", dragMove);
      document.addEventListener("mouseup", dragEnd);
      document.addEventListener("touchmove", dragMove, { passive: false });
      document.addEventListener("touchend", dragEnd);
    }

    function dragMove(e) {
      if (!isDragging) return;
      if (e.type === "touchmove") e.preventDefault();
      
      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      
      const dx = clientX - startX;
      const dy = clientY - startY;
      
      popup.style.left = `${initialLeft + dx}px`;
      popup.style.top = `${initialTop + dy}px`;
    }

    function dragEnd() {
      isDragging = false;
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragEnd);
      document.removeEventListener("touchmove", dragMove);
      document.removeEventListener("touchend", dragEnd);
    }
  }

  render() {
    const css = `
        #mngui-popup {
          position: fixed;
          bottom: ${this.popupProps.bottom || "80px"};
          right: ${this.popupProps.right || "20px"};
          left: ${this.popupProps.left || "auto"};
          top: ${this.popupProps.top || "auto"};
          width: ${this.popupProps.width || "360px"};
          height: ${this.popupProps.height || "480px"};
          background: var(--mn_surface);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--mn_border);
          border-radius: var(--mn_radius);
          box-shadow: var(--mn_shadow);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: var(--mn_font);
          z-index: 999999;

          /* Animation */
          transform: translateY(20px) scale(0.95);
          opacity: 0;
          pointer-events: none;
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        #mngui-popup.show {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: auto;
        }

        #mngui-toggle {
          position: fixed;
          bottom: ${this.toggleProps.bottom || "20px"};
          right: ${this.toggleProps.right || "20px"};
          left: ${this.toggleProps.left || "auto"};
          top: ${this.toggleProps.top || "auto"};
          width: ${this.toggleProps.width || "50px"};
          height: ${this.toggleProps.height || "50px"};
          border-radius: 50%;
          background: var(--mn_primary);
          color: var(--mn_onPrimary);
          border: none;
          cursor: pointer;
          font-size: ${this.toggleProps.fontSize || "20px"};
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          z-index: 999999;
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #mngui-toggle.hide {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.5);
        }

        #mngui-toggle:hover { 
          transform: scale(1.1);
          background: var(--mn_primaryVariant);
        }
        #mngui-toggle:active {
          transform: scale(0.95);
        }
    `;

    const styleEl = document.createElement("style");
    styleEl.textContent = css;
    getShadowRoot().append(styleEl);

    this.child.setAttribute("id", "mngui-popup");
    
    // Header for Draggability & Title
    this.header = document.createElement("div");
    this.header.setAttribute("id", "mngui-header");
    
    const titleSpan = document.createElement("span");
    titleSpan.setAttribute("class", "mngui-title");
    titleSpan.textContent = this.title;
    
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "mngui-close-btn");
    closeBtn.innerHTML = "×";
    
    this.header.append(titleSpan);
    this.header.append(closeBtn);
    this.child.append(this.header);
    
    getShadowRoot().append(this.child);

    const togglePopup = () => {
      this.isOpen = !this.isOpen;
      this.child.classList.toggle("show", this.isOpen);
      if (this.isOpen) this.onShowCallback?.();
      else this.onCloseCallback?.();
    };

    closeBtn.addEventListener("click", togglePopup);

    if (this.visibleToggle) {
      const toggleBtn = document.createElement("button");
      toggleBtn.setAttribute("id", "mngui-toggle");
      toggleBtn.append(this.icon);

      getShadowRoot().append(toggleBtn);
      toggleBtn.addEventListener("click", togglePopup);
    }

    this.enableDragging();

    window.addEventListener("keydown", (e) => {
      const keys = this.shortcut.split('+').map(key => key.trim().toLowerCase());
      const lastKey = keys[keys.length - 1];

      const hasShift = keys.includes('shift');
      const hasCtrl = keys.includes('ctrl');
      const hasAlt = keys.includes('alt');

      const isKeyMatch = e.key.toLowerCase() === lastKey;
      const isShiftMatch = hasShift === e.shiftKey;
      const isCtrlMatch = hasCtrl === e.ctrlKey;
      const isAltMatch = hasAlt === e.altKey;

      if (isKeyMatch && isShiftMatch && isCtrlMatch && isAltMatch) {
        e.preventDefault();
        togglePopup();
      }
    });
  }
}
