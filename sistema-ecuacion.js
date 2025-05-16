class SistemaEcuacion extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const format = (coef) => {
      const n = coef.trim();
      return n.startsWith('-') ? n : `+ ${n}`;
    };

    const latex = `
\\begin{cases}
${this.getAttribute('a')}x ${format(this.getAttribute('b'))}y = ${this.getAttribute('c')} \\\\
${this.getAttribute('d')}x ${format(this.getAttribute('e'))}y = ${this.getAttribute('f')}
\\end{cases}
`;

    const div = document.createElement('div');
    div.innerHTML = `\\[${latex}\\]`;
    this.appendChild(div);

    const checkMathJax = () => {
      if (window.MathJax?.typesetPromise) {
        MathJax.typesetPromise([div]).catch(err => console.error("Error al renderizar:", err));
      } else {
        setTimeout(checkMathJax, 100);
      }
    };

    checkMathJax();
  }
}

customElements.define('sistema-ecuacion', SistemaEcuacion);
