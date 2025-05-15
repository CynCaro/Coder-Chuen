import { productos } from './data.js';

export function capitalizeWords(str) {
    const lowerWords = ['de', 'y', 'del', 'la', 'el', 'los', 'las', 'con', 'sin', ]; // Palabras que deben permanecer en minúscula
    return str
        .toLowerCase()
        .split(' ')
        .map((word, index) =>
            lowerWords.includes(word) && index !== 0 // Si la palabra está en la lista y no es la primera
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ');
}

// Función para renderizar productos en las cards
export function renderProductos(categoria, listaFiltrada = null) {
    const container = document.getElementById(`${categoria}-container`);
    if (!container) {
      console.error(`Contenedor para la categoría "${categoria}" no encontrado`);
      return;
    }

    // Limpiar contenedor antes de agregar contenido
    container.innerHTML = "";

    const productosAMostrar = listaFiltrada || productos[categoria];

    // Iterar sobre los productos de la categoría
    productosAMostrar.forEach((producto) => {
        container.innerHTML += `
          <div class="card">
            <img src="../img/${producto.imagen}" alt="${producto.nombre}" class="card-img">
            <div class="card-info">
              <h3>${capitalizeWords(producto.nombre)}</h3>
              <p><strong>Alérgenos:</strong> ${producto.alergenos_comunes}</p>
              <p><strong>Otros ingredientes:</strong> ${producto.otros_ingredientes}</p>
            </div>
          </div>
        `;
      });   
}

// Llamar a la función para cada categoría
["pasteles", "galletas", "tartas", "especiales", "cupcakes", "panques"].forEach(categoria => {
    renderProductos(categoria);
  });  
