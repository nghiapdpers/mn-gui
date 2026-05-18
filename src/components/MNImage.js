import { BaseComponent } from '../core/BaseComponent.js';

export class MNImage extends BaseComponent {
  constructor(src = "", alt = "", objectFit = "cover") {
    super(document.createElement("div"));
    this.element.setAttribute("class", "mn-image-container");
    
    this.img = document.createElement("img");
    this.img.setAttribute("class", "mn-image");
    this.img.setAttribute("alt", alt);
    this.img.style.objectFit = objectFit;
    
    this.skeleton = document.createElement("div");
    this.skeleton.setAttribute("class", "mn-skeleton");
    
    this.element.append(this.skeleton);
    
    this.img.onload = () => {
      this.skeleton.style.display = "none";
      this.img.classList.add("mn-loaded");
    };
    
    this.img.onerror = () => {
      this.skeleton.style.display = "none";
      this.element.classList.add("mn-image-error");
      this.element.innerHTML = `<span class="mn-error-text">Image failed to load</span>`;
    };

    if (src) {
      this.img.src = src;
      this.element.append(this.img);
    }
  }
  
  setSrc(src) {
    this.skeleton.style.display = "block";
    this.img.classList.remove("mn-loaded");
    this.element.classList.remove("mn-image-error");
    const errSpan = this.element.querySelector('.mn-error-text');
    if (errSpan) errSpan.remove();

    this.img.src = src;
    if (!this.element.contains(this.img)) {
        this.element.append(this.img);
    }
    return this;
  }
  
  setObjectFit(fit) {
    this.img.style.objectFit = fit;
    return this;
  }

  setHeight(h) {
    this.element.style.height = typeof h === "number" ? h + "px" : h;
    return this;
  }

  setWidth(w) {
    this.element.style.width = typeof w === "number" ? w + "px" : w;
    return this;
  }

  onClick(callback) {
    this.element.style.cursor = "pointer";
    this.addEventListenerSafe(this.element, "click", callback);
    return this;
  }
}
