class SistemaEcuacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Leemos los atributos que pasan los coeficientes
    const a = this.getAttribute('a') || 'a';
    const b = this.getAttribute('b') || 'b';
    const c = this.getAttribute('c') || 'c';
    const d = this.getAttribute('d') || 'd';
    const e = this.getAttribute('e') || 'e';
    const f = this.getAttribute('f') || 'f';

    // Plantilla LaTeX con placeholders para los coeficientes
    const latex = `
      \\begin{cases}
      ${a}x + ${b}y = ${c} \\\\
      ${d}x + ${e}y = ${f}
      \\end{cases}
    `;

    const container = document.createElement('div');
    container.innerHTML = `\\[${latex}\\]`;
    this.shadowRoot.appendChild(container);

    if (window.MathJax) {
      MathJax.typesetPromise([container]);
    }
  }
}

customElements.define('sistema-ecuacion', SistemaEcuacion);
