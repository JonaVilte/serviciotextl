import { renderHook, act } from '@testing-library/react-native';
import actualizarEstadoPedido from '@/src/pedidos/hooks/actulizarEstadoDePedido';

describe('useActualizarEstadoPedido', () => {
  test('actualiza correctamente el estado del pedido', async () => {
    const { result } = renderHook(() => actualizarEstadoPedido());
    console.log(result);
    await act(async () => {
      const success = await result.current.actualizarEstado(
        '324cfbd6-0aa5-4908-b103-0e0de3dbbaf8',
        'entregado'
      );
      expect(success).toBe(false);
    });
  });
});
