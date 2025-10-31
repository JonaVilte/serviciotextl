import { renderHook, waitFor } from '@testing-library/react-native';

import usarPedidos from '@/src/pedidos/hooks/index';

describe.skip('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {
  test('Corroborar que existen 8 pedidos registrados', async () => {
    const { result } = renderHook(() => usarPedidos());

    expect(result.current.pedidos().length).toBe(0);
    await waitFor(() => expect(result.current.pedidos().length).toBe(8));
  });

  //   test('Poder visualizar los pedidos registrados.', async () => {
  //   const { result } = renderHook(() => usarPedidos());

  //   expect(result.current.pedidos().length).toBe(0);
  //   await waitFor(() => expect(result.current.pedidos().length).toBe(8));

  //   // expect(result.current.loading).toBe(true);
  //   // expect(result.current.pedidos().length).toBe(0);

  //   // await waitFor(() => expect(result.current.loading).toBe(false), {
  //   //   timeout: 5000
  //   // });

  //   // const pedidosVisualizados = result.current.pedidos();
  //   // expect(pedidosVisualizados.length).toBeGreaterThan(0);
  // });
});
