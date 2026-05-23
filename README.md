# 🏪 Sistema de Gestión para Kiosco (Punto de Venta)

Una aplicación web **full-stack** diseñada para la gestión de inventario y procesamiento de ventas de un kiosco. Este proyecto implementa una arquitectura de **tres capas (Frontend, Backend y Base de Datos)** permitiendo operaciones CRUD completas y un sistema de carrito de compras funcional.

---

# 🚀 Características Principales

✅ **Gestión de Inventario**  
Visualización del stock actual en tiempo real mediante una interfaz limpia y profesional.

✅ **Ingreso de Mercadería**  
Formulario integrado para registrar nuevos productos (*Nombre, Precio y Stock*) de forma rápida.

✅ **Actualización Rápida de Stock**  
Botones **"+ Stock"** dedicados para sumar unidades mediante ventanas emergentes, evitando modificar directamente la base de datos.

✅ **Carrito de Compras Dinámico**  
Sistema para acumular productos, ajustar cantidades (con validación de stock disponible) y calcular el total automáticamente.

✅ **Sistema de Facturación**  
Procesamiento de ventas que descuenta stock automáticamente y genera un recibo visual detallado.

✅ **Alertas Inteligentes**  
Bloqueo automático de botones e indicadores visuales cuando un producto queda sin stock.

---

# 🛠️ Tecnologías Utilizadas

## Backend
- **Java 17 / 21**
- **Spring Boot 3.x**
   - Spring Web → Creación de API REST
   - Spring Data JPA (Hibernate) → ORM y generación automática de tablas
- **Maven** → Gestión de dependencias y construcción

## Frontend
- **HTML5**
- **CSS3**
   - Flexbox
   - CSS Grid
   - Variables CSS
- **JavaScript Vanilla**
   - Fetch API
   - Async / Await

## Base de Datos y Entorno
- **PostgreSQL**
- **DBeaver**
- **Xubuntu Linux**
- **Visual Studio Code**
   - Extension Pack for Java
   - Spring Boot Extension Pack

---

# 📋 Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

1. **JDK 17 o superior**
2. **PostgreSQL**
3. **DBeaver** *(opcional pero recomendado)*
4. **Visual Studio Code**
5. Extensiones:
   - Java Extension Pack
   - Spring Boot Extension Pack

---

# ⚙️ Instalación y Configuración

## Paso 1: Preparar la Base de Datos

1. Abrir **DBeaver**
2. Conectarse al servidor PostgreSQL
3. Crear una nueva base de datos:

```text
kiosco_db
```

⚠️ **Importante:**  
No crees tablas manualmente. Spring Boot las generará automáticamente mediante JPA.

---

## Paso 2: Clonar y Abrir el Proyecto

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Abrir el proyecto en Visual Studio Code:

```bash
cd kiosco
code .
```

Esperar unos segundos mientras Maven descarga dependencias.

---

## Paso 3: Configurar las Credenciales

Ir a:

```text
src/main/resources/application.properties
```

Modificar:

```properties
# URL de conexión
spring.datasource.url=jdbc:postgresql://localhost:5432/kiosco_db

# Credenciales PostgreSQL
spring.datasource.username=postgres
spring.datasource.password=TU_CONTRASEÑA

# Configuración JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

---

## Paso 4: Ejecutar la Aplicación

Ir a:

```text
src/main/java/com/kiosco/app/AppApplication.java
```

Ejecutar mediante:

- Botón **Run**
- Clic derecho → **Run Java**

Si todo funciona correctamente aparecerá un mensaje similar:

```text
Started AppApplication in X seconds
```

---

## Paso 5: Acceder al Sistema

Abrir el navegador e ingresar:

```text
http://localhost:8080
```

🎉 ¡El sistema ya estará funcionando!

---

# 📡 Endpoints API REST

| Método | Endpoint | Descripción |
|----------|----------|-------------|
| GET | `/api/productos` | Obtiene inventario completo |
| POST | `/api/productos` | Registra nuevo producto |
| PUT | `/api/productos/{id}/stock/{cantidad}` | Actualiza stock |
| POST | `/api/productos/venta` | Procesa venta |

---

# 📂 Arquitectura del Proyecto

```text
src/
├── main/
│
├── java/com/kiosco/app/
│   │
│   ├── controller/
│   │   └── ProductoController.java
│   │
│   ├── model/
│   │   └── Producto.java
│   │
│   ├── repository/
│   │   └── ProductoRepository.java
│   │
│   └── AppApplication.java
│
└── resources/
    │
    ├── static/
    │   │
    │   ├── css/
    │   │   └── style.css
    │   │
    │   ├── javascript/
    │   │   └── script.js
    │   │
    │   └── index.html
    │
    └── application.properties
```

---

# 👨‍💻 Guía Rápida de Uso

### 🆕 Crear Producto
Utiliza el formulario **Nuevo Producto**, completa los datos y presiona **Enter**.

### 🛒 Agregar al Carrito
Haz clic en **"+ Carrito"**. Las cantidades pueden modificarse con **+** y **−** desde el carrito.

### 📦 Ingreso de Stock
Presiona **"+ Stock"**, introduce la cantidad y el inventario se actualizará automáticamente.

### 💳 Cobrar y Facturar
Presiona **"Cobrar y Facturar"** para:

- Generar recibo
- Descontar stock
- Registrar la venta

---

# ✨ Arquitectura Utilizada

El proyecto implementa una arquitectura de **3 capas**:

- **Frontend**
- **Backend**
- **Base de Datos**

Con comunicación mediante:

```text
Frontend
   ↓ Fetch API
Backend (Spring Boot)
   ↓ JPA/Hibernate
PostgreSQL
```
---
# Diagrama de Funcionamiento del Sistema
<img width="586" height="947" alt="RLJ1Rjf04BrRyZzCEG5AGBr6LPGGQ1CQ0iMalI1Lmten6zOxxkuQXLJzc1vxo2cVm8zrrd4JalHYuTbzRzwRUUR4URI-p7KSlVChcKieD2eJHswjJ84MSn2K5sIayOdVQWbyztqSnH4AJnOQrwv4gsXkcfyLkH-bjDHg03ge3yBL0iKQCmcDZvQCboQ5vXLkP8OfCtoJ2mRyZ2DuxWID2x" src="https://github.com/user-attachments/assets/bdb54068-e5a1-449e-8d86-b5f6f0c11ef6" />
