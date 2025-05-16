def format_term(coef, variable):
    n = float(coef)
    if n == 1:
        return f"+ {variable}"
    elif n == -1:
        return f"- {variable}"
    elif n < 0:
        return f"{n}{variable}"
    else:
        return f"+ {n}{variable}"

def generar_latex(a, b, c, d, e, f):
    a, b, c, d, e, f = map(float, [a, b, c, d, e, f])
    
    eq1 = f"{a}x {format_term(b, 'y')} = {c}"
    eq2 = f"{d}x {format_term(e, 'y')} = {f}"

    latex = f"""
\\begin{{cases}}
{eq1} \\\\
{eq2}
\\end{{cases}}
"""
    return latex

