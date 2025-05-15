import { productos } from './data.js';
import { renderProductos, capitalizeWords } from './cards.js';

const limpiarTexto = (texto) => {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const input = document.getElementById('input-busqueda');
const mensajeSinResultados = document.getElementById('mensaje-sin-resultados');
const btnClear = document.getElementById('btn-clear-search');
const scrollTopBtn = document.getElementById('btnScrollTop');

if (input) {
  input.addEventListener('input', () => {
    const valor = limpiarTexto(input.value.trim());
    let totalResultados = 0;

    btnClear.style.display = valor.length > 0 ? 'block' : 'none';

    for (const categoria in productos) {
      const contenedor = document.getElementById(`${categoria}-container`);
      const seccion = document.getElementById(categoria);

      if (!contenedor || !seccion) continue;

      contenedor.innerHTML = '';

      const resultados = productos[categoria].filter(prod => {
        const nombre = limpiarTexto(prod.nombre);
        const categoriaTexto = limpiarTexto(categoria);
        return nombre.includes(valor) || categoriaTexto.includes(valor);
      });

      if (valor && resultados.length > 0) {
        totalResultados += resultados.length;
        seccion.style.display = 'block';
        renderProductos(categoria, resultados);

        if (totalResultados === resultados.length) {
          seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

      } else if (valor) {
        seccion.style.display = 'none';

      } else {
        seccion.style.display = 'block';
        renderProductos(categoria);
      }
    }

    mensajeSinResultados.style.display = valor && totalResultados === 0 ? 'block' : 'none';
  });

  // ✅ Mueve aquí el botón limpiar y escape
  btnClear.addEventListener('click', () => {
    input.value = '';
    input.dispatchEvent(new Event('input'));
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      input.dispatchEvent(new Event('input'));
    }
  });
}

// Botón de scroll arriba
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ✅ Carga inicial de productos
for (const categoria in productos) {
  renderProductos(categoria);
}
