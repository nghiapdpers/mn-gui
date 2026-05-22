(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/core/StackNavigator.js
  var StackNavigator;
  var init_StackNavigator = __esm({
    "src/core/StackNavigator.js"() {
      StackNavigator = class {
        constructor(screens = [], initScreen = "") {
          this.stack = [screens.find((screen) => screen.name === initScreen) || screens[0]];
          this.screenList = screens;
        }
        get currentScreen() {
          return {
            ...this.stack[this.stack.length - 1],
            screenIndex: this.stack.length - 1
          };
        }
        navigation(name) {
          const screen = this.screenList.find((screen2) => screen2.name === name);
          if (!screen) return console.warn("Screen not found: " + name);
          const prevScreen = this.currentScreen;
          const screenIndex = this.stack.findIndex((screen2) => screen2.name === name);
          if (screenIndex > -1) {
            prevScreen.component.hide("right", () => {
              for (let i = screenIndex + 1; i < this.stack.length; i++) {
                this.stack[i].component.destroy();
              }
              this.stack.splice(screenIndex + 1);
            });
            const targetScreen = this.stack[screenIndex];
            targetScreen.component.show("left");
          } else {
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
      };
    }
  });

  // src/core/StatePersistence.js
  var StatePersistence;
  var init_StatePersistence = __esm({
    "src/core/StatePersistence.js"() {
      StatePersistence = class {
        static get(key) {
          let rawVal = null;
          try {
            if (typeof GM_getValue !== "undefined") {
              rawVal = GM_getValue(key);
            }
          } catch (e) {
          }
          if (rawVal === null || rawVal === void 0) {
            try {
              rawVal = localStorage.getItem(key);
            } catch (e) {
            }
          }
          if (rawVal === null || rawVal === void 0) return null;
          try {
            return JSON.parse(rawVal);
          } catch (e) {
            return rawVal;
          }
        }
        static set(key, value) {
          const serialized = JSON.stringify(value);
          try {
            if (typeof GM_setValue !== "undefined") {
              GM_setValue(key, serialized);
            }
          } catch (e) {
          }
          try {
            localStorage.setItem(key, serialized);
          } catch (e) {
          }
        }
      };
    }
  });

  // src/core/BaseComponent.js
  function getShadowRoot() {
    if (!mnguiShadowRoot) {
      let mnguiRoot = document.getElementById("mngui-root-container");
      if (!mnguiRoot) {
        mnguiRoot = document.createElement("div");
        mnguiRoot.setAttribute("id", "mngui-root-container");
        mnguiRoot.style.position = "absolute";
        mnguiRoot.style.width = "0";
        mnguiRoot.style.height = "0";
        mnguiRoot.style.overflow = "visible";
        mnguiRoot.style.zIndex = "999999";
        document.body.append(mnguiRoot);
      }
      mnguiShadowRoot = mnguiRoot.shadowRoot || mnguiRoot.attachShadow({ mode: "open" });
    }
    return mnguiShadowRoot;
  }
  function injectStyle(id, css) {
    const shadow = getShadowRoot();
    if (!shadow.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = css;
      shadow.append(style);
    }
  }
  var mnguiShadowRoot, BaseComponent;
  var init_BaseComponent = __esm({
    "src/core/BaseComponent.js"() {
      init_StatePersistence();
      mnguiShadowRoot = null;
      BaseComponent = class {
        constructor(element) {
          this.element = element;
          this._listeners = [];
        }
        addEventListenerSafe(target, type, listener, options) {
          if (!target) return this;
          target.addEventListener(type, listener, options);
          this._listeners.push({ target, type, listener, options });
          return this;
        }
        removeEventListenerSafe(target, type, listener, options) {
          if (!target) return this;
          target.removeEventListener(type, listener, options);
          this._listeners = this._listeners.filter(
            (l) => !(l.target === target && l.type === type && l.listener === listener)
          );
          return this;
        }
        on(type, listener, options) {
          return this.addEventListenerSafe(this.element, type, listener, options);
        }
        bind(state) {
          if (!state || typeof state.subscribe !== "function") return this;
          this.unsubscribeState = state.subscribe((val) => {
            if (typeof this.setValueSilently === "function") {
              this.setValueSilently(val);
            } else if (typeof this.setValue === "function") {
              this.setValue(val);
            }
          });
          const updateState = () => {
            if (typeof this.getValue === "function") {
              const val = this.getValue();
              if (val !== null && val !== void 0) {
                state.value = val;
              }
            }
          };
          this.addEventListenerSafe(this.element, "change", updateState);
          this.addEventListenerSafe(this.element, "input", updateState);
          return this;
        }
        append(nodes) {
          if (Array.isArray(nodes)) {
            nodes.forEach((node) => this.element.append(node.element));
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
          if (this.unsubscribeState) {
            this.unsubscribeState();
          }
          this._listeners.forEach(({ target, type, listener, options }) => {
            target.removeEventListener(type, listener, options);
          });
          this._listeners = [];
          this.element.remove();
        }
        clone() {
          const cloneElement = this.element.cloneNode(true);
          const clonedInstance = new this.constructor();
          clonedInstance.element = cloneElement;
          return clonedInstance;
        }
        // --- State Persistence & Values (v3) ---
        persist(key) {
          this.persistKey = key;
          const val = StatePersistence.get(this.persistKey);
          if (val !== null && val !== void 0) {
            this.setValueSilently(val);
          }
          this.addEventListenerSafe(this.element, "change", () => {
            this.savePersistedValue(this.getValue());
          });
          this.addEventListenerSafe(this.element, "input", () => {
            this.savePersistedValue(this.getValue());
          });
          return this;
        }
        getValue() {
          return null;
        }
        setValue(val) {
          return this;
        }
        setValueSilently(val) {
          return this;
        }
        savePersistedValue(val) {
          if (this.persistKey && val !== null && val !== void 0) {
            StatePersistence.set(this.persistKey, val);
          }
        }
      };
    }
  });

  // src/core/Theme.js
  var Theme;
  var init_Theme = __esm({
    "src/core/Theme.js"() {
      init_BaseComponent();
      init_StatePersistence();
      Theme = class {
        constructor(primary = "#10b981", primaryVariant = "#059669", secondary = "#f59e0b", secondaryVariant = "#d97706", background = "#f4fcf7", surface = "#ffffff", error = "#ef4444", onPrimary = "#ffffff", onSecondary = "#ffffff", onBackground = "#0f172a", onSurface = "#0f172a", onError = "#ffffff") {
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
          this.mode = StatePersistence.get("mngui_theme_mode") || "auto";
          const css = `
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
        gap: 10px;
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
        display: inline-block;
        position: relative;
        height: 18px;
        width: 18px;
        background-color: var(--mn_background);
        border: 1px solid var(--mn_border);
        border-radius: 50%;
        transition: all 0.2s ease;
        flex-shrink: 0;
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
        top: 2.5px;
        width: 4px;
        height: 8px;
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
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
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
        content: '\u25BE';
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
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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

      /* Accordion Collapsible Group */
      .mn-accordion {
        width: 100%;
        border-radius: var(--mn_radius);
        border: 1px solid var(--mn_border);
        background: var(--mn_surface);
        overflow: hidden;
        margin-bottom: 4px;
        transition: all 0.25s ease;
      }
      .mn-accordion-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
        user-select: none;
        font-family: var(--mn_font);
        color: var(--mn_onSurface);
        font-size: 14px;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.02);
        transition: background 0.2s ease;
      }
      .mn-accordion-header:hover {
        background: rgba(0, 0, 0, 0.05);
      }
      .mn-accordion-chevron {
        width: 16px;
        height: 16px;
        fill: currentColor;
        transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .mn-accordion.mn-expanded .mn-accordion-chevron {
        transform: rotate(90deg);
      }
      .mn-accordion-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        border-top: 1px solid var(--mn_border);
        max-height: 2000px;
        opacity: 1;
        transition: max-height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), padding 0.3s ease, opacity 0.2s ease;
        overflow: hidden;
      }
      .mn-accordion:not(.mn-expanded) .mn-accordion-body {
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
        opacity: 0;
        border-top-color: transparent;
        pointer-events: none;
      }

      /* Color Picker Component */
      .mn-color-picker {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 12px;
        font-family: var(--mn_font);
        color: var(--mn_onSurface);
        font-size: 14px;
      }
      .mn-color-picker-label {
        font-weight: 500;
      }
      .mn-color-picker-control {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .mn-color-picker-dot {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid var(--mn_border);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.15s ease;
      }
      .mn-color-picker-dot:hover {
        transform: scale(1.1);
      }
      .mn-color-picker-input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        width: 0;
        height: 0;
      }
      .mn-color-picker-value {
        font-family: monospace;
        font-size: 13px;
        color: var(--mn_onSurface);
        opacity: 0.8;
        text-transform: uppercase;
      }

      /* MNImage */
      .mn-image-container { position: relative; display: inline-block; width: 100%; border-radius: var(--mn_radius); overflow: hidden; background: rgba(0,0,0,0.05); }
      .mn-image { display: block; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s; }
      .mn-image.mn-loaded { opacity: 1; }
      .mn-image-error { display: flex; align-items: center; justify-content: center; background: var(--mn_surface); color: var(--mn_error); font-family: var(--mn_font); font-size: 13px; padding: 20px; text-align: center; }
      .mn-skeleton { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.15) 37%, rgba(0,0,0,0.06) 63%); background-size: 400% 100%; animation: mn-skeleton-loading 1.4s ease infinite; }
      @keyframes mn-skeleton-loading { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }

      /* MNTabs */
      .mn-tabs-container { display: flex; flex-direction: column; width: 100%; font-family: var(--mn_font); }
      .mn-tabs-header { display: flex; border-bottom: 2px solid var(--mn_border); gap: 16px; margin-bottom: 16px; overflow-x: auto; scrollbar-width: none; }
      .mn-tabs-header::-webkit-scrollbar { display: none; }
      .mn-tab-btn { background: transparent; border: none; padding: 8px 4px; font-size: 14px; font-weight: 600; color: var(--mn_onSurface); opacity: 0.6; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.2s; white-space: nowrap; }
      .mn-tab-btn:hover { opacity: 1; }
      .mn-tab-btn.mn-active { opacity: 1; color: var(--mn_primary); border-bottom-color: var(--mn_primary); }
      .mn-tab-pane { display: none; flex-direction: column; gap: 12px; animation: mn-fade-in 0.3s ease; }
      .mn-tab-pane.mn-active { display: flex; }
      @keyframes mn-fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

      /* MNTextArea */
      .mn-textarea { width: 100%; padding: 10px 12px; border: 1.5px solid var(--mn_border); border-radius: var(--mn_radius); background: var(--mn_background); color: var(--mn_onSurface); font-family: var(--mn_font); font-size: 14px; resize: none; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; }
      .mn-textarea:focus { outline: none; border-color: var(--mn_primary); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15); background: var(--mn_surface_solid); }
      
      /* MNProgressBar */
      .mn-progress-container { display: flex; align-items: center; gap: 12px; width: 100%; font-family: var(--mn_font); }
      .mn-progress-bar { flex: 1; height: 8px; background: var(--mn_border); border-radius: 4px; overflow: hidden; }
      .mn-progress-fill { height: 100%; background: var(--mn_primary); border-radius: 4px; transition: width 0.3s ease; }
      .mn-progress-label { font-size: 13px; font-weight: 600; color: var(--mn_onSurface); min-width: 40px; text-align: right; }

      /* MNSpinner */
      .mn-spinner { border: 3px solid var(--mn_border); border-radius: 50%; border-top-color: var(--mn_primary); animation: mn-spin 1s linear infinite; }
      @keyframes mn-spin { to { transform: rotate(360deg); } }

      /* MNTooltip */
      .mn-tooltip-wrapper { position: relative; display: inline-block; }
      .mn-tooltip { position: absolute; background: var(--mn_onSurface); color: var(--mn_background); padding: 6px 10px; font-size: 12px; font-weight: 500; font-family: var(--mn_font); border-radius: 6px; white-space: nowrap; pointer-events: none; opacity: 0; transform: scale(0.95); transition: all 0.2s; z-index: 100; box-shadow: var(--mn_shadow); }
      .mn-tooltip-wrapper:hover > .mn-tooltip { opacity: 1; transform: scale(1); }
      .mn-tooltip.top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) scale(0.95); }
      .mn-tooltip.bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%) scale(0.95); }
      .mn-tooltip.left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%) scale(0.95); }
      .mn-tooltip.right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%) scale(0.95); }
      .mn-tooltip-wrapper:hover > .mn-tooltip.top, .mn-tooltip-wrapper:hover > .mn-tooltip.bottom { transform: translateX(-50%) scale(1); }
      .mn-tooltip-wrapper:hover > .mn-tooltip.left, .mn-tooltip-wrapper:hover > .mn-tooltip.right { transform: translateY(-50%) scale(1); }

      /* MNRadioGroup */
      .mn-radio-group { display: flex; flex-direction: column; gap: 10px; width: 100%; font-family: var(--mn_font); }
      .mn-radio-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; color: var(--mn_onSurface); font-weight: 500; user-select: none; position: relative; }
      .mn-radio-input { position: absolute; opacity: 0; width: 0; height: 0; }
      .mn-radio-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--mn_border); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
      .mn-radio-dot::after { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--mn_primary); transform: scale(0); transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .mn-radio-input:checked ~ .mn-radio-dot { border-color: var(--mn_primary); }
      .mn-radio-input:checked ~ .mn-radio-dot::after { transform: scale(1); }

      /* MNTable */
      .mn-table-wrapper { width: 100%; overflow-x: auto; border-radius: var(--mn_radius); border: 1px solid var(--mn_border); background: var(--mn_surface); }
      .mn-table { width: 100%; border-collapse: collapse; text-align: left; font-family: var(--mn_font); font-size: 13px; color: var(--mn_onSurface); }
      .mn-table th { padding: 12px 16px; font-weight: 600; border-bottom: 1px solid var(--mn_border); background: rgba(0,0,0,0.02); white-space: nowrap; }
      .mn-table td { padding: 10px 16px; border-bottom: 1px solid var(--mn_border); }
      .mn-table tr:last-child td { border-bottom: none; }
      .mn-table tr:hover td { background: rgba(0,0,0,0.02); }

      /* MNDialog */
      .mn-dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px); z-index: 10000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
      .mn-dialog-overlay.mn-show { opacity: 1; pointer-events: auto; }
      .mn-dialog { background: var(--mn_surface_solid); border: 1px solid var(--mn_border); border-radius: var(--mn_radius); padding: 20px; width: 90%; max-width: 320px; box-shadow: var(--mn_shadow); transform: scale(0.95); transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; flex-direction: column; gap: 12px; font-family: var(--mn_font); }
      .mn-dialog-overlay.mn-show .mn-dialog { transform: scale(1); }
      .mn-dialog-title { margin: 0; font-size: 16px; font-weight: 700; color: var(--mn_onSurface); }
      .mn-dialog-message { margin: 0; font-size: 14px; color: var(--mn_onSurface); opacity: 0.9; line-height: 1.5; }
      .mn-dialog-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }

      /* MNList & MNListItem */
      .mn-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: var(--mn_surface);
        border: 1px solid var(--mn_border);
        border-radius: var(--mn_radius);
        overflow: hidden;
        margin: 6px 0;
        padding: 4px 0;
        font-family: var(--mn_font);
      }
      .mn-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        gap: 12px;
        color: var(--mn_onSurface);
        border-bottom: 1px solid var(--mn_border);
      }
      .mn-list-item:last-child {
        border-bottom: none;
      }
      .mn-list-item:hover {
        background: rgba(0, 0, 0, 0.03);
      }
      :host([data-theme="dark"]) .mn-list-item:hover {
        background: rgba(255, 255, 255, 0.03);
      }
      @media (prefers-color-scheme: dark) {
        :host(:not([data-theme="light"])) .mn-list-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }
      }
      .mn-list-item-leading {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
      }
      .mn-list-item-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: 2px;
        min-width: 0;
      }
      .mn-list-item-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--mn_onSurface);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mn-list-item-subtitle {
        font-size: 12px;
        color: var(--mn_onSurface);
        opacity: 0.6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mn-list-item-trailing {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        font-size: 13px;
      }

      /* Panel Resizer */
      .mngui-resizer {
        position: absolute;
        width: 14px;
        height: 14px;
        right: 0;
        bottom: 0;
        cursor: se-resize;
        background: transparent;
        z-index: 100000;
      }
      .mngui-resizer::after {
        content: "";
        position: absolute;
        right: 3px;
        bottom: 3px;
        width: 6px;
        height: 6px;
        border-right: 2px solid var(--mn_border);
        border-bottom: 2px solid var(--mn_border);
        transition: border-color 0.2s;
      }
      .mngui-resizer:hover::after {
        border-right-color: var(--mn_primary);
        border-bottom-color: var(--mn_primary);
      }
    `;
          const style = document.createElement("style");
          style.textContent = css;
          getShadowRoot().append(style);
          this.applyVariables();
        }
        setMode(mode) {
          this.mode = mode;
          StatePersistence.set("mngui_theme_mode", mode);
          this.applyVariables();
        }
        toggleMode() {
          if (this.mode === "auto") {
            const isSystemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            this.setMode(isSystemDark ? "light" : "dark");
          } else {
            this.setMode(this.mode === "dark" ? "light" : "dark");
          }
        }
        applyVariables() {
          const variablesCss = `
      :host {
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

      /* Slate Dark Mode - Auto */
      @media (prefers-color-scheme: dark) {
        :host(:not([data-theme="light"])) {
          --mn_background: #0f172a;
          --mn_surface: rgba(15, 23, 42, 0.4);
          --mn_surface_solid: #1e293b;
          --mn_border: rgba(255, 255, 255, 0.1);
          --mn_onBackground: #f8fafc;
          --mn_onSurface: #f8fafc;
          --mn_shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
        }
      }

      /* Slate Dark Mode - Explicit */
      :host([data-theme="dark"]) {
        --mn_background: #0f172a;
        --mn_surface: rgba(15, 23, 42, 0.4);
        --mn_surface_solid: #1e293b;
        --mn_border: rgba(255, 255, 255, 0.1);
        --mn_onBackground: #f8fafc;
        --mn_onSurface: #f8fafc;
        --mn_shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
      }
    `;
          const hostElement = document.getElementById("mngui-root-container");
          if (hostElement) {
            if (this.mode === "auto") {
              hostElement.removeAttribute("data-theme");
            } else {
              hostElement.setAttribute("data-theme", this.mode);
            }
          }
          let varStyle = getShadowRoot().querySelector("#mngui-theme-variables");
          if (!varStyle) {
            varStyle = document.createElement("style");
            varStyle.setAttribute("id", "mngui-theme-variables");
            getShadowRoot().append(varStyle);
          }
          varStyle.textContent = variablesCss;
        }
      };
    }
  });

  // src/core/Popup.js
  var Popup;
  var init_Popup = __esm({
    "src/core/Popup.js"() {
      init_BaseComponent();
      init_StatePersistence();
      Popup = class {
        constructor(theme) {
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
            right: "20px"
          };
          this.toggleProps = {
            width: "50px",
            height: "50px",
            bottom: "20px",
            top: "",
            left: "",
            right: "20px",
            fontSize: "20px"
          };
          this.visibleToggle = true;
          this.icon = "\u{1F3B2}";
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
          if (Array.isArray(child)) child.forEach((c) => this.child.append(c.element));
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
          if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
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
              right: "20px"
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
          themeBtn.innerHTML = "\u{1F313}";
          themeBtn.title = "Toggle Light/Dark Mode";
          themeBtn.addEventListener("click", () => {
            if (this.theme && typeof this.theme.toggleMode === "function") {
              this.theme.toggleMode();
            }
          });
          const closeBtn = document.createElement("button");
          closeBtn.setAttribute("class", "mngui-close-btn");
          closeBtn.innerHTML = "\xD7";
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
            const keys = this.shortcut.split("+").map((key) => key.trim().toLowerCase());
            const lastKey = keys[keys.length - 1];
            const hasShift = keys.includes("shift");
            const hasCtrl = keys.includes("ctrl");
            const hasAlt = keys.includes("alt");
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
          const self2 = this;
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
            self2.popupProps.width = `${newWidth}px`;
            self2.popupProps.height = `${newHeight}px`;
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
      };
    }
  });

  // src/core/MNGUI.js
  var MNGUI;
  var init_MNGUI = __esm({
    "src/core/MNGUI.js"() {
      init_Theme();
      init_Popup();
      MNGUI = class {
        constructor() {
          this.theme = new Theme();
          this.popup = new Popup(this.theme);
        }
        append(child) {
          this.popup.append(child);
        }
        setNavigator(navigator2) {
          this.navigator = navigator2;
          this.popup.append(this.navigator.currentScreen.component);
        }
        navigation(name) {
          const prevComponent = this.navigator.currentScreen.component;
          this.navigator.navigation(name);
          const newComponent = this.navigator.currentScreen.component;
          if (prevComponent !== newComponent) {
            this.popup.append(newComponent);
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
      };
    }
  });

  // src/core/MNState.js
  var MNState;
  var init_MNState = __esm({
    "src/core/MNState.js"() {
      MNState = class {
        constructor(initialVal) {
          this._value = initialVal;
          this.listeners = [];
        }
        get value() {
          return this._value;
        }
        set value(newVal) {
          if (this._value !== newVal) {
            this._value = newVal;
            this.listeners.forEach((fn) => fn(newVal));
          }
        }
        subscribe(fn) {
          this.listeners.push(fn);
          fn(this._value);
          return () => {
            this.listeners = this.listeners.filter((l) => l !== fn);
          };
        }
      };
    }
  });

  // src/components/MNColumn.js
  var MNColumn;
  var init_MNColumn = __esm({
    "src/components/MNColumn.js"() {
      init_BaseComponent();
      MNColumn = class extends BaseComponent {
        constructor() {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-column mn-padding");
        }
      };
    }
  });

  // src/components/MNRow.js
  var MNRow;
  var init_MNRow = __esm({
    "src/components/MNRow.js"() {
      init_BaseComponent();
      MNRow = class extends BaseComponent {
        constructor() {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-row mn-padding");
        }
      };
    }
  });

  // src/components/MNText.js
  var MNText;
  var init_MNText = __esm({
    "src/components/MNText.js"() {
      init_BaseComponent();
      MNText = class extends BaseComponent {
        constructor(content = "") {
          super(document.createElement("span"));
          this.element.setAttribute("class", "mn-normal-text");
          this.element.textContent = content;
        }
        setValue(val) {
          this.element.textContent = val;
          return this;
        }
        getValue() {
          return this.element.textContent;
        }
        append() {
        }
      };
    }
  });

  // src/components/MNSwitch.js
  var MNSwitch;
  var init_MNSwitch = __esm({
    "src/components/MNSwitch.js"() {
      init_BaseComponent();
      MNSwitch = class extends BaseComponent {
        constructor(title = "") {
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
        append() {
        }
        getValue() {
          return this.input.checked;
        }
        setValue(val) {
          this.input.checked = val;
          this.input.dispatchEvent(new Event("change"));
          return this;
        }
        setValueSilently(val) {
          this.input.checked = val;
          return this;
        }
        onChange(callback) {
          this.addEventListenerSafe(this.input, "change", () => {
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
      };
    }
  });

  // src/components/MNCheckbox.js
  var MNCheckbox;
  var init_MNCheckbox = __esm({
    "src/components/MNCheckbox.js"() {
      init_BaseComponent();
      MNCheckbox = class extends BaseComponent {
        constructor(title = "", checked = false) {
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
        append() {
        }
        getValue() {
          return this.input.checked;
        }
        setValue(val) {
          this.input.checked = val;
          this.input.dispatchEvent(new Event("change"));
          return this;
        }
        setValueSilently(val) {
          this.input.checked = val;
          return this;
        }
        onChange(callback) {
          this.addEventListenerSafe(this.input, "change", () => {
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
      };
    }
  });

  // src/components/MNSlider.js
  var MNSlider;
  var init_MNSlider = __esm({
    "src/components/MNSlider.js"() {
      init_BaseComponent();
      MNSlider = class extends BaseComponent {
        constructor(title = "", min = 0, max = 100, value = 50, step = 1) {
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
          this.addEventListenerSafe(this.input, "input", () => {
            this.valueDisplay.textContent = this.input.value;
          });
        }
        append() {
        }
        getValue() {
          return Number(this.input.value);
        }
        setValue(val) {
          this.input.value = val;
          this.valueDisplay.textContent = val;
          this.input.dispatchEvent(new Event("input"));
          return this;
        }
        setValueSilently(val) {
          this.input.value = val;
          this.valueDisplay.textContent = val;
          return this;
        }
        onChange(callback) {
          this.addEventListenerSafe(this.input, "input", () => {
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
      };
    }
  });

  // src/components/MNInput.js
  var MNInput;
  var init_MNInput = __esm({
    "src/components/MNInput.js"() {
      init_BaseComponent();
      MNInput = class extends BaseComponent {
        constructor(placeholder = "") {
          super(document.createElement("input"));
          this.element.setAttribute("placeholder", placeholder);
          this.element.setAttribute("class", "mn-input");
        }
        append() {
        }
        getValue() {
          return this.element.value;
        }
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
          this.addEventListenerSafe(this.element, "input", () => {
            callback(this.element.value);
          });
          return this;
        }
        onSubmit(callback) {
          this.addEventListenerSafe(this.element, "change", () => {
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
          this.addEventListenerSafe(this.element, "focus", () => {
            callback(this.element.value);
          });
          return this;
        }
      };
    }
  });

  // src/components/MNSelect.js
  var MNSelect;
  var init_MNSelect = __esm({
    "src/components/MNSelect.js"() {
      init_BaseComponent();
      MNSelect = class extends BaseComponent {
        constructor(placeholder = "") {
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
        append() {
        }
        getValue() {
          const activeLi = this.ul.querySelector("li.mn-active");
          return activeLi ? activeLi.id : "";
        }
        setValue(id) {
          const li = this.ul.querySelector(`li[id='${id}']`);
          if (li) {
            this.button.textContent = li.textContent;
            this.ul.querySelector("li.mn-active")?.classList?.remove("mn-active");
            li.classList.add("mn-active");
            this.element.dispatchEvent(new Event("change"));
          }
          return this;
        }
        setValueSilently(id) {
          const li = this.ul.querySelector(`li[id='${id}']`);
          if (li) {
            this.button.textContent = li.textContent;
            this.ul.querySelector("li.mn-active")?.classList?.remove("mn-active");
            li.classList.add("mn-active");
          }
          return this;
        }
        setup() {
          this.addEventListenerSafe(this.button, "click", (e) => {
            e.stopPropagation();
            this.element.classList.toggle("mn-active");
          });
          this.addEventListenerSafe(document, "click", () => {
            this.element.classList.remove("mn-active");
          });
          this.addEventListenerSafe(this.ul, "click", (e) => {
            const li = e.target.closest("li");
            if (!li) return;
            this.button.textContent = li.textContent;
            this.ul.querySelector("li.mn-active")?.classList?.remove("mn-active");
            li.classList.add("mn-active");
            this.element.classList.remove("mn-active");
            this.element.dispatchEvent(new Event("change"));
          });
          return this;
        }
        setData(data) {
          this.ul.innerHTML = "";
          data.forEach((item) => {
            const li = document.createElement("li");
            li.setAttribute("role", "option");
            li.setAttribute("id", item?.id || item);
            li.textContent = item?.name || item;
            this.ul.append(li);
          });
          return this;
        }
        onChange(callback) {
          this.addEventListenerSafe(this.ul, "click", (e) => {
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
      };
    }
  });

  // src/components/MNButton.js
  var MNButton;
  var init_MNButton = __esm({
    "src/components/MNButton.js"() {
      init_BaseComponent();
      MNButton = class extends BaseComponent {
        constructor(title = "") {
          super(document.createElement("button"));
          this.element.setAttribute("class", "mn-button");
          this.element.textContent = title;
        }
        append() {
        }
        onClick(callback) {
          this.addEventListenerSafe(this.element, "click", (e) => {
            callback(e);
          });
          return this;
        }
      };
    }
  });

  // src/components/MNScreen.js
  var MNScreen;
  var init_MNScreen = __esm({
    "src/components/MNScreen.js"() {
      init_BaseComponent();
      MNScreen = class extends BaseComponent {
        constructor() {
          super(document.createElement("div"));
          this.element.classList.add("mn-screen");
        }
        show(direction = "right") {
          this.element.classList.remove("exit-to-left", "exit-to-right", "enter-from-left", "enter-from-right", "show");
          this.element.classList.add(direction === "right" ? "enter-from-right" : "enter-from-left");
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
      };
    }
  });

  // src/components/MNBadge.js
  var MNBadge;
  var init_MNBadge = __esm({
    "src/components/MNBadge.js"() {
      init_BaseComponent();
      MNBadge = class extends BaseComponent {
        constructor(content = "", type = "primary") {
          super(document.createElement("span"));
          this.element.setAttribute("class", `mn-badge mn-badge-${type}`);
          this.element.textContent = content;
        }
        setValue(val) {
          this.element.textContent = val;
          return this;
        }
        getValue() {
          return this.element.textContent;
        }
        append() {
        }
      };
    }
  });

  // src/components/MNDivider.js
  var MNDivider;
  var init_MNDivider = __esm({
    "src/components/MNDivider.js"() {
      init_BaseComponent();
      MNDivider = class extends BaseComponent {
        constructor() {
          super(document.createElement("hr"));
          this.element.setAttribute("class", "mn-divider");
        }
        append() {
        }
      };
    }
  });

  // src/components/MNAccordion.js
  var MNAccordion;
  var init_MNAccordion = __esm({
    "src/components/MNAccordion.js"() {
      init_BaseComponent();
      MNAccordion = class extends BaseComponent {
        constructor(title = "", isExpanded = false) {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-accordion" + (isExpanded ? " mn-expanded" : ""));
          this.header = document.createElement("div");
          this.header.setAttribute("class", "mn-accordion-header");
          this.titleSpan = document.createElement("span");
          this.titleSpan.textContent = title;
          this.chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          this.chevron.setAttribute("class", "mn-accordion-chevron");
          this.chevron.setAttribute("viewBox", "0 0 24 24");
          this.chevron.innerHTML = `<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>`;
          this.header.append(this.titleSpan);
          this.header.append(this.chevron);
          this.body = document.createElement("div");
          this.body.setAttribute("class", "mn-accordion-body");
          this.element.append(this.header);
          this.element.append(this.body);
          this.addEventListenerSafe(this.header, "click", () => {
            this.element.classList.toggle("mn-expanded");
          });
        }
        append(nodes) {
          if (Array.isArray(nodes)) {
            nodes.forEach((node) => this.body.append(node.element));
          } else {
            this.body.append(nodes.element);
          }
          return this;
        }
      };
    }
  });

  // src/components/MNColorPicker.js
  var MNColorPicker;
  var init_MNColorPicker = __esm({
    "src/components/MNColorPicker.js"() {
      init_BaseComponent();
      MNColorPicker = class extends BaseComponent {
        constructor(title = "", defaultColor = "#10b981") {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-color-picker");
          this.label = document.createElement("span");
          this.label.setAttribute("class", "mn-color-picker-label");
          this.label.textContent = title;
          const control = document.createElement("label");
          control.setAttribute("class", "mn-color-picker-control");
          this.dot = document.createElement("div");
          this.dot.setAttribute("class", "mn-color-picker-dot");
          this.dot.style.backgroundColor = defaultColor;
          this.valueSpan = document.createElement("span");
          this.valueSpan.setAttribute("class", "mn-color-picker-value");
          this.valueSpan.textContent = defaultColor;
          this.input = document.createElement("input");
          this.input.setAttribute("type", "color");
          this.input.setAttribute("class", "mn-color-picker-input");
          this.input.value = defaultColor;
          control.append(this.dot);
          control.append(this.valueSpan);
          control.append(this.input);
          this.element.append(this.label);
          this.element.append(control);
          this.addEventListenerSafe(this.input, "input", () => {
            const val = this.input.value;
            this.dot.style.backgroundColor = val;
            this.valueSpan.textContent = val;
          });
        }
        append() {
        }
        getValue() {
          return this.input.value;
        }
        setValue(color) {
          this.input.value = color;
          this.dot.style.backgroundColor = color;
          this.valueSpan.textContent = color;
          this.input.dispatchEvent(new Event("change", { bubbles: true }));
          return this;
        }
        setValueSilently(color) {
          this.input.value = color;
          this.dot.style.backgroundColor = color;
          this.valueSpan.textContent = color;
          return this;
        }
        onChange(callback) {
          this.addEventListenerSafe(this.input, "change", () => {
            callback(this.input.value);
          });
          return this;
        }
      };
    }
  });

  // src/components/MNToast.js
  var MNToast;
  var init_MNToast = __esm({
    "src/components/MNToast.js"() {
      init_BaseComponent();
      MNToast = class {
        static container = null;
        static ensureContainer() {
          if (!this.container) {
            this.container = document.createElement("div");
            this.container.setAttribute("id", "mn-toast-container");
            getShadowRoot().append(this.container);
          }
        }
        static show(message, type = "info", duration = 3e3) {
          this.ensureContainer();
          const toast = document.createElement("div");
          toast.setAttribute("class", `mn-toast mn-toast-${type}`);
          toast.textContent = message;
          this.container.append(toast);
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
      };
    }
  });

  // src/components/MNImage.js
  var MNImage;
  var init_MNImage = __esm({
    "src/components/MNImage.js"() {
      init_BaseComponent();
      MNImage = class extends BaseComponent {
        constructor(src = "", alt = "", objectFit = "cover") {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-image-container");
          this.img = document.createElement("img");
          this.img.setAttribute("class", "mn-image");
          this.img.setAttribute("alt", alt);
          this.img.style.objectFit = objectFit;
          this.skeleton = document.createElement("div");
          this.skeleton.setAttribute("class", "mn-skeleton");
          this.element.append(this.skeleton);
          this.img.onload = () => {
            this.skeleton.style.display = "none";
            this.img.classList.add("mn-loaded");
          };
          this.img.onerror = () => {
            this.skeleton.style.display = "none";
            this.element.classList.add("mn-image-error");
            this.element.innerHTML = `<span class="mn-error-text">Image failed to load</span>`;
          };
          if (src) {
            this.img.src = src;
            this.element.append(this.img);
          }
        }
        setSrc(src) {
          this.skeleton.style.display = "block";
          this.img.classList.remove("mn-loaded");
          this.element.classList.remove("mn-image-error");
          const errSpan = this.element.querySelector(".mn-error-text");
          if (errSpan) errSpan.remove();
          this.img.src = src;
          if (!this.element.contains(this.img)) {
            this.element.append(this.img);
          }
          return this;
        }
        setObjectFit(fit) {
          this.img.style.objectFit = fit;
          return this;
        }
        setHeight(h) {
          this.element.style.height = typeof h === "number" ? h + "px" : h;
          return this;
        }
        setWidth(w) {
          this.element.style.width = typeof w === "number" ? w + "px" : w;
          return this;
        }
        onClick(callback) {
          this.element.style.cursor = "pointer";
          this.addEventListenerSafe(this.element, "click", callback);
          return this;
        }
      };
    }
  });

  // src/components/MNTabs.js
  var MNTabs;
  var init_MNTabs = __esm({
    "src/components/MNTabs.js"() {
      init_BaseComponent();
      MNTabs = class extends BaseComponent {
        constructor(tabs = []) {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-tabs-container");
          this.header = document.createElement("div");
          this.header.setAttribute("class", "mn-tabs-header");
          this.content = document.createElement("div");
          this.content.setAttribute("class", "mn-tabs-content");
          this.element.append(this.header);
          this.element.append(this.content);
          this.tabs = [];
          this.activeTabId = null;
          tabs.forEach((t) => this.addTab(t.id, t.title, t.component));
        }
        addTab(id, title, component) {
          const tabBtn = document.createElement("button");
          tabBtn.setAttribute("class", "mn-tab-btn");
          tabBtn.textContent = title;
          const tabPane = document.createElement("div");
          tabPane.setAttribute("class", "mn-tab-pane");
          if (component) {
            if (Array.isArray(component)) {
              component.forEach((c) => tabPane.append(c.element || c));
            } else {
              tabPane.append(component.element || component);
            }
          }
          this.header.append(tabBtn);
          this.content.append(tabPane);
          const tabObj = { id, btn: tabBtn, pane: tabPane };
          this.tabs.push(tabObj);
          this.addEventListenerSafe(tabBtn, "click", () => this.setActiveTab(id));
          if (!this.activeTabId) {
            this.setActiveTab(id);
          }
          return this;
        }
        setActiveTab(id) {
          this.activeTabId = id;
          this.tabs.forEach((t) => {
            const isActive = t.id === id;
            t.btn.classList.toggle("mn-active", isActive);
            t.pane.classList.toggle("mn-active", isActive);
          });
          return this;
        }
      };
    }
  });

  // src/components/MNTextArea.js
  var MNTextArea;
  var init_MNTextArea = __esm({
    "src/components/MNTextArea.js"() {
      init_BaseComponent();
      MNTextArea = class extends BaseComponent {
        constructor(placeholder = "", rows = 3) {
          super(document.createElement("textarea"));
          this.element.setAttribute("placeholder", placeholder);
          this.element.setAttribute("class", "mn-textarea");
          this.element.setAttribute("rows", rows);
          this.addEventListenerSafe(this.element, "input", () => {
            this.element.style.height = "auto";
            this.element.style.height = this.element.scrollHeight + "px";
          });
        }
        getValue() {
          return this.element.value;
        }
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
          const StatePersistence2 = window.StatePersistence || globalThis.StatePersistence;
          if (StatePersistence2) {
            const saved = StatePersistence2.get(key);
            if (saved !== null) {
              this.setValue(saved);
            }
            this.onChange((val) => {
              StatePersistence2.set(key, val);
            });
          }
          return this;
        }
      };
    }
  });

  // src/components/MNProgressBar.js
  var MNProgressBar;
  var init_MNProgressBar = __esm({
    "src/components/MNProgressBar.js"() {
      init_BaseComponent();
      MNProgressBar = class extends BaseComponent {
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
      };
    }
  });

  // src/components/MNSpinner.js
  var MNSpinner;
  var init_MNSpinner = __esm({
    "src/components/MNSpinner.js"() {
      init_BaseComponent();
      MNSpinner = class extends BaseComponent {
        constructor(size = "24px", color = "var(--mn_primary)") {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-spinner");
          this.element.style.width = size;
          this.element.style.height = size;
          this.element.style.borderTopColor = color;
        }
      };
    }
  });

  // src/components/MNTooltip.js
  var MNTooltip;
  var init_MNTooltip = __esm({
    "src/components/MNTooltip.js"() {
      init_BaseComponent();
      MNTooltip = class extends BaseComponent {
        constructor(targetComponent, text, position = "top") {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-tooltip-wrapper");
          this.tooltipText = document.createElement("div");
          this.tooltipText.setAttribute("class", `mn-tooltip ${position}`);
          this.tooltipText.textContent = text;
          if (targetComponent && targetComponent.element) {
            this.element.append(targetComponent.element);
          } else if (targetComponent instanceof HTMLElement) {
            this.element.append(targetComponent);
          }
          this.element.append(this.tooltipText);
        }
      };
    }
  });

  // src/components/MNRadioGroup.js
  var MNRadioGroup;
  var init_MNRadioGroup = __esm({
    "src/components/MNRadioGroup.js"() {
      init_BaseComponent();
      MNRadioGroup = class extends BaseComponent {
        constructor(options = [], selectedValue = "") {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-radio-group");
          this.radios = [];
          options.forEach((opt) => {
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
          const checked = this.radios.find((r) => r.checked);
          return checked ? checked.value : null;
        }
        setValue(val) {
          const radio = this.radios.find((r) => r.value === val);
          if (radio) {
            radio.checked = true;
            this.element.dispatchEvent(new Event("change", { bubbles: true }));
          }
          return this;
        }
        setValueSilently(val) {
          const radio = this.radios.find((r) => r.value === val);
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
          const StatePersistence2 = window.StatePersistence || globalThis.StatePersistence;
          if (StatePersistence2) {
            const saved = StatePersistence2.get(key);
            if (saved !== null) {
              this.setValueSilently(saved);
            }
            this.onChange((val) => {
              StatePersistence2.set(key, val);
            });
          }
          return this;
        }
      };
    }
  });

  // src/components/MNTable.js
  var MNTable;
  var init_MNTable = __esm({
    "src/components/MNTable.js"() {
      init_BaseComponent();
      MNTable = class extends BaseComponent {
        constructor(columns = [], data = []) {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-table-wrapper");
          this.table = document.createElement("table");
          this.table.setAttribute("class", "mn-table");
          this.thead = document.createElement("thead");
          this.tbody = document.createElement("tbody");
          this.table.append(this.thead);
          this.table.append(this.tbody);
          this.element.append(this.table);
          this.columns = columns;
          this.renderHeader();
          this.setData(data);
        }
        renderHeader() {
          this.thead.innerHTML = "";
          const tr = document.createElement("tr");
          this.columns.forEach((col) => {
            const th = document.createElement("th");
            th.textContent = col.label;
            if (col.width) th.style.width = col.width;
            tr.append(th);
          });
          this.thead.append(tr);
        }
        setData(data) {
          this.tbody.innerHTML = "";
          data.forEach((row) => {
            const tr = document.createElement("tr");
            this.columns.forEach((col) => {
              const td = document.createElement("td");
              td.textContent = row[col.key] !== void 0 ? row[col.key] : "";
              tr.append(td);
            });
            this.tbody.append(tr);
          });
          return this;
        }
      };
    }
  });

  // src/components/MNDialog.js
  var MNDialog;
  var init_MNDialog = __esm({
    "src/components/MNDialog.js"() {
      init_BaseComponent();
      MNDialog = class {
        static show({ title = "X\xE1c nh\u1EADn", message = "", confirmText = "OK", cancelText = "H\u1EE7y", onConfirm = null, onCancel = null } = {}) {
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
      };
    }
  });

  // src/components/MNList.js
  var MNList;
  var init_MNList = __esm({
    "src/components/MNList.js"() {
      init_BaseComponent();
      MNList = class extends BaseComponent {
        constructor() {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-list");
        }
        addItem(item) {
          if (Array.isArray(item)) {
            item.forEach((i) => {
              if (i && i.element) {
                this.element.append(i.element);
              } else if (i instanceof HTMLElement) {
                this.element.append(i);
              }
            });
          } else {
            if (item && item.element) {
              this.element.append(item.element);
            } else if (item instanceof HTMLElement) {
              this.element.append(item);
            }
          }
          return this;
        }
        append(nodes) {
          return this.addItem(nodes);
        }
      };
    }
  });

  // src/components/MNListItem.js
  var MNListItem;
  var init_MNListItem = __esm({
    "src/components/MNListItem.js"() {
      init_BaseComponent();
      MNListItem = class extends BaseComponent {
        constructor(title = "", subtitle = "", leading = null, trailing = null) {
          super(document.createElement("div"));
          this.element.setAttribute("class", "mn-list-item");
          this.titleText = title;
          this.subtitleText = subtitle;
          if (leading) {
            this.leadingEl = document.createElement("div");
            this.leadingEl.setAttribute("class", "mn-list-item-leading");
            if (typeof leading === "string") {
              this.leadingEl.textContent = leading;
            } else if (leading.element) {
              this.leadingEl.append(leading.element);
            } else if (leading instanceof HTMLElement) {
              this.leadingEl.append(leading);
            }
            this.element.append(this.leadingEl);
          }
          this.contentEl = document.createElement("div");
          this.contentEl.setAttribute("class", "mn-list-item-content");
          this.titleEl = document.createElement("div");
          this.titleEl.setAttribute("class", "mn-list-item-title");
          this.titleEl.textContent = this.titleText;
          this.contentEl.append(this.titleEl);
          if (this.subtitleText) {
            this.subtitleEl = document.createElement("div");
            this.subtitleEl.setAttribute("class", "mn-list-item-subtitle");
            this.subtitleEl.textContent = this.subtitleText;
            this.contentEl.append(this.subtitleEl);
          }
          this.element.append(this.contentEl);
          if (trailing) {
            this.trailingEl = document.createElement("div");
            this.trailingEl.setAttribute("class", "mn-list-item-trailing");
            if (typeof trailing === "string") {
              this.trailingEl.textContent = trailing;
            } else if (trailing.element) {
              this.trailingEl.append(trailing.element);
            } else if (trailing instanceof HTMLElement) {
              this.trailingEl.append(trailing);
            }
            this.element.append(this.trailingEl);
          }
        }
        setTitle(title) {
          this.titleText = title;
          this.titleEl.textContent = title;
          return this;
        }
        setSubtitle(subtitle) {
          this.subtitleText = subtitle;
          if (!this.subtitleEl) {
            this.subtitleEl = document.createElement("div");
            this.subtitleEl.setAttribute("class", "mn-list-item-subtitle");
            this.contentEl.append(this.subtitleEl);
          }
          this.subtitleEl.textContent = subtitle;
          return this;
        }
        onClick(callback) {
          this.addEventListenerSafe(this.element, "click", (e) => {
            callback(e);
          });
          return this;
        }
      };
    }
  });

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    BaseComponent: () => BaseComponent,
    MNAccordion: () => MNAccordion,
    MNBadge: () => MNBadge,
    MNButton: () => MNButton,
    MNCheckbox: () => MNCheckbox,
    MNColorPicker: () => MNColorPicker,
    MNColumn: () => MNColumn,
    MNDialog: () => MNDialog,
    MNDivider: () => MNDivider,
    MNGUI: () => MNGUI,
    MNImage: () => MNImage,
    MNInput: () => MNInput,
    MNList: () => MNList,
    MNListItem: () => MNListItem,
    MNProgressBar: () => MNProgressBar,
    MNRadioGroup: () => MNRadioGroup,
    MNRow: () => MNRow,
    MNScreen: () => MNScreen,
    MNSelect: () => MNSelect,
    MNSlider: () => MNSlider,
    MNSpinner: () => MNSpinner,
    MNState: () => MNState,
    MNSwitch: () => MNSwitch,
    MNTable: () => MNTable,
    MNTabs: () => MNTabs,
    MNText: () => MNText,
    MNTextArea: () => MNTextArea,
    MNToast: () => MNToast,
    MNTooltip: () => MNTooltip,
    Popup: () => Popup,
    StackNavigator: () => StackNavigator,
    Theme: () => Theme,
    getShadowRoot: () => getShadowRoot,
    injectStyle: () => injectStyle
  });
  var init_index = __esm({
    "src/index.js"() {
      init_StackNavigator();
      init_MNGUI();
      init_Theme();
      init_Popup();
      init_BaseComponent();
      init_MNState();
      init_MNColumn();
      init_MNRow();
      init_MNText();
      init_MNSwitch();
      init_MNCheckbox();
      init_MNSlider();
      init_MNInput();
      init_MNSelect();
      init_MNButton();
      init_MNScreen();
      init_MNBadge();
      init_MNDivider();
      init_MNAccordion();
      init_MNColorPicker();
      init_MNToast();
      init_MNImage();
      init_MNTabs();
      init_MNTextArea();
      init_MNProgressBar();
      init_MNSpinner();
      init_MNTooltip();
      init_MNRadioGroup();
      init_MNTable();
      init_MNDialog();
      init_MNList();
      init_MNListItem();
    }
  });

  // src/global.js
  var require_global = __commonJS({
    "src/global.js"(exports) {
      init_index();
      var root = typeof self !== "undefined" ? self : exports;
      for (const key in index_exports) {
        if (Object.prototype.hasOwnProperty.call(index_exports, key)) {
          root[key] = index_exports[key];
        }
      }
    }
  });
  require_global();
})();
