import * as MNGUI_Lib from './index.js';

const root = typeof self !== 'undefined' ? self : this;
for (const key in MNGUI_Lib) {
  if (Object.prototype.hasOwnProperty.call(MNGUI_Lib, key)) {
    root[key] = MNGUI_Lib[key];
  }
}
