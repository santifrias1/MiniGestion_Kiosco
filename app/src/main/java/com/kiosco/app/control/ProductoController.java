package com.kiosco.app.control;

import com.kiosco.app.model.Producto;
import com.kiosco.app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


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

    @PutMapping("/{id}/stock/{cantidad}")
    public Producto agregarStock(@PathVariable Long id, @PathVariable Integer cantidad){
        Optional<Producto> opt = repository.findById(id);
        if(opt.isPresent()){
            Producto p = opt.get();
            p.setStock(p.getStock() + cantidad);
            return repository.save(p);
        }
        return null;
    }

    @PostMapping("/venta")
    public String procesarVentaCarrito(@RequestBody List<ItemCarrito> carrito){
        for(ItemCarrito item : carrito){
            Optional<Producto> opt = repository.findById(item.id);
            if(opt.isPresent()){
                Producto p = opt.get();
                if(p.getStock() >= item.cantidad){
                    p.setStock(p.getStock() - item.cantidad);
                    repository.save(p);
                }else{
                    return "Error: Sin stock suficiente para " + p.getNombre();
                }
            }
        }
        return "Venta procesada exitosamente.";
    }

    public static class ItemCarrito{
        public Long id;
        public Integer cantidad;
    }
}
