import { StackNavigator } from './core/StackNavigator.js';
import { MNGUI } from './core/MNGUI.js';
import { Theme } from './core/Theme.js';
import { Popup } from './core/Popup.js';
import { BaseComponent, getShadowRoot } from './core/BaseComponent.js';
import { MNState } from './core/MNState.js';

const core = {
  StackNavigator,
  MNGUI,
  Theme,
  Popup,
  BaseComponent,
  getShadowRoot,
  MNState
};

const root = typeof self !== 'undefined' ? self : this;
for (const key in core) {
  if (Object.prototype.hasOwnProperty.call(core, key)) {
    root[key] = core[key];
  }
}
