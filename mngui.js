/**
 * MNGUI - Lightweight, Premium Userscript Layout Library
 * Version: 2.0.0
 * Author: Nghiapd & Antigravity
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const exports = factory();
    root.MNGUI = exports.MNGUI;
    // Export utility classes globally for direct access in Tampermonkey scripts
    for (const key in exports) {
      if (exports.hasOwnProperty(key)) {
        root[key] = exports[key];
      }
    }
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class StackNavigator {
    constructor (screens = [], initScreen = "") {
      this.stack = [screens.find(screen => screen.name === initScreen) || screens[0]];
      this.screenList = screens;
    }

    get currentScreen() {
      return ({
        ...this.stack[this.stack.length - 1],
        screenIndex: this.stack.length - 1,
      });
    }

    navigation(name) {
      const screen = this.screenList.find(screen => screen.name === name);
      if (!screen) return console.warn("Screen not found: " + name);

      const prevScreen = this.currentScreen;
      const screenIndex = this.stack.findIndex(screen => screen.name === name);

      if (screenIndex > -1) {
        // Back to previous screen in the stack
        prevScreen.component.hide("right", () => {
          for (let i = screenIndex + 1; i < this.stack.length; i++) {
            this.stack[i].component.destroy();
          }
          this.stack.splice(screenIndex + 1);
        });
        
        const targetScreen = this.stack[screenIndex];
        targetScreen.component.show("left");
      }
      else {
        // Go forward to a new screen
        prevScreen.component.hide("left");
        this.stack.push(screen);
        this.currentScreen.component.show("right");
      }
    }

    back() {
      if (this.stack.length <= 1) return console.warn("No screen to go back to");
      
      const prevScreen = this.currentScreen;
      prevScreen.component.hide("right", () => {
        prevScreen.component.destroy();
        this.stack.pop();
      });
      
      const targetScreen = this.stack[this.stack.length - 2];
      targetScreen.component.show("left");
    }
  }

  class MNGUI {
    constructor () {
      this.theme = new Theme();
      this.popup = new Popup(this.theme);
    }

    append(child) {
      this.popup.append(child);
    }

    setNavigator(navigator) {
      this.navigator = navigator;
      this.popup.append(this.navigator.currentScreen.component);
    }

    navigation(name) {
      const prevComponent = this.navigator.currentScreen.component;
      this.navigator.navigation(name);
      const newComponent = this.navigator.currentScreen.component;

      if (prevComponent !== newComponent) {
        this.popup.append(newComponent);
        // Let the CSS transition handle it. The old component will be hidden and cleared out automatically
      }
    }

    back() {
      const prevComponent = this.navigator.currentScreen.component;
      this.navigator.back();
      const newComponent = this.navigator.currentScreen.component;

      if (prevComponent !== newComponent) {
        this.popup.append(newComponent);
      }
    }

    render() {
      this.popup.onShow(() => this.navigator.currentScreen.component.show("left"));
      this.popup.onClose(() => this.navigator.currentScreen.component.hide("right"));
      this.popup.render();
    }
  }

  class Theme {
    constructor (
      primary = "#6366f1",
      primaryVariant = "#4f46e5",
      secondary = "#ef4444",
      secondaryVariant = "#dc2626",
      background = "#f3f4f6",
      surface = "rgba(255, 255, 255, 0.75)",
      error = "#ef4444",
      onPrimary = "#ffffff",
      onSecondary = "#ffffff",
      onBackground = "#1f2937",
      onSurface = "#1f2937",
      onError = "#ffffff"
    ) {
      this.primary = primary;
      this.primaryVariant = primaryVariant;
      this.secondary = secondary;
      this.secondaryVariant = secondaryVariant;
      this.background = background;
      this.surface = surface;
      this.error = error;
      this.onPrimary = onPrimary;
      this.onSecondary = onSecondary;
      this.onBackground = onBackground;
      this.onSurface = onSurface;
      this.onError = onError;

      const css = `
        :root {
          --mn_primary: ${this.primary};
          --mn_primaryVariant: ${this.primaryVariant};
          --mn_secondary: ${this.secondary};
          --mn_secondaryVariant: ${this.secondaryVariant};
          --mn_background: ${this.background};
          --mn_surface: ${this.surface};
          --mn_surface_solid: #ffffff;
          --mn_error: ${this.error};
          --mn_onPrimary: ${this.onPrimary};
          --mn_onSecondary: ${this.onSecondary};
          --mn_onBackground: ${this.onBackground};
          --mn_onSurface: ${this.onSurface};
          --mn_onError: ${this.onError};
          --mn_border: rgba(0, 0, 0, 0.08);
          --mn_shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          --mn_radius: 12px;
          --mn_font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --mn_background: #111827;
            --mn_surface: rgba(31, 41, 55, 0.8);
            --mn_surface_solid: #1f2937;
            --mn_border: rgba(255, 255, 255, 0.08);
            --mn_onBackground: #f9fafb;
            --mn_onSurface: #f9fafb;
            --mn_shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
          }
        }

        * {
          box-sizing: border-box;
        }

        div.mn-column {
          display: flex;
          flex-direction: column;
          background: transparent;
          gap: 12px;
          width: 100%;
        }

        div.mn-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          background: transparent;
          gap: 12px;
          width: 100%;
        }

        .mn-padding {
          padding: 12px;
        }

        .mn-normal-text {
          font-size: 14px;
          color: var(--mn_onSurface);
          font-family: var(--mn_font);
          line-height: 1.5;
        }

        /* Switch */
        .mn-toggle {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--mn_font);
          color: var(--mn_onSurface);
          font-size: 14px;
          user-select: none;
        }
        .mn-toggle-switch {
          display: inline-block;
          background: var(--mn_background);
          border-radius: 16px;
          width: 50px;
          height: 26px;
          position: relative;
          transition: background 0.25s ease, border-color 0.25s ease;
          border: 1px solid var(--mn_border);
        }
        .mn-toggle-switch:before {
          content: "";
          display: block;
          background: var(--mn_surface_solid);
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          width: 20px;
          height: 20px;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .mn-toggle-checkbox:checked + .mn-toggle-switch {
          background: var(--mn_primary);
          border-color: var(--mn_primaryVariant);
        }
        .mn-toggle-checkbox:checked + .mn-toggle-switch:before {
          transform: translateX(24px);
        }
        .mn-toggle-checkbox {
          position: absolute;
          visibility: hidden;
        }
        .mn-toggle-label {
          font-weight: 500;
        }

        /* Checkbox */
        .mn-checkbox-container {
          display: flex;
          align-items: center;
          position: relative;
          padding-left: 30px;
          cursor: pointer;
          font-size: 14px;
          font-family: var(--mn_font);
          color: var(--mn_onSurface);
          user-select: none;
          font-weight: 500;
        }
        .mn-checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        .mn-checkmark {
          position: absolute;
          top: 5px;
          left: 0;
          height: 18px;
          width: 18px;
          background-color: var(--mn_background);
          border: 1px solid var(--mn_border);
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .mn-checkbox-container:hover input ~ .mn-checkmark {
          border-color: var(--mn_primary);
        }
        .mn-checkbox-container input:checked ~ .mn-checkmark {
          background-color: var(--mn_primary);
          border-color: var(--mn_primary);
        }
        .mn-checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        .mn-checkbox-container input:checked ~ .mn-checkmark:after {
          display: block;
        }
        .mn-checkbox-container .mn-checkmark:after {
          left: 6px;
          top: 2px;
          width: 4px;
          height: 9px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        /* Input */
        .mn-input {
          border: 1.5px solid var(--mn_border);
          height: 2.6em;
          padding: 0 12px;
          outline: none;
          font-family: var(--mn_font);
          font-size: 14px;
          color: var(--mn_onSurface);
          background-color: var(--mn_background);
          border-radius: 8px;
          transition: border-color 0.25s, box-shadow 0.25s;
          width: 100%;
        }
        .mn-input:focus {
          border-color: var(--mn_primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
          background-color: var(--mn_surface_solid);
        }
        .mn-input::placeholder {
          color: var(--mn_onSurface);
          opacity: 0.5;
        }

        /* Slider */
        .mn-slider-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          font-family: var(--mn_font);
        }
        .mn-slider-header {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 600;
          color: var(--mn_onSurface);
        }
        .mn-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--mn_border);
          outline: none;
          transition: background 0.15s ease;
        }
        .mn-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--mn_primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
          transition: transform 0.15s ease;
        }
        .mn-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        /* Select */
        .mn-select {
          display: block;
          margin: 6px 0;
          width: 100%;
          font-family: var(--mn_font);
          position: relative;
        }
        .mn-select-label {
          cursor: pointer;
          display: block;
          width: 100%;
        }
        .mn-select [type=button] {
          background: var(--mn_background);
          border: 1px solid var(--mn_border);
          border-radius: 8px;
          color: var(--mn_onSurface);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 38px;
          padding: 0 16px;
          outline: none;
          font-family: var(--mn_font);
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          text-align: left;
        }
        .mn-select [type=button]:focus, .mn-select [type=button]:hover {
          border-color: var(--mn_primary);
          background: var(--mn_surface_solid);
        }
        .mn-select [type=button]:after {
          content: '▾';
          font-size: 12px;
          opacity: 0.7;
          transition: transform 0.2s ease;
        }
        .mn-select.mn-active [type=button]:after {
          transform: rotate(180deg);
        }
        .mn-select ul[role=listbox] {
          background-color: var(--mn_surface_solid);
          border: 1px solid var(--mn_border);
          border-radius: 8px;
          color: var(--mn_onSurface);
          list-style: none;
          margin: 4px 0 0 0;
          max-height: 0;
          position: absolute;
          left: 0;
          right: 0;
          padding: 0;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease;
          box-shadow: var(--mn_shadow);
          overflow-y: auto;
          scrollbar-width: thin;
          z-index: 10;
        }
        .mn-select ul[role=listbox] li {
          height: 38px;
          margin: 0;
          padding: 10px 16px;
          outline: none;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          transition: background-color 0.15s;
        }
        .mn-select ul[role=listbox] li:hover, .mn-select ul[role=listbox] li.mn-active {
          background: var(--mn_primary);
          color: var(--mn_onPrimary);
        }
        .mn-select.mn-active ul[role=listbox] {
          max-height: 180px;
          opacity: 1;
          pointer-events: auto;
        }

        /* Button */
        .mn-button {
          padding: 10px 20px;
          border: 1.5px solid var(--mn_primary);
          background-color: transparent;
          color: var(--mn_primary);
          font-family: var(--mn_font);
          font-size: 14px;
          cursor: pointer;
          border-radius: 30px;
          transition: all 0.25s ease;
          outline: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .mn-button:hover {
          background: var(--mn_primary);
          color: var(--mn_onPrimary);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        .mn-button:active {
          transform: scale(0.98);
        }

        /* Divider & Badge */
        .mn-divider {
          border: 0;
          height: 1px;
          background: var(--mn_border);
          margin: 8px 0;
          width: 100%;
        }
        .mn-badge {
          display: inline-block;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 10px;
          font-family: var(--mn_font);
        }
        .mn-badge-primary { background-color: var(--mn_primary); }
        .mn-badge-secondary { background-color: var(--mn_secondary); }
        .mn-badge-success { background-color: #10b981; }
        .mn-badge-warning { background-color: #f59e0b; }

        /* Screens */
        .mn-screen {
          position: absolute;
          padding: 16px;
          inset: 0;
          top: 48px; /* account for header space */
          width: 100%;
          height: calc(100% - 48px);
          background: transparent;
          opacity: 0;
          transform: translateX(0);
          pointer-events: none;
          transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          overflow-y: auto;
          scrollbar-width: thin;
        }
        .mn-screen.show {
          opacity: 1;
          pointer-events: auto;
          z-index: 2;
          transform: translateX(0) !important;
        }
        .mn-screen.enter-from-right {
          transform: translateX(100%);
          opacity: 0;
        }
        .mn-screen.enter-from-left {
          transform: translateX(-100%);
          opacity: 0;
        }
        .mn-screen.exit-to-right {
          transform: translateX(100%);
          opacity: 0;
        }
        .mn-screen.exit-to-left {
          transform: translateX(-100%);
          opacity: 0;
        }

        /* Draggable Header bar styling */
        #mngui-header {
          height: 48px;
          width: 100%;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--mn_border);
          background: rgba(255, 255, 255, 0.05);
          cursor: move;
          user-select: none;
          font-family: var(--mn_font);
        }
        .mngui-title {
          font-weight: 700;
          color: var(--mn_onSurface);
          font-size: 15px;
        }
        .mngui-close-btn {
          border: none;
          background: transparent;
          color: var(--mn_onSurface);
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          transition: background-color 0.2s;
          opacity: 0.7;
        }
        .mngui-close-btn:hover {
          background-color: var(--mn_border);
          opacity: 1;
        }

        /* Toast notifications container */
        #mn-toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          font-family: var(--mn_font);
        }
        .mn-toast {
          min-width: 200px;
          max-width: 320px;
          padding: 12px 18px;
          border-radius: 8px;
          background: var(--mn_surface_solid);
          color: var(--mn_onSurface);
          font-size: 13px;
          font-weight: 500;
          box-shadow: var(--mn_shadow);
          border: 1px solid var(--mn_border);
          transform: translateY(-20px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          pointer-events: auto;
        }
        .mn-toast.show {
          transform: translateY(0);
          opacity: 1;
        }
        .mn-toast-success {
          border-left: 4px solid #10b981;
        }
        .mn-toast-error {
          border-left: 4px solid #ef4444;
        }
        .mn-toast-info {
          border-left: 4px solid var(--mn_primary);
        }
      `;

      const style = document.createElement("style");
      style.textContent = css;
      document.head.append(style);
    }
  }

  class Popup {
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
      const style = `
        <style>
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
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
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
        </style>
      `;

      document.head.insertAdjacentHTML("beforeend", style);

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
      
      document.body.append(this.child);

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

        document.body.append(toggleBtn);
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

  class BaseComponent {
    constructor (element) {
      this.element = element;
    }
    append(nodes) {
      if (Array.isArray(nodes)) {
        nodes.forEach(node => this.element.append(node.element));
      } else {
        this.element.append(nodes.element);
      }
      return this;
    }

    style(css) {
      this.element.setAttribute("style", css);
      return this;
    }

    destroy() {
      this.element.remove();
    }

    clone() {
      const cloneElement = this.element.cloneNode(true);
      const clonedInstance = new this.constructor();
      clonedInstance.element = cloneElement;
      return clonedInstance;
    }
  }

  class MNColumn extends BaseComponent {
    constructor () {
      super(document.createElement("div"));
      this.element.setAttribute("class", "mn-column mn-padding");
    }
  }

  class MNRow extends BaseComponent {
    constructor () {
      super(document.createElement("div"));
      this.element.setAttribute("class", "mn-row mn-padding");
    }
  }

  class MNText extends BaseComponent {
    constructor (content = "") {
      super(document.createElement("span"));
      this.element.setAttribute("class", "mn-normal-text");
      this.element.textContent = content;
    }

    append() { }
  }

  class MNSwitch extends BaseComponent {
    constructor (title = "") {
      super(document.createElement("label"));
      this.element.setAttribute("class", "mn-toggle");

      this.input = document.createElement("input");
      this.input.setAttribute("type", "checkbox");
      this.input.setAttribute("class", "mn-toggle-checkbox");

      this.sw = document.createElement("div");
      this.sw.setAttribute("class", "mn-toggle-switch");

      this.label = document.createElement("span");
      this.label.setAttribute("class", "mn-toggle-label");
      this.label.textContent = title;

      this.element.append(this.input);
      this.element.append(this.sw);
      this.element.append(this.label);
    }

    append() { }

    onChange(callback) {
      this.input.addEventListener("change", () => {
        callback(this.input.checked);
      });
      return this;
    }

    clone() {
      const clonedInstance = super.clone();
      clonedInstance.input = clonedInstance.element.querySelector(".mn-toggle-checkbox");
      clonedInstance.sw = clonedInstance.element.querySelector(".mn-toggle-switch");
      clonedInstance.label = clonedInstance.element.querySelector(".mn-toggle-label");
      return clonedInstance;
    }
  }

  class MNCheckbox extends BaseComponent {
    constructor (title = "", checked = false) {
      super(document.createElement("label"));
      this.element.setAttribute("class", "mn-checkbox-container");

      this.input = document.createElement("input");
      this.input.setAttribute("type", "checkbox");
      this.input.checked = checked;

      this.checkmark = document.createElement("span");
      this.checkmark.setAttribute("class", "mn-checkmark");

      this.label = document.createElement("span");
      this.label.textContent = title;

      this.element.append(this.input);
      this.element.append(this.checkmark);
      this.element.append(this.label);
    }

    append() { }

    onChange(callback) {
      this.input.addEventListener("change", () => {
        callback(this.input.checked);
      });
      return this;
    }

    clone() {
      const clonedInstance = super.clone();
      clonedInstance.input = clonedInstance.element.querySelector("input");
      clonedInstance.checkmark = clonedInstance.element.querySelector(".mn-checkmark");
      clonedInstance.label = clonedInstance.element.querySelector("span:not(.mn-checkmark)");
      return clonedInstance;
    }
  }

  class MNSlider extends BaseComponent {
    constructor (title = "", min = 0, max = 100, value = 50, step = 1) {
      super(document.createElement("div"));
      this.element.setAttribute("class", "mn-slider-container");

      const header = document.createElement("div");
      header.setAttribute("class", "mn-slider-header");

      const label = document.createElement("span");
      label.textContent = title;

      this.valueDisplay = document.createElement("span");
      this.valueDisplay.textContent = value;

      header.append(label);
      header.append(this.valueDisplay);

      this.input = document.createElement("input");
      this.input.setAttribute("type", "range");
      this.input.setAttribute("min", min);
      this.input.setAttribute("max", max);
      this.input.setAttribute("value", value);
      this.input.setAttribute("step", step);
      this.input.setAttribute("class", "mn-slider");

      this.element.append(header);
      this.element.append(this.input);

      this.input.addEventListener("input", () => {
        this.valueDisplay.textContent = this.input.value;
      });
    }

    append() { }

    onChange(callback) {
      this.input.addEventListener("input", () => {
        callback(Number(this.input.value));
      });
      return this;
    }

    clone() {
      const clonedInstance = super.clone();
      clonedInstance.input = clonedInstance.element.querySelector(".mn-slider");
      clonedInstance.valueDisplay = clonedInstance.element.querySelector(".mn-slider-value") || clonedInstance.element.querySelector("span:last-child");
      return clonedInstance;
    }
  }

  class MNInput extends BaseComponent {
    constructor (placeholder = "") {
      super(document.createElement("input"));
      this.element.setAttribute("placeholder", placeholder);
      this.element.setAttribute("class", "mn-input");
    }

    append() { }

    onChange(callback) {
      this.element.addEventListener("input", () => {
        callback(this.element.value);
      });
      return this;
    }

    onSubmit(callback) {
      this.element.addEventListener("change", () => {
        this.element.blur();
        callback(this.element.value);
      });
      return this;
    }

    // Maintain backward compatibility for typo
    onSummit(callback) {
      return this.onSubmit(callback);
    }

    onFocus(callback) {
      this.element.addEventListener("focus", () => {
        callback(this.element.value);
      });
      return this;
    }
  }

  class MNSelect extends BaseComponent {
    constructor (placeholder = "") {
      super(document.createElement("div"));
      this.element.setAttribute("class", "mn-select");

      this.button = document.createElement("button");
      this.button.setAttribute("type", "button");
      this.button.textContent = placeholder;

      const label = document.createElement("label");
      label.setAttribute("class", "mn-select-label");
      label.append(this.button);

      this.ul = document.createElement("ul");
      this.ul.setAttribute("role", "listbox");

      this.element.append(label);
      this.element.append(this.ul);
      this.setup();
    }

    append() { }

    setup() {
      this.button.addEventListener("click", (e) => {
        e.stopPropagation();
        this.element.classList.toggle("mn-active");
      });

      document.addEventListener("click", () => {
        this.element.classList.remove("mn-active");
      });

      this.ul.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        
        this.button.textContent = li.textContent;
        this.ul.querySelector("li.mn-active")?.classList?.remove("mn-active");
        li.classList.add("mn-active");
        this.element.classList.remove("mn-active");
      });

      return this;
    }

    setData(data) {
      this.ul.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.setAttribute("role", "option");
        li.setAttribute("id", item?.id || item);
        li.textContent = item?.name || item;
        this.ul.append(li);
      });
      return this;
    }

    onChange(callback) {
      this.ul.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (li) {
          callback(li.id, li.textContent);
        }
      });
      return this;
    }

    clone() {
      const clonedInstance = super.clone();
      clonedInstance.button = clonedInstance.element.querySelector("button");
      clonedInstance.ul = clonedInstance.element.querySelector("ul");
      clonedInstance.setup();
      return clonedInstance;
    }
  }

  class MNButton extends BaseComponent {
    constructor (title = "") {
      super(document.createElement("button"));
      this.element.setAttribute("class", "mn-button");
      this.element.textContent = title;
    }

    append() { }

    onClick(callback) {
      this.element.addEventListener("click", (e) => {
        callback(e);
      });
      return this;
    }
  }

  class MNScreen extends BaseComponent {
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
        this.element.removeEventListener("transitionend", onEnd);
        this.element.classList.remove("exit-to-left", "exit-to-right");
        if (callback) callback();
      };
      
      this.element.addEventListener("transitionend", onEnd, { once: true });
    }
  }

  class MNBadge extends BaseComponent {
    constructor(content = "", type = "primary") {
      super(document.createElement("span"));
      this.element.setAttribute("class", `mn-badge mn-badge-${type}`);
      this.element.textContent = content;
    }
    append() { }
  }

  class MNDivider extends BaseComponent {
    constructor() {
      super(document.createElement("hr"));
      this.element.setAttribute("class", "mn-divider");
    }
    append() { }
  }

  class MNToast {
    static container = null;
    
    static ensureContainer() {
      if (!this.container) {
        this.container = document.createElement("div");
        this.container.setAttribute("id", "mn-toast-container");
        document.body.append(this.container);
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

  return {
    MNGUI,
    StackNavigator,
    Theme,
    Popup,
    BaseComponent,
    MNColumn,
    MNRow,
    MNText,
    MNSwitch,
    MNCheckbox,
    MNSlider,
    MNInput,
    MNSelect,
    MNButton,
    MNScreen,
    MNBadge,
    MNDivider,
    MNToast
  };
}));