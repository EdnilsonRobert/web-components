class CustomIcon extends HTMLElement {
  constructor() {
    super();

    let type = this.getAttribute('type');
    let types = ['success', 'error', 'warning'];

    // console.log(types.includes(type));

    if (type == 'success') {
      this.innerHTML = `<svg width="128" height="128"><rect x="4" y="4" width="120" height="120" fill="olivedrab" /></svg>`;
    }
    if (type == 'error') {
      this.innerHTML = `<svg height="128" width="128"><circle cx="50%" cy="50%" r="60" fill="crimson" /></svg>`;
    }
    if (type == 'warning') {
      this.innerHTML = `<svg height="128" width="128"><polygon points="64,4 124,124 4,124" fill="gold" /></svg>`;
    }
    if (!type) {
      this.innerHTML = `<p>O tipo escolhido para o ícone é inválido.</p>`;
    }
  }
}

customElements.define('custom-icon', CustomIcon);
