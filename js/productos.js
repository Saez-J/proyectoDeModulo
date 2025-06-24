const API_URL = 'https://685ac4489f6ef9611157b3c4.mockapi.io/adri/jared/anillos';

//Coloca tu endpoint de ImgBB
const IMG_API_URL = 'https://api.imgbb.com/1/upload?key=f4cd703442c4bbb302e00c16f4e07cfb';

const form = document.getElementById('productos-form'); // Formulario principal
const nombreEl = document.getElementById('nombre'); // Campo de nombre
const descripcionEl = document.getElementById('descripcion'); // Campo de descripcion
const precioEl = document.getElementById('precio'); // Campo de precio
const imagenFileEl = document.getElementById('imagen-file'); // Input de archivo (imagen)
const imagenUrlEl = document.getElementById('imagen-url'); // Campo oculto con URL de la imagen
const idEl = document.getElementById('persona-id'); // Campo oculto con ID de la persona
const cancelBtn = document.getElementById('btn-cancel'); // Botón para cancelar edición
const submitBtn = document.getElementById('btn-submit'); // Botón para agregar/actualizar
const tbody = document.getElementById('productos-tbody'); // Cuerpo de la tabla de registros


async function CargarProductos() {
    const res = await fetch(API_URL);
    const data = await res.json();
    CargarTabla(data);
}

function CargarTabla(productos){
    tbody.innerHTML = '';
    productos.forEach(producto =>{
        tbody.innerHTML += `
        <tr>
            <td><img src="${producto.imagen}" alt="Foto de ${producto.nombre}"/></td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td>
                <button onclick="CargarParaEditar('${producto.id}')" style="background-color: #5c5c5c; border: none;">Editar</button>
                <button onclick="BorrarProducto('${producto.id}')" style="background-color: #5c5c5c; border: none;">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

//Carga inicial
window.addEventListener('DOMContentLoaded', CargarProductos);

async function BorrarProducto(id) {
    const confirmacion = confirm('¿Eliminar este producto?');

    if(confirmacion){
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        CargarProductos();
        alert("El producto fue eliminado");
    }

    else{
        alert("Se canceló la acción");
        return;
    }
}

async function CargarParaEditar(id){
    const res = await fetch(`${API_URL}/${id}`);
    const p = await res.json();

    nombreEl.value = p.nombre;
    descripcionEl.value = p.descripcion;
    precioEl.value = p.precio;
    imagenUrlEl.value = p.imagen;
    imagenFileEl.value = '';
    idEl.value = p.id;

    submitBtn.textContent = 'Actualizar';
    cancelBtn.hidden = false;
}

cancelBtn.addEventListener('click', () => {
    form.reset();
    idEl.value = '';
    submitBtn.textContent = 'Agregar';
    cancelBtn.hidden = true;
});

async function subirImagen(file){
    const fd = new FormData ();
    fd.append('image', file);
    const res = await fetch(IMG_API_URL, { method: 'POST', body: fd });
    const obj = await res.json();
    return obj.data.url;
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    let imagenUrl = imagenFileEl.value;
    if (imagenFileEl.files.length > 0) {
        imagenUrl = await subirImagen(imagenFileEl.files[0]);
    }

    const payload = {
        nombre: nombreEl.value,
        descripcion: descripcionEl.value,
        precio: precioEl.value,
        imagen: imagenUrl
    };

    if(idEl.value){
        await fetch(`${API_URL}/${idEl.value}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        alert("Registro actualizado");
    }
    else{
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        alert("Registro agregado");
    }

    form.reset();
    cancelBtn.hidden = true;
    submitBtn.textContent = "Agregar";
    idEl.value = "";
    CargarProductos();
});








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