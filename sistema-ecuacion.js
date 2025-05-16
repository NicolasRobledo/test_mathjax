class SistemaEcuacion extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const a = this.getAttribute('a');
    const b = this.getAttribute('b');
    const c = this.getAttribute('c');
    const d = this.getAttribute('d');
    const e = this.getAttribute('e');
    const f = this.getAttribute('f');

    // Manejar coeficientes negativos con llaves en LaTeX
    const formatCoefficient = (coef) => {
      return coef.startsWith('-') ? `{${coef}}` : coef;
    };

    const latex = `
      \\begin{cases}
      ${formatCoefficient(a)}x + ${formatCoefficient(b)}y = ${formatCoefficient(c)} \\\\
      ${formatCoefficient(d)}x + ${formatCoefficient(e)}y = ${formatCoefficient(f)}
      \\end{cases}
    `;

    const container = document.createElement('div');
    container.innerHTML = `\\[${latex}\\]`;
    this.appendChild(container);

    const typeset = () => {
      if (window.MathJax) {
        MathJax.typesetPromise([container]).catch(err => console.log(err));
      } else {
        requestAnimationFrame(typeset);
      }
    };
    
    typeset();
  }
}

customElements.define('sistema-ecuacion', SistemaEcuacion);
