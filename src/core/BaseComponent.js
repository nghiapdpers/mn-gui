import { StatePersistence } from './StatePersistence.js';

let mnguiShadowRoot = null;

export function getShadowRoot() {
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

export function injectStyle(id, css) {
  const shadow = getShadowRoot();
  if (!shadow.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = css;
    shadow.append(style);
  }
}

export class BaseComponent {
  constructor (element) {
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
    this._listeners = this._listeners.filter(l => 
      !(l.target === target && l.type === type && l.listener === listener)
    );
    return this;
  }

  on(type, listener, options) {
    return this.addEventListenerSafe(this.element, type, listener, options);
  }

  bind(state) {
    if (!state || typeof state.subscribe !== "function") return this;
    
    // One-way: State -> Component
    this.unsubscribeState = state.subscribe(val => {
      if (typeof this.setValueSilently === "function") {
        this.setValueSilently(val);
      } else if (typeof this.setValue === "function") {
        this.setValue(val);
      }
    });

    // Two-way: Component -> State
    const updateState = () => {
      if (typeof this.getValue === "function") {
        const val = this.getValue();
        if (val !== null && val !== undefined) {
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
    if (val !== null && val !== undefined) {
      this.setValueSilently(val);
    }
    // Bubbled events to auto-save to storage on value change using safe listener
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
    if (this.persistKey && val !== null && val !== undefined) {
      StatePersistence.set(this.persistKey, val);
    }
  }
}
