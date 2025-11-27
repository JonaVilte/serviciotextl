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

export const useBuscarProduc = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [terminoDebounce, setTerminoDebounce] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);

  // Buscar productos en Supabase cuando cambia el término con debounce
  useEffect(() => {
    const buscarEnSupabase = async () => {
      if (!terminoDebounce.trim()) {
        setProductos([]);
        setCargandoProductos(false);
        return;
      }

      try {
        setCargandoProductos(true);
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .ilike('nombre', `%${terminoDebounce}%`);

        if (error) throw error;

        setProductos(data || []);
      } catch (error) {
        console.error('Error buscando productos:', error);
        setProductos([]);
      } finally {
        setCargandoProductos(false);
      }
    };

    buscarEnSupabase();
  }, [terminoDebounce]);

  // Debounce para el término de búsqueda
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
    }, 500);

    return () => {
      clearTimeout(timer);
      setBuscando(false);
    };
  }, [terminoBusqueda]);

  // Filtrado local (aunque ya viene filtrado de Supabase, mantenemos la estructura)
  const productosFiltrados = useMemo(() => {
    return productos;
  }, [productos]);

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