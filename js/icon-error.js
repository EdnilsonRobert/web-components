class IconError extends HTMLElement {
  constructor() {
    super();

    let color = this.getAttribute('color');

    this.innerHTML = `<svg height="128" width="128" style="border:1px solid ${color};"><circle cx="50%" cy="50%" r="60" fill="crimson" /></svg>`;
  }
}

customElements.define('icon-error', IconError);
