import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function agregarItemPedido() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregar = async ({
    pedidoId,
    productoId,
    cantidad,
    precioUnitario,
  }: {
    pedidoId: string;
    productoId: string;
    cantidad: number;
    precioUnitario: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const subtotal = cantidad * precioUnitario;

      // Insertar el nuevo item
      const { error: insertError } = await supabase.from('pedido_detalles').insert({
        pedido_id: pedidoId,
        producto_id: productoId,
        cantidad,
        precio_unitario: precioUnitario,
        subtotal,
      });

      if (insertError) {
        setError('No se pudo insertar el nuevo pedido');
        return false;
      }

      // Actualizar el total del pedido
      const { data: detalles, error: detallesError } = await supabase
        .from('pedido_detalles')
        .select('subtotal')
        .eq('pedido_id', pedidoId);

      if (detallesError) {
        setError('No se pudo actualizar el total del pedido');
        return false;
      }

      const nuevoTotal = detalles.reduce((sum, item) => sum + item.subtotal, 0);

      const { error: updateError } = await supabase
        .from('pedidos')
        .update({ total: nuevoTotal })
        .eq('id', pedidoId);

      if (updateError) {
        setError(updateError.message);
        return false;
      }

      return true;
    } catch (err) {
      setError('Error al agregar el item al pedido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { agregar, loading, error };
}
