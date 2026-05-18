import { BaseComponent } from '../core/BaseComponent.js';

export class MNTabs extends BaseComponent {
  constructor(tabs = []) {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-tabs-container");
    
    this.header = document.createElement("div");
    this.header.setAttribute("class", "mn-tabs-header");
    
    this.content = document.createElement("div");
    this.content.setAttribute("class", "mn-tabs-content");
    
    this.element.append(this.header);
    this.element.append(this.content);
    
    this.tabs = [];
    this.activeTabId = null;
    
    tabs.forEach(t => this.addTab(t.id, t.title, t.component));
  }
  
  addTab(id, title, component) {
    const tabBtn = document.createElement("button");
    tabBtn.setAttribute("class", "mn-tab-btn");
    tabBtn.textContent = title;
    
    const tabPane = document.createElement("div");
    tabPane.setAttribute("class", "mn-tab-pane");
    if (component) {
      if (Array.isArray(component)) {
        component.forEach(c => tabPane.append(c.element || c));
      } else {
        tabPane.append(component.element || component);
      }
    }
    
    this.header.append(tabBtn);
    this.content.append(tabPane);
    
    const tabObj = { id, btn: tabBtn, pane: tabPane };
    this.tabs.push(tabObj);
    
    this.addEventListenerSafe(tabBtn, "click", () => this.setActiveTab(id));
    
    if (!this.activeTabId) {
      this.setActiveTab(id);
    }
    return this;
  }
  
  setActiveTab(id) {
    this.activeTabId = id;
    this.tabs.forEach(t => {
      const isActive = t.id === id;
      t.btn.classList.toggle("mn-active", isActive);
      t.pane.classList.toggle("mn-active", isActive);
    });
    return this;
  }
}
