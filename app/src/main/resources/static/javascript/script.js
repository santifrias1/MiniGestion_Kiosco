let carrito = [];
let productosGlobal = [];

// 1. Cargar productos desde el Backend
async function cargarProductos() {
    try {
        const respuesta = await fetch('/api/productos');
        productosGlobal = await respuesta.json();
        renderizarTabla();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// 2. Dibujar la tabla de inventario
function renderizarTabla() {
    const cuerpoTabla = document.getElementById('tabla-productos');
    cuerpoTabla.innerHTML = ''; 

    productosGlobal.forEach(p => {
        const fila = document.createElement('tr');
        const sinStock = p.stock <= 0;
        
        fila.innerHTML = `
            <td><strong>${p.nombre}</strong></td>
            <td>$${p.precio.toFixed(2)}</td>
            <td style="${sinStock ? 'color: red; font-weight: bold;' : ''}">${p.stock} un.</td>
            <td>
                <button class="btn-carrito" ${sinStock ? 'disabled' : ''} onclick="agregarAlCarrito(${p.id})">
                    + Carrito
                </button>
                <button class="btn-stock" onclick="pedirAumentoStock(${p.id})">
                    + Stock
                </button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// 3. Manejo del Stock directamente
async function pedirAumentoStock(id) {
    const cantidadStr = prompt("¿Cuántas unidades nuevas llegaron al kiosco?");
    const cantidad = parseInt(cantidadStr);
    
    if (!isNaN(cantidad) && cantidad > 0) {
        try {
            await fetch(`/api/productos/${id}/stock/${cantidad}`, { method: 'PUT' });
            cargarProductos(); // Recargar la tabla
        } catch (error) {
            alert("Error al actualizar el stock.");
        }
    }
}

// 4. Agregar nuevo producto
document.getElementById('formulario-producto').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value)
    };

    await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
    });

    this.reset();
    cargarProductos();
});

// ==========================================
// LÓGICA DEL CARRITO Y FACTURACIÓN
// ==========================================

function agregarAlCarrito(id) {
    const producto = productosGlobal.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        if (itemEnCarrito.cantidad < producto.stock) {
            itemEnCarrito.cantidad++;
        } else {
            alert("No hay más stock disponible de este producto.");
        }
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    renderizarCarrito();
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(i => i.id === id);
    const productoBD = productosGlobal.find(p => p.id === id);
    
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad > productoBD.stock) {
        item.cantidad = productoBD.stock;
        alert("Stock máximo alcanzado.");
    }

    if (item.cantidad <= 0) {
        carrito = carrito.filter(i => i.id !== id);
    }
    renderizarCarrito();
}

function renderizarCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total-carrito');
    const btnCobrar = document.getElementById('btn-cobrar');
    
    contenedor.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
        totalSpan.innerText = '0.00';
        btnCobrar.disabled = true;
        return;
    }

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const div = document.createElement('div');
        div.className = 'item-carrito';
        div.innerHTML = `
            <div><strong>${item.nombre}</strong><br>$${item.precio.toFixed(2)}</div>
            <div class="cantidad-controls">
                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
            </div>
            <div><strong>$${subtotal.toFixed(2)}</strong></div>
        `;
        contenedor.appendChild(div);
    });

    totalSpan.innerText = total.toFixed(2);
    btnCobrar.disabled = false;
}

// 5. Procesar la venta en la base de datos y mostrar Factura
async function procesarVenta() {
    // Preparamos el array que el Backend espera: [{id: 1, cantidad: 2}]
    const payload = carrito.map(item => ({ id: item.id, cantidad: item.cantidad }));

    try {
        await fetch('/api/productos/venta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        generarFacturaVisual();
        carrito = []; // Vaciamos el carrito
        renderizarCarrito();
        cargarProductos(); // Actualizamos el stock visual

    } catch (error) {
        alert("Hubo un error al procesar la venta");
    }
}

// 6. Modal de Factura
function generarFacturaVisual() {
    const detalle = document.getElementById('detalle-factura');
    let total = 0;
    detalle.innerHTML = '';

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        detalle.innerHTML += `
            <div class="detalle-linea">
                <span>${item.cantidad}x ${item.nombre}</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
        `;
    });

    document.getElementById('total-modal').innerText = total.toFixed(2);
    document.getElementById('fecha-factura').innerText = new Date().toLocaleString();
    document.getElementById('modal-factura').style.display = 'flex';
}

function cerrarFactura() {
    document.getElementById('modal-factura').style.display = 'none';
}

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', cargarProductos);