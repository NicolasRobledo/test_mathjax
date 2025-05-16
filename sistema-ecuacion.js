
class SistemaEcuacion extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const a = this.getAttribute('a');
    const b = this.getAttribute('b');
    const c = this.getAttribute('c');
    const d = this.getAttribute('d');
    const e = this.getAttribute('e');
    const f = this.getAttribute('f');
/*
    if (!window.pyodide) {
      window.pyodide = await loadPyodide();
      await cargarPython(window.pyodide);
    }
*/
    // Ejecutar la función de ecuaciones que definiste en ecuaciones.py
    const code = `generar_latex(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
    const latex = await window.pyodide.runPythonAsync(code);

    const div = document.createElement('div');
    div.innerHTML = `\\[${latex}\\]`;
    this.appendChild(div);

    if (window.MathJax?.typesetPromise) {
      MathJax.typesetPromise([div]).catch(err => console.error("Error al renderizar:", err));
    }
  }
}

// Función para cargar el archivo Python externo
async function cargarPython(pyodide) {
  const response = await fetch('/py/ecuaciones.py');
  const pyCode = await response.text();
  await pyodide.runPythonAsync(pyCode);
}

customElements.define('sistema-ecuacion', SistemaEcuacion);

