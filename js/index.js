const API_URL = 'https://685ac4489f6ef9611157b3c4.mockapi.io/adri/jared/anillos'; 

const container = document.getElementById('cards-container');

async function CargarProductos() {
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        CargarTarjetas(data);
    }catch (err){
        console.error('Error al cargar datos:' , err);
        container.innerHTML = '<p>Error al cargar los productos.</p>';
    }
}

function CargarTarjetas(productos){
    container.innerHTML = '';

    if(productos.length == 0){ //Si "productos" está vacío, entonces:
        container.innerHTML = "<p>No hay productos ingresados</p>";
        return; // Evita que el código se siga ejecutando 
    }

    productos.forEach(producto => {
        container.innerHTML += `
            <div class="card">
                <img src="${producto.imagen}" alt="Foto de anillo">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p>${producto.precio}</p>

            </div>    
        `;
    });
}

//Al cargar la página:
window.addEventListener('DOMContentLoaded', CargarProductos);




const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function(){
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}


