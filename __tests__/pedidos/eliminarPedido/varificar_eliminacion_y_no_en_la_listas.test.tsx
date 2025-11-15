import { renderHook, waitFor, render, screen, act, fireEvent } from '@testing-library/react-native';
import usarEliminarPedido from '@/src/pedidos/hooks/usarEliminarPedido';
import ListaDePedidos from '@/src/pedidos/components/listaDePedidos';
import BotonesAccion from '../../../src/pedidos/components/botonesAccion';
import { Alert } from 'react-native';

describe('Como vendedor, quiero eliminar pedidos erróneos o cancelados, para mantener el registro limpio.', () => {
  test('Elimina un pedido correctamente', async () => {
    render(<ListaDePedidos />);

    await waitFor(() => expect(screen.queryByText('Cargando pedidos...')).toBeNull(), {
      timeout: 3000,
    });
    const headings = screen.getAllByRole('heading', { name: /Pedido de Jonatan/i });

    const { result } = renderHook(() => usarEliminarPedido());
    
    await act(async () => {
      const success = await result.current.eliminarPedido('b7321a6a-0e7f-44e5-9668-cdb9557e2b99');
      expect(success).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(screen.queryByText('Jonatan')).toBeNull();
  });

  test('El sistema pide confirmación antes de eliminar.', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    const { getByText } = render(
      <BotonesAccion
        pedidoId="fe3ab5e8-6565-4630-b1c8-fd9c64b19cfa"
        pedidoEntregado={false}
      />
    );

    fireEvent.press(getByText('Eliminar'));

    expect(alertSpy).toHaveBeenCalledWith(
      'Confirmar eliminación',
      '¿Seguro que deseas eliminar este pedido? Esta acción no se puede deshacer.',
      expect.any(Array)
    );
  });

})
