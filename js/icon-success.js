class IconSuccess extends HTMLElement {
  constructor() {
    super();

    let color = this.getAttribute('color');

    this.innerHTML = `<svg width="128" height="128" style="border:1px solid ${color};"><rect x="4" y="4" width="120" height="120" fill="olivedrab" /></svg>`;
  }
}

customElements.define('icon-success', IconSuccess);
