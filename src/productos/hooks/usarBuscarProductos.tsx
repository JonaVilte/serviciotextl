// src/productos/hooks/usarBuscarProductos.ts
import { useState, useMemo, useEffect } from 'react';

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
  const [terminoDebounce, setTerminoDebounce] = useState('');
  const [buscando, setBuscando] = useState(false);

  // Debounce para delay en la búsqueda
  useEffect(() => {
    if (terminoBusqueda.trim() === '') {
      setTerminoDebounce('');
      setBuscando(false);
      return;
    }

    setBuscando(true);
    
    const timer = setTimeout(() => {
      setTerminoDebounce(terminoBusqueda);
      setBuscando(false);
    }, 500); // 500ms de delay

    return () => {
      clearTimeout(timer);
      setBuscando(false);
    };
  }, [terminoBusqueda]);

  const productosFiltrados = useMemo(() => {
    // Si no hay término de búsqueda, mostrar todos los productos
    if (!terminoDebounce.trim()) {
      return productos;
    }

    // Filtrar productos por nombre (case-insensitive)
    const terminoLower = terminoDebounce.toLowerCase().trim();
    
    return productos.filter(producto => 
      producto.nombre.toLowerCase().includes(terminoLower)
    );
  }, [productos, terminoDebounce]);

  // Calcular si no se encontraron productos
  const noSeEncontraronProductos = 
    terminoDebounce.trim() !== '' && 
    productosFiltrados.length === 0 && 
    !buscando;

  return {
    terminoBusqueda,
    setTerminoBusqueda,
    productosFiltrados,
    buscando,
    noSeEncontraronProductos,
    hayResultados: productosFiltrados.length > 0
  };
};