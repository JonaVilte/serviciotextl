import { renderHook, act } from '@testing-library/react-native';
import actualizarClientePedido from '@/src/pedidos/hooks/actualizarClienteDelPedido';

describe('useActualizarEstadoPedido', () => {
  test('actualiza correctamente el estado del pedido', async () => {
    const { result } = renderHook(() => actualizarClientePedido());
    console.log(result);
    await act(async () => {
      const success = await result.current.actualizarCliente(
        '2bba368c-69a5-48e9-9d76-050c6d335c91', 
        '0e263ce9-5f0b-49d7-8919-d073fa58e537'
      );
      expect(success).toBe(true);
    });
  });
});
