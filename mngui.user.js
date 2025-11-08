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
      div.column {
        display: flex;
        flex-direction: column;
        background: ${this.surface};
        gap: 10px;
      }

      div.row {
        display: flex;
        flex-direction: row;
        background: ${this.surface};
        gap: 10px;
      }

      .padding {
        padding: 10px;
      }

      .normal-text {
        font-size: 14px;
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
    this.child.append(child);
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
      nodes.forEach(node => this.element.append(node));
    } else {
      this.element.append(nodes);
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
    this.element.setAttribute("class", "column padding");
  }
}

class MNRow extends BaseComponent {
  constructor () {
    super();
    this.element = document.createElement("div");
    this.element.setAttribute("class", "row padding");
  }
}

class MNText extends BaseComponent {
  constructor (content) {
    super();
    this.element = document.createElement("span");
    this.element.setAttribute("class", "normal-text");
    this.element.textContent = content;
  }

  append() { }
}

class MNSwitch extends BaseComponent {
  constructor () {
    super();
  }
}

// test
const GUI = new MNGUI();
GUI.render();
