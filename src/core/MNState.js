export class MNState {
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
      this.listeners.forEach(fn => fn(newVal));
    }
  }

  subscribe(fn) {
    this.listeners.push(fn);
    fn(this._value);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }
}
