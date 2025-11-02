import { renderHook, waitFor } from '@testing-library/react-native';
import { agregarItemPedido } from '@/src/pedidos/hooks/agregarItemPedido';

describe('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {
  test('Es posible agregar nuevos ítems al pedido', async () => {
    const { result } = renderHook(() => agregarItemPedido());
    const success = await result.current.agregar(
      'fe3ab5e8-6565-4630-b1c8-fd9c64b19cfa', 
      '6d343b7f-e3ce-46f4-b206-b5d8d8501876', 
      2, 
      2300.00
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(success).toBe(true);
  });

  test('no es posible agrega un item a un pedido inexistente', async () => {
    const { result } = renderHook(() => agregarItemPedido());
    const success = await result.current.agregar(
      '1', 
      '6d343b7f-e3ce-46f4-b206-b5d8d8501876', 
      2, 
      2300.00
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(success).toBe(false);
  });
});