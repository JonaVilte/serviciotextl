import { renderHook, act, waitFor } from '@testing-library/react-native';
import usarEstadoDelPedido from '@/src/pedidos/hooks/actulizarEstadoDePedido';

describe('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());
  test('actualiza correctamente el estado del pedido existente', async () => {
    const { result } = renderHook(() => usarEstadoDelPedido());
    const success = await result.current.actualizarEstado(
      '2bba368c-69a5-48e9-9d76-050c6d335c91',
      'en_proceso'
    );
    await waitFor(async () => {
      expect(result.current.cargando).toBe(true);
    });
    expect(success).toBe(true);
  });

  test('no actualiza el estado del pedido inexistente', async () => {
    const { result } = renderHook(() => usarEstadoDelPedido());
    const success = await result.current.actualizarEstado('1', 'en_proceso');
    expect(success).toBe(false);
    await waitFor(async () => {
      expect(result.current.error).toEqual('No se pudo verificar el estado del pedido');
    });
  });
});
