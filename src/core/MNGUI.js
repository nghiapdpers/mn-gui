import { Theme } from './Theme.js';
import { Popup } from './Popup.js';

export class MNGUI {
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
