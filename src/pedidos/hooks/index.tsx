import { supabase } from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react';

const usarPedidos = () => {
  const [pedidos, cambiarPedidos] = useState<
    { usuario_id: string; fecha_emision: string; estado: string; total: number }[]
  >([]);

  const [error, cambiarError] = useState <boolean>(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('pedidos').select();

      if (error) {
        console.log('No se pudo cargar los pedios');
        cambiarError(true)
        return;
      }
      cambiarPedidos(data);
    })();
  });

  return { pedidos: () => pedidos, huboUnProblema: () =>  error};
};

export default usarPedidos;
