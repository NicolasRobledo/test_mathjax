class SistemaEcuacion extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const format = (coef) => coef.startsWith('-') ? `{${coef}}` : coef; // Manejar negativos

    const latex = `
      \\begin{cases}
      ${format(this.getAttribute('a'))}x + ${format(this.getAttribute('b'))}y = ${format(this.getAttribute('c'))} \\\\
      ${format(this.getAttribute('d'))}x + ${format(this.getAttribute('e'))}y = ${format(this.getAttribute('f'))}
      \\end{cases}
    `;

    const div = document.createElement('div');
    div.innerHTML = `\\[${latex}\\]`;
    this.appendChild(div);

    // Esperar a que MathJax esté listo
    const checkMathJax = () => {
      if (window.MathJax?.typesetPromise) {
        MathJax.typesetPromise([div]).catch(err => console.error("Error al renderizar:", err));
      } else {
        setTimeout(checkMathJax, 100); // Reintentar cada 100ms
      }
    };

    checkMathJax();
  }
}

customElements.define('sistema-ecuacion', SistemaEcuacion);
