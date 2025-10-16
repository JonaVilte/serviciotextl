import { supabase } from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react';

const usarPedidos = () => {
  const [pedidos, cambiarPedidos] = useState<
    { 
      id: string ;
      usuario_nombre: string; 
      fecha_emision: string; 
      estado: string; 
      total: number 
    }[]
  >([]);
  const [error, cambiarError] = useState <boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
        const cargarPedidos = async () => {
      try {

      const { data, error } = await supabase
      .from('pedidos')
      .select(
        `
        id,
        fecha_emision,
        estado,
        total,
        usuarios (nombre)
        `
      );

      if (error) {
        console.log('No se pudo cargar los pedios');
        cambiarError(true)
        return;
      }
      const pedidosConNombre = data.map((p : any) => ({
        id: p.id,
        fecha_emision: p.fecha_emision,
        estado: p.estado,
        total: p.total,
        usuario_nombre: p.usuarios?.nombre ?? 'Desconocido',
      }));

        cambiarPedidos(pedidosConNombre);
      } catch (err) {
        console.error('Error cargando pedidos:', err);
        cambiarError(true);
      } finally {
        setLoading(false);
      }};

    cargarPedidos();
  }, []);

  return { pedidos: () => pedidos , error, loading };
};

export default usarPedidos;


