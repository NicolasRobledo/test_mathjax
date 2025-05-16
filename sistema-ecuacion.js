class SistemaEcuacion extends HTMLElement {
  connectedCallback() {
    const a = this.getAttribute('a') || 'a';
    const b = this.getAttribute('b') || 'b';
    const c = this.getAttribute('c') || 'c';
    const d = this.getAttribute('d') || 'd';
    const e = this.getAttribute('e') || 'e';
    const f = this.getAttribute('f') || 'f';

    const latex = `
      \\begin{cases}
      ${a}x + ${b}y = ${c}
      ${d}x + ${e}y = ${f}
      \\end{cases}
    `;

    this.innerHTML = `\\[${latex}\\]`;

    if (window.MathJax) {
      MathJax.typesetPromise([this]);
    }
  }
}

customElements.define('sistema-ecuacion', SistemaEcuacion);
