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
    if (!screen) return console.log("Screen not found");

    this.currentScreen.component.hide("left", () => {
      const screenIndex = this.stack.findIndex(screen => screen.name === name);
      if (screenIndex > -1) {
        for (let i = screenIndex + 1; i < this.stack.length; i++) {
          this.stack[i].component.destroy();
        }
        this.stack.splice(screenIndex + 1, 1);
        this.currentScreen.component.show("left");
      }
      else {
        this.stack.push(screen);
        this.currentScreen.component.show("right");
      }
    });
  }

  back() {
    if (this.stack.length <= 1) return console.log("No screen to back");
    this.currentScreen.component.hide("right", () => {
      this.currentScreen.component.destroy();
      this.stack.pop();
      this.currentScreen.component.show("left");
    });
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
    this.navigator.navigation(name);
    this.popup.child.innerHTML = "";
    this.popup.append(this.navigator.currentScreen.component);
  }

  back() {
    this.navigator.back();
    this.popup.child.innerHTML = "";
    this.popup.append(this.navigator.currentScreen.component);
  }

  render() {
    this.popup.onShow(() => this.navigator.currentScreen.component.show("left"));
    this.popup.onClose(() => this.navigator.currentScreen.component.hide("right"));
    this.popup.render();
  }
}

class Theme {
  constructor (
    primary = "#347a1f",
    primaryVariant = "#627a1f",
    secondary = "#c34040",
    secondaryVariant = "#c34082",
    background = "#E7EAEA",
    surface = "#FAFAFA",
    error = "#D50000",
    onPrimary = "#ffffff",
    onSecondary = "#ffffff",
    onBackground = "#000000",
    onSurface = "#000000",
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
      :root{
        --mn_primary: ${this.primary};
        --mn_primaryVariant: ${this.primaryVariant};
        --mn_secondary: ${this.secondary};
        --mn_secondaryVariant: ${this.secondaryVariant};
        --mn_background: ${this.background};
        --mn_surface: ${this.surface};
        --mn_error: ${this.error};
        --mn_onPrimary: ${this.onPrimary};
        --mn_onSecondary: ${this.onSecondary};
        --mn_onBackground: ${this.onBackground};
        --mn_onSurface: ${this.onSurface};
        --mn_onError: ${this.onError};
      }

      div.mn-column {
        display: flex;
        flex-direction: column;
        background: var(--mn_surface);
        gap: 10px;
      }

      div.mn-row {
        display: flex;
        flex-direction: row;
        background: var(--mn_surface);
        gap: 10px;
      }

      .mn-padding {
        padding: 10px;
      }

      .mn-normal-text {
        font-size: 14px;
      }

      .mn-toggle {
        cursor: pointer;
        display: inline-block;
      }
      .mn-toggle-switch {
        display: inline-block;
        background: var(--mn_background);
        border-radius: 16px;
        width: 58px;
        height: 32px;
        position: relative;
        vertical-align: middle;
        transition: background 0.25s;
      }
      .mn-toggle-switch:before, .mn-toggle-switch:after {
        content: "";
      }
      .mn-toggle-switch:before {
        display: block;
        background: linear-gradient(to bottom, var(--mn_surface) 0%, var(--mn_background) 100%);
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        width: 24px;
        height: 24px;
        position: absolute;
        top: 4px;
        left: 4px;
        transition: left 0.25s;
      }
      .mn-toggle:hover .mn-toggle-switch:before {
        background: linear-gradient(to bottom, var(--mn_surface) 0%, var(--mn_background) 100%);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
      }
      .mn-toggle-checkbox:checked + .mn-toggle-switch {
        background: var(--mn_primary);
      }
      .mn-toggle-checkbox:checked + .mn-toggle-switch:before {
        left: 30px;
      }
      .mn-toggle-checkbox {
        position: absolute;
        visibility: hidden;
      }
      .mn-toggle-label {
        margin-left: 5px;
        position: relative;
        top: 2px;
      }

      .mn-input {
        border: 2px solid var(--mn_background);
        height: 2.5em;
        padding-left: 0.8em;
        outline: none;
        overflow: hidden;
        background-color: var(--mn_surface);
        border-radius: 10px;
        transition: all 0.5s;
      }
      .mn-input:hover,
      .mn-input:focus {
        border: 2px solid var(--mn_primary);
        background-color: var(--mn_surface);
      }

      .mn-select {
        display: block;
        margin: 10px 0 8px 0;
        padding-bottom: 2px;
      }
      .mn-select [type=button] {
        background: var(--mn_surface);
        border-color: var(--mn_primary); 
        border-width: 0 0 1px 0;
        color: var(--mn_onSurface);
        cursor: default;
        display: block;
        line-height: 48px;
        padding: 2px 0 1px 16px;
        position: relative;
        text-align: left;
        text-shadow: none;
        z-index: 1;
        outline: none;
        overflow: hidden;
      }
      .mn-select [type=button]:focus, .mn-select [type=button]:hover {
        background: var(--mn_background);
      }
      .mn-select [type=button]:after {
        content: '\u25be';
        float: right;
        padding-right: 16px;
      }
      .mn-select ul[role=listbox] {
        background-color: var(--mn_surface);
        color: var(--mn_onSurface);
        cursor: default;
        list-style: none;
        line-height: 26px;
        overflow: hidden;
        margin: 0;
        max-height: 0;
        position: absolute;
        padding: 0;
        transition: all 0.15s cubic-bezier(0.35, 0, 0.25, 1);
        box-shadow: 0 1px 3px var(--primary), 0 1px 2px var(--primary) !important;
      }
      .mn-select ul[role=listbox] li {
        height: 48px;
        margin: 0;
        padding: 10px 16px;
        outline: none;
        overflow: hidden;
      }
      .mn-select ul[role=listbox] li:focus, .mn-select ul[role=listbox] li:hover, .mn-select ul[role=listbox] li.mn-active {
        background: var(--mn_background);
        color: var(--mn_onBackground)
      }
      .mn-select.mn-active ul[role=listbox] {
        max-height: 200px;
        overflow: auto;
        z-index: 2;
        transition: all .2s ease;
        scrollbar-width: thin;
      }

      .mn-button {
        padding: 10px 15px;
        border: 2px solid var(--mn_primary);
        background-color: var(--mn_surface);
        color: var(--mn_onSurface);
        font-size: 16px;
        cursor: pointer;
        border-radius: 30px;
        transition: all 0.4s ease;
        outline: none;
        position: relative;
        overflow: hidden;
        font-weight: bold;
      }
      .mn-button::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.25) 0%,
          rgba(255, 255, 255, 0) 70%
        );
        transform: scale(0);
        transition: transform 0.5s ease;
      }
      .mn-button:hover::after {
        transform: scale(4);
      }
      .mn-button:hover {
        border-color: var(--mn_primary);
        background: var(--mn_primary);
        color: var(--mn_onPrimary);
      }

      .mn-screen {
        position: absolute;
        padding: 10px;
        inset: 0;
        width: 100%;
        height: 100%;
        background: var(--mn_surface);
        opacity: 0;
        transform: translateX(0);
        pointer-events: none;
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
      .mn-screen.show {
        opacity: 1;
        pointer-events: auto;
        z-index: 2;
      }
      .mn-screen.enter-from-right {
        transform: translateX(100px);
      }
      .mn-screen.enter-from-left {
        transform: translateX(-100px);
      }
      .mn-screen.exit-to-right {
        transform: translateX(100px);
        opacity: 0;
      }
      .mn-screen.exit-to-left {
        transform: translateX(-100px);
        opacity: 0;
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
      width: "92.5vw",
      height: "calc(92.5vh - 50px)",
      bottom: "calc(5vh + 50px)",
      top: "",
      left: "",
      right: "5vw",
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
      console.warn("This device is support touch event, so toggle will not be hidden");
    } else {
      this.visibleToggle = false;
      this.popupProps = {
        width: "95vw",
        height: "95vh",
        bottom: "2.5vh",
        top: "",
        left: "",
        right: "2.5vw",
      };
    }
  }

  render() {
    const style = `
        <style>
            #mngui-popup {
                position: fixed;
                bottom: ${this.popupProps.bottom};
                right: ${this.popupProps.right};
                left: ${this.popupProps.left};
                top: ${this.popupProps.top};
                width: ${this.popupProps.width};
                height: ${this.popupProps.height};
                background: ${this.theme.surface};
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,.2);
                flex-direction: column;
                overflow: hidden;
                font-family: sans-serif;
                z-index: 999999;

                /* Animation base */
                transform: translateY(40px);
                opacity: 0;
                pointer-events: none;
                transition: all 0.35s cubic-bezier(.25,.8,.25,1);
            }

            #mngui-popup.show {
                transform: translateY(0);
                opacity: 1;
                pointer-events: auto;
            }

            #mngui-toggle {
                position: fixed;
                bottom: ${this.toggleProps.bottom};
                right: ${this.toggleProps.right};
                left: ${this.toggleProps.left};
                top: ${this.toggleProps.top};
                width: ${this.toggleProps.width};
                height: ${this.toggleProps.height};
                border-radius: 50%;
                background: ${this.theme.primary};
                color: ${this.theme.onPrimary};
                border: none;
                cursor: pointer;
                font-size: ${this.toggleProps.fontSize};
                box-shadow: 0 4px 10px rgba(0,0,0,.2);
                z-index: 999999;
                transition: 0.25s ease;
                opacity: 1;
            }

            #mngui-toggle.hide {
                opacity: 0;
                pointer-events: none;
            }

            #mngui-toggle:hover { 
                transform: scale(1.1);
            }
        </style>
        `;

    document.head.insertAdjacentHTML("beforeend", style);

    this.child.setAttribute("id", "mngui-popup");
    document.body.append(this.child);

    const togglePopup = () => {
      this.isOpen = !this.isOpen;
      this.child.classList.toggle("show", this.isOpen);
      if (this.isOpen) this.onShowCallback?.();
      else this.onCloseCallback?.();
    };

    if (this.visibleToggle) {
      const toggleBtn = document.createElement("button");
      toggleBtn.setAttribute("id", "mngui-toggle");
      toggleBtn.append(this.icon);

      document.body.append(toggleBtn);

      toggleBtn.addEventListener("click", togglePopup);
    }

    window.addEventListener("keydown", (e) => {
      // Tách các phím trong shortcut thành mảng và chuẩn hóa
      const keys = this.shortcut.split('+').map(key => key.trim().toLowerCase());
      const lastKey = keys[keys.length - 1];

      // Kiểm tra các phím modifier
      const hasShift = keys.includes('shift');
      const hasCtrl = keys.includes('ctrl');
      const hasAlt = keys.includes('alt');

      // Kiểm tra phím cuối cùng (phím chính)
      const isKeyMatch = e.key.toLowerCase() === lastKey;

      // Kiểm tra tổ hợp phím
      const isShiftMatch = hasShift === e.shiftKey;
      const isCtrlMatch = hasCtrl === e.ctrlKey;
      const isAltMatch = hasAlt === e.altKey;

      // Nếu tất cả các điều kiện đều đúng
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
  constructor (content) {
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

    const label = document.createElement("span");
    label.setAttribute("class", "mn-toggle-label");
    label.textContent = title;

    this.element.append(this.input);
    this.element.append(this.sw);
    this.element.append(label);
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
    clonedInstance.input = this.input.cloneNode(true);
    clonedInstance.sw = this.sw.cloneNode(true);
    clonedInstance.label = this.label.cloneNode(true);
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

  onSummit(callback) {
    this.element.addEventListener("change", () => {
      this.element.blur();
      callback(this.element.value);
    });

    return this;
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
    label.append(this.button);

    this.ul = document.createElement("ul");
    this.ul.setAttribute("role", "listbox");

    this.element.append(label);
    this.element.append(this.ul);
  }

  append() { }

  setup() {
    this.element.addEventListener("click", () => {
      this.element.classList.toggle("mn-active");
    });

    this.ul.addEventListener("click", (e) => {
      this.button.textContent = e.target.textContent;
      this.ul.querySelector("li.mn-active")?.classList?.remove("mn-active");
      if (e.target.tagName === "LI") {
        e.target.classList.add("mn-active");
      }
    });

    return this;
  }

  setData(data) {
    data.forEach(item => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("id", item?.id);
      li.textContent = item?.name;
      this.ul.append(li);
    });

    return this;
  }

  onChange(callback) {
    this.ul.addEventListener("click", (e) => {
      callback(e.target.id, e.target.textContent);
    });

    return this;
  }

  clone() {
    const clonedInstance = super.clone();
    clonedInstance.button = this.button.cloneNode(true);
    clonedInstance.ul = this.ul.cloneNode(true);
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
    };
    callback();
    this.element.addEventListener("transitionend", onEnd, { once: true });
  }
}