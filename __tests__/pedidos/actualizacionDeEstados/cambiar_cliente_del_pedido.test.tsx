import { renderHook, act, waitFor } from '@testing-library/react-native';
import actualizarClientePedido from '@/src/pedidos/hooks/usarActualizarClienteDelPedido';

describe('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('actualiza el cliente del pedido', async () => {
    const { result } = renderHook(() => actualizarClientePedido());
    const success = await result.current.actualizarCliente(
      '2bba368c-69a5-48e9-9d76-050c6d335c91',
      '0e263ce9-5f0b-49d7-8919-d073fa58e537'
    );
    await waitFor(async () => {
      expect(success).toBe(true);
    });
  });

  test('no actualiza el cliente del pedido', async () => {
    const { result } = renderHook(() => actualizarClientePedido());
    const success = await result.current.actualizarCliente(
      '2bba368c-69a5-48e9-9d76-050c6d335c91',
      '2'
    );
    await waitFor(async () => {
      expect(success).toBe(false);
    });
  });
});
