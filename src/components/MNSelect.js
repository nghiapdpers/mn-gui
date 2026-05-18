import { BaseComponent } from '../core/BaseComponent.js';

export class MNSelect extends BaseComponent {
  constructor (placeholder = "") {
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

  append() { }

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
      
      // Dispatch change event to bubble up for persistence
      this.element.dispatchEvent(new Event("change"));
    });

    return this;
  }

  setData(data) {
    this.ul.innerHTML = "";
    data.forEach(item => {
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
}
