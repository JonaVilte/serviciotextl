import { renderHook, act } from '@testing-library/react-native';
import actualizarEstadoPedido from '@/src/pedidos/hooks/actulizarEstadoDePedido';

describe('useActualizarEstadoPedido', () => {
  test('actualiza correctamente el estado del pedido', async () => {
    const { result } = renderHook(() => actualizarEstadoPedido());
    console.log(result);
    await act(async () => {
      const success = await result.current.actualizarEstado(
        '1b3593fc-ab83-4539-8587-dc911660625c',
        'entregado'
      );
      expect(success).toBe(true);
    });
  });
});
