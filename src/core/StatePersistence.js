export class StatePersistence {
  static get(key) {
    let rawVal = null;
    try {
      if (typeof GM_getValue !== "undefined") {
        rawVal = GM_getValue(key);
      }
    } catch (e) {}
    if (rawVal === null || rawVal === undefined) {
      try {
        rawVal = localStorage.getItem(key);
      } catch (e) {}
    }
    if (rawVal === null || rawVal === undefined) return null;
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
    } catch (e) {}
    try {
      localStorage.setItem(key, serialized);
    } catch (e) {}
  }
}
