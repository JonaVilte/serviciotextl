// src/productos/hooks/useBuscarProductos.ts
import { useState, useMemo } from 'react';

// Usamos el mismo tipo que en usarProductos
type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  talla: string;
  color: string;
};

export const useBuscarProductos = ({ productos }: { productos: Producto[] }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const productosFiltrados = useMemo(() => {
    // Si no hay término de búsqueda, mostrar todos los productos
    if (!terminoBusqueda.trim()) {
      return productos;
    }

    // Filtrar productos por nombre (case-insensitive)
    const terminoLower = terminoBusqueda.toLowerCase().trim();
    
    return productos.filter(producto => 
      producto.nombre.toLowerCase().includes(terminoLower)
    );
  }, [productos, terminoBusqueda]);

  return {
    terminoBusqueda,
    setTerminoBusqueda,
    productosFiltrados,
    buscando: false // No necesitamos estado de "buscando" para filtrado local
  };
};