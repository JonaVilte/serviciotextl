import { renderHook, waitFor } from '@testing-library/react-native';
import { agregarItemPedido } from '@/src/pedidos/hooks/usarAgregarItemPedido';

describe('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {
  test('Es posible agregar nuevos ítems al pedido', async () => {
    const { result } = renderHook(() => agregarItemPedido());
    const success = await result.current.agregar({
      pedidoId: 'fe3ab5e8-6565-4630-b1c8-fd9c64b19cfa',
      productoId: '6d343b7f-e3ce-46f4-b206-b5d8d8501876',
      cantidad: 2,
      precioUnitario: 2300.0,
    });

    await waitFor(() => {
      expect(success).toBe(true);
    });
  });

  test('no es posible agrega un item a un pedido inexistente', async () => {
    const { result } = renderHook(() => agregarItemPedido());
    const success = await result.current.agregar({
      pedidoId: '1',
      productoId: '6d343b7f-e3ce-46f4-b206-b5d8d8501876',
      cantidad: 2,
      precioUnitario: 2300.0,
    });

    await waitFor(() => {
      expect(success).toBe(false);
    });
  });

  //TESTEAR que halla el error de pedido no encontrado o otro error
});
