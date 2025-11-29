// src/productos/hooks/usarBuscarProductos.ts
import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

export const useBuscarProductos = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [terminoDebounce, setTerminoDebounce] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);

  useEffect(() => {
    if (terminoBusqueda.trim() === '') {
      setTerminoDebounce('');
      setBuscando(false);
      setProductos([]); 
      return;
    }

    setBuscando(true);
    setCargandoProductos(true);
    
    const timer = setTimeout(async () => {
      try {
        setTerminoDebounce(terminoBusqueda);
        
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .ilike('nombre', `%${terminoBusqueda}%`);

        if (error) {
          throw error;
        }

        setProductos(data || []);
      } catch (error) {
        console.error('Error buscando productos:', error);
      } finally {
        setBuscando(false);
        setCargandoProductos(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      setBuscando(false);
      setCargandoProductos(false);
    };
  }, [terminoBusqueda]);

  const productosFiltrados = useMemo(() => {
    if (!terminoDebounce.trim()) {
      return productos;
    }

    const terminoLower = terminoDebounce.toLowerCase().trim();
    
    return productos.filter(producto => 
      producto.nombre.toLowerCase().includes(terminoLower)
    );
  }, [productos, terminoDebounce]);

  const noSeEncontraronProductos = 
    terminoDebounce.trim() !== '' && 
    productosFiltrados.length === 0 && 
    !buscando &&
    !cargandoProductos;

  const hayResultados = productosFiltrados.length > 0 && !buscando;

  return {
    terminoBusqueda,
    setTerminoBusqueda,
    productosFiltrados,
    buscando: buscando || cargandoProductos,
    noSeEncontraronProductos,
    hayResultados,
    error: null
  };
};