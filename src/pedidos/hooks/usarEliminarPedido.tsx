import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

const usarEliminarPedido = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eliminarPedido = async (pedidoId: string) => {
    setCargando(true);
    setError(null);

    try {
      // 1️⃣ Obtener el pedido
      const { data: pedido, error: errorPedido } = await supabase
        .from('pedidos')
        .select('*')
        .eq('id', pedidoId)
        .single();

      console.log('Pedido encontrado:', pedido);

      if (errorPedido) {
        setError('No se encontró el pedido: ' + errorPedido.message);
        return false;
      }

      // 2️⃣ Eliminar el pedido
      const { data, error: errorDelete } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', pedidoId);

      if (errorDelete) {
        setError(errorDelete.message);
        return false;
      }

      console.log('Pedido eliminado:', data);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  };

  return { eliminarPedido, cargando, error };
};

export default usarEliminarPedido;
