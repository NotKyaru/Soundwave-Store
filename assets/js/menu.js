const botonMenu = document.querySelector("#boton-menu");
const menuPrincipal = document.querySelector("#menu-principal");

function alternarMenu() {
    const menuAbierto = menuPrincipal.classList.toggle("menu-abierto");
    botonMenu.setAttribute("aria-expanded", String(menuAbierto));
}

botonMenu.addEventListener("click", alternarMenu);