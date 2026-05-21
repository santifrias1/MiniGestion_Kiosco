package com.kiosco.app.control;

import com.kiosco.app.model.Producto;
import com.kiosco.app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository repository;

    @GetMapping
    public List<Producto> obtenerProductos(){
        return repository.findAll();
    }

    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto){
        return repository.save(producto);
    }

    @PutMapping("/{id}/vender")
    public Producto venderProducto(@PathVariable Long id){
        Producto producto = repository.findById(id).orElse(null);
        if(producto != null && producto.getStock() > 0){
            producto.setStock(producto.getStock() - 1);
            return repository.save(producto);
        }
        return producto;
    }
}
