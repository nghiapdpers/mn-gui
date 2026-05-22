import { getShadowRoot } from './BaseComponent.js';
import { StatePersistence } from './StatePersistence.js';

export class Popup {
  constructor (theme) {
    this.isOpen = false;
    this.theme = theme;

    const savedWidth = StatePersistence.get("mngui_popup_width");
    const savedHeight = StatePersistence.get("mngui_popup_height");

    this.popupProps = {
      width: savedWidth || "360px",
      height: savedHeight || "480px",
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

  show() {
    this.isOpen = true;
    this.child.classList.add("show");
    this.onShowCallback?.();
    const toggleBtn = getShadowRoot().getElementById("mngui-toggle");
    if (toggleBtn) {
      toggleBtn.classList.add("hide");
    }
  }

  hide() {
    this.isOpen = false;
    this.child.classList.remove("show");
    this.onCloseCallback?.();
    const toggleBtn = getShadowRoot().getElementById("mngui-toggle");
    if (toggleBtn) {
      toggleBtn.classList.remove("hide");
    }
  }

  setIcon(icon) {
    this.icon = icon;
  }

  setPopupSize(w, h) {
    const savedWidth = StatePersistence.get("mngui_popup_width");
    const savedHeight = StatePersistence.get("mngui_popup_height");
    this.popupProps.width = savedWidth || w;
    this.popupProps.height = savedHeight || h;
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
      const savedWidth = StatePersistence.get("mngui_popup_width");
      const savedHeight = StatePersistence.get("mngui_popup_height");
      this.popupProps = {
        width: savedWidth || "360px",
        height: savedHeight || "480px",
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
      
      const popupWidth = popup.offsetWidth;
      const popupHeight = popup.offsetHeight;
      const maxLeft = window.innerWidth - popupWidth;
      const maxTop = window.innerHeight - popupHeight;
      
      let nextLeft = initialLeft + dx;
      let nextTop = initialTop + dy;
      
      // Keep within viewport boundaries
      nextLeft = Math.max(0, Math.min(nextLeft, maxLeft));
      nextTop = Math.max(0, Math.min(nextTop, maxTop));
      
      popup.style.left = `${nextLeft}px`;
      popup.style.top = `${nextTop}px`;
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
    
    const controlsContainer = document.createElement("div");
    controlsContainer.style.display = "flex";
    controlsContainer.style.alignItems = "center";
    controlsContainer.style.gap = "4px";

    const themeBtn = document.createElement("button");
    themeBtn.setAttribute("class", "mngui-close-btn");
    themeBtn.innerHTML = "🌓";
    themeBtn.title = "Toggle Light/Dark Mode";
    themeBtn.addEventListener("click", () => {
      if (this.theme && typeof this.theme.toggleMode === 'function') {
        this.theme.toggleMode();
      }
    });

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "mngui-close-btn");
    closeBtn.innerHTML = "×";
    
    controlsContainer.append(themeBtn);
    controlsContainer.append(closeBtn);

    this.header.append(titleSpan);
    this.header.append(controlsContainer);
    this.child.append(this.header);
    
    getShadowRoot().append(this.child);

    const togglePopup = () => {
      if (this.isOpen) {
        this.hide();
      } else {
        this.show();
      }
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
    this.enableResizing();

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

  enableResizing() {
    const popup = this.child;
    const resizer = document.createElement("div");
    resizer.setAttribute("class", "mngui-resizer");
    popup.append(resizer);

    let isResizing = false;
    let startWidth, startHeight, startX, startY;

    resizer.addEventListener("mousedown", initResize);
    resizer.addEventListener("touchstart", initResize, { passive: true });

    function initResize(e) {
      isResizing = true;
      const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      startWidth = popup.offsetWidth;
      startHeight = popup.offsetHeight;

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
      document.addEventListener("touchmove", resize, { passive: false });
      document.addEventListener("touchend", stopResize);
    }

    const self = this;
    function resize(e) {
      if (!isResizing) return;
      if (e.type === "touchmove") e.preventDefault();

      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      const newWidth = Math.max(280, startWidth + dx);
      const newHeight = Math.max(300, startHeight + dy);

      popup.style.width = `${newWidth}px`;
      popup.style.height = `${newHeight}px`;

      self.popupProps.width = `${newWidth}px`;
      self.popupProps.height = `${newHeight}px`;
    }

    function stopResize() {
      if (isResizing) {
        isResizing = false;
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);
        document.removeEventListener("touchmove", resize);
        document.removeEventListener("touchend", stopResize);

        StatePersistence.set("mngui_popup_width", popup.style.width);
        StatePersistence.set("mngui_popup_height", popup.style.height);
      }
    }
  }
}
