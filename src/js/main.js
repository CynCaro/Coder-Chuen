import { renderProductos } from './cards.js';

document.addEventListener("DOMContentLoaded", () => {
    // Renderizar productos
    ["pasteles", "galletas", "tartas", "especiales", "cupcakes", "panques"].forEach((categoria) => renderProductos(categoria));

    // Botón de volver arriba
    const btnScrollTop = document.getElementById("btnScrollTop");

    if (!btnScrollTop) {
        console.error("El botón de volver arriba no se encontró en el DOM.");
        return;
    }

    // Mostrar el botón solo cuando el usuario haga scroll hacia abajo
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            btnScrollTop.style.display = "block";
        } else {
            btnScrollTop.style.display = "none";
        }
    });

    // Volver al inicio al hacer clic en el botón
    btnScrollTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
