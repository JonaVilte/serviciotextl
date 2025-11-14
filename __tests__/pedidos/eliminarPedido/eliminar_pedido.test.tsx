import { renderHook, waitFor } from '@testing-library/react-native';
import usarEliminarPedido from '@/src/pedidos/hooks/usarEliminarPedido';
import { supabase } from '@/lib/supabaseClient';

describe('usarEliminarPedido', () => {
  test('Elimina un pedido correctamente', async () => {
    const { result } = renderHook(() => usarEliminarPedido());

    const success = await result.current.eliminarPedido('39503695-7084-4844-9fb4-75a83b83a803');

    expect(success).toBe(true);
    expect(result.current.error).toBeNull();

    // 4️⃣ Esperar a que cargando vuelva a false
    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

})})
