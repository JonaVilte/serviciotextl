import { render, screen, waitFor } from '@testing-library/react-native';

import ListaDePedidos from '@/src/pedidos/components/listaDePedidos';

describe('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {
  test('Corroborar que existen 8 pedidos registrados', async () => {
    render(<ListaDePedidos />);

    await waitFor(() => expect(screen.queryByText('Cargando pedidos...')).toBeNull(), {
      timeout: 3000,
    });
    const headings = screen.getAllByRole('heading', { name: /Pedido de Ma/i });
    expect(screen.getByText('Fecha de Emisión: 24/8/2025, 10:17:37')).toBeTruthy();
    expect(screen.getAllByText('Estado del Pedido: entregado')).toBeTruthy();
    expect(screen.getAllByText('Precio del Pedido: $18770')).toBeTruthy();
  });
});
