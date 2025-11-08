// ==UserScript==
// @name         mnGUI
// @namespace    http://tampermonkey.net/
// @version      beta-0.1
// @description  madnad custom GUI
// @author       madnad
// @match        https://*.jsonformatter.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jsonformatter.org/
// @grant        none
// ==/UserScript==

class MNGUI {
  constructor () {
    this.theme = new Theme();
    this.popup = new Popup(this.theme);
  }

  append(child) {
    this.popup.append(child);
  }

  render() {
    this.popup.render();
  }
}

class Theme {
  constructor (
    primary = "#347a1f",
    primaryVariant = "#627a1f",
    secondary = "#c34040",
    secondaryVariant = "#c34082",
    background = "#9E9E9E",
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
      div.mn-column {
        display: flex;
        flex-direction: column;
        background: ${this.surface};
        gap: 10px;
      }

      div.mn-row {
        display: flex;
        flex-direction: row;
        background: ${this.surface};
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
        background: ${this.background};
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
        background: linear-gradient(to bottom, ${this.surface} 0%, ${this.background} 100%);
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
        background: linear-gradient(to bottom, ${this.surface} 0%, ${this.background} 100%);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
      }
      .mn-toggle-checkbox:checked + .mn-toggle-switch {
        background: ${this.primary};
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
        border: 2px solid transparent;
        width: 15em;
        height: 2.5em;
        padding-left: 0.8em;
        outline: none;
        overflow: hidden;
        background-color: ${this.surface};
        border-radius: 10px;
        transition: all 0.5s;
      }

      .mn-input:hover,
      .mn-input:focus {
        border: 2px solid ${this.primary};
        box-shadow: 0px 0px 0px 7px rgb(${this.primary}, 20%);
        background-color: white;
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
      width: "300px",
      height: "380px",
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

    this.icon = "🎲";

    this.child = document.createElement("div");
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
    this.child.append(child.element);
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
                padding: 10px;

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
    const toggleBtn = document.createElement("button");
    toggleBtn.setAttribute("id", "mngui-toggle");
    toggleBtn.append(this.icon);

    document.body.append(this.child);
    document.body.append(toggleBtn);

    toggleBtn.addEventListener("click", () => {
      this.isOpen = !this.isOpen;
      this.child.classList.toggle("show", this.isOpen);
    });
  }
}

class BaseComponent {
  append(nodes) {
    if (Array.isArray(nodes)) {
      nodes.forEach(node => this.element.append(node.element));
    } else {
      this.element.append(nodes.element);
    }
  }

  style(css) {
    this.element.setAttribute("style", css);
  }
}

class MNColumn extends BaseComponent {
  constructor () {
    super();
    this.element = document.createElement("div");
    this.element.setAttribute("class", "mn-column mn-padding");
  }
}

class MNRow extends BaseComponent {
  constructor () {
    super();
    this.element = document.createElement("div");
    this.element.setAttribute("class", "mn-row mn-padding");
  }
}

class MNText extends BaseComponent {
  constructor (content) {
    super();
    this.element = document.createElement("span");
    this.element.setAttribute("class", "mn-normal-text");
    this.element.textContent = content;
  }

  append() { }
}

class MNSwitch extends BaseComponent {
  constructor (title = "") {
    super();
    this.element = document.createElement("label");
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
  }
}

class MNInput extends BaseComponent {
  constructor (placeholder = "") {
    super();
    this.element = document.createElement("input");
    this.element.setAttribute("placeholder", placeholder);
    this.element.setAttribute("class", "mn-input");
  }

  append() { }

  onChange(callback) {
    this.element.addEventListener("input", () => {
      callback(this.element.value);
    });
  }

  onSummit(callback) {
    this.element.addEventListener("change", () => {
      this.element.blur();
      callback(this.element.value);
    });
  }

  onFocus(callback) {
    this.element.addEventListener("focus", () => {
      callback(this.element.value);
    });
  }
}

// test
const GUI = new MNGUI();

const sw = new MNSwitch("KKKK");
sw.onChange((checked) => {
  console.log("Switch change", checked);
});

const input = new MNInput("Enter name");
input.onChange((value) => {
  console.log("Input change", value);
});
input.onSummit((value) => {
  console.log("Input summit", value);
});

const row = new MNRow();

row.append([sw, input]);

GUI.append(row);

GUI.render();
