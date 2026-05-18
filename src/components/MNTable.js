import { BaseComponent } from '../core/BaseComponent.js';

export class MNTable extends BaseComponent {
  constructor(columns = [], data = []) {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-table-wrapper");
    
    this.table = document.createElement("table");
    this.table.setAttribute("class", "mn-table");
    
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");
    
    this.table.append(this.thead);
    this.table.append(this.tbody);
    this.element.append(this.table);
    
    this.columns = columns;
    this.renderHeader();
    this.setData(data);
  }
  
  renderHeader() {
    this.thead.innerHTML = "";
    const tr = document.createElement("tr");
    this.columns.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col.label;
      if (col.width) th.style.width = col.width;
      tr.append(th);
    });
    this.thead.append(tr);
  }
  
  setData(data) {
    this.tbody.innerHTML = "";
    data.forEach(row => {
      const tr = document.createElement("tr");
      this.columns.forEach(col => {
        const td = document.createElement("td");
        td.textContent = row[col.key] !== undefined ? row[col.key] : "";
        tr.append(td);
      });
      this.tbody.append(tr);
    });
    return this;
  }
}
