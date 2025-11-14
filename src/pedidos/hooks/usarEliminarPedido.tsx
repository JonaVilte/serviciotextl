import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

const usarEliminarPedido = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eliminarPedido = async (pedidoId: string) => {
    setCargando(true);
    setError(null);

    try {
      const { error: errorDelete } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', pedidoId);

      if (errorDelete) {
        setError('No se pudo eliminar el pedido: ${errorDelete.message}');
        return false;
      }

      return true;
    } catch (err: any) {
      setError('Error inesperado: ${err.message}');
      return false;
    } finally {
      setCargando(false);
    }
  };

  return { eliminarPedido, cargando, error };
};

export default usarEliminarPedido;
