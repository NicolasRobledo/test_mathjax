class SistemaEcuacion extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const format = (coef, variable) => {
      const n = Number(coef);
      if (n === 1) return `+ ${variable}`;
      if (n === -1) return `- ${variable}`;
      if (n < 0) return `${n}${variable}`;
      return `+ ${n}${variable}`;
    };

    const a = Number(this.getAttribute('a'));
    const b = Number(this.getAttribute('b'));
    const c = Number(this.getAttribute('c'));
    const d = Number(this.getAttribute('d'));
    const e = Number(this.getAttribute('e'));
    const f = Number(this.getAttribute('f'));

    const latex = `
\\begin{cases}
${a}x ${format(b, 'y')} = ${c} \\\\
${d}x ${format(e, 'y')} = ${f}
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
