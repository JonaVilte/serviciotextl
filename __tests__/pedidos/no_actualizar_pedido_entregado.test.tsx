import { renderHook, act } from '@testing-library/react-native';
import usarEstadoDelPedido from '@/src/pedidos/hooks/actulizarEstadoDePedido';

describe('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {
  test('no actualiza el estado del pedido si ya esta entregado', async () => {
    const { result } = renderHook(() => usarEstadoDelPedido());
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
