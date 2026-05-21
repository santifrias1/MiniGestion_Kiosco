async function cargarProductos() {
    try {
        const respuesta = await fetch('/api/productos');
        const productos = await respuesta.json();
        
        const cuerpoTabla = document.getElementById('tabla-productos');
        cuerpoTabla.innerHTML = ''; 

        productos.forEach(producto => {
            const fila = document.createElement('tr');
            
            const botonDisabled = producto.stock <= 0 ? 'disabled' : '';
            const claseStock = producto.stock <= 0 ? 'background-color: #dc3545;' : ''; // Rojo si no hay stock

            fila.innerHTML = `
                <td>${producto.id}</td>
                <td><strong>${producto.nombre}</strong></td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td><span class="stock-badge" style="${claseStock}">${producto.stock} un.</span></td>
                <td>
                    <button class="btn-vender" ${botonDisabled} onclick="venderProducto(${producto.id}, ${producto.stock})">
                        Vender 1
                    </button>
                </td>
            `;
            
            cuerpoTabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

async function venderProducto(id, stockActual) {
    if (stockActual <= 0) return; 

    try {
        await fetch(`/api/productos/${id}/vender`, {
            method: 'PUT'
        });
        
        cargarProductos();
    } catch (error) {
        console.error("Error al vender el producto:", error);
    }
}

document.getElementById('formulario-producto').addEventListener('submit', async function(evento) {
    evento.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);

    const nuevoProducto = {
        nombre: nombre,
        precio: precio,
        stock: stock
    };

    try {
        await fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });

        document.getElementById('formulario-producto').reset();
        
        cargarProductos();
    } catch (error) {
        console.error("Error al guardar el producto:", error);
    }
});

document.addEventListener('DOMContentLoaded', cargarProductos);