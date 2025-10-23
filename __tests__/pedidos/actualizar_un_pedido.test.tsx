import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import TarjetaParaEditarPedido from '@/src/pedidos/components/tarjetaParaEditarPedido';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock del hook que actualiza el estado
jest.mock('@/src/pedidos/hooks/actulizarEstadoDePedido', () => {
  return jest.fn(() => ({
    actualizarEstado: jest.fn(() => Promise.resolve(true)), // simula éxito
    cargando: false,
    error: null,
  }));
});

// Mock de Alert
jest.spyOn(Alert, 'alert');

describe('TarjetaParaEditarPedido', () => {
  test('permite actualizar el estado del pedido exitosamente', async () => {
    const mockOnEstadoActualizado = jest.fn();

    const { getByTestId, findByTestId } = render(
      <SafeAreaProvider>
        <TarjetaParaEditarPedido
          pedidoId="123"
          nombre_del_encargado="Carlos"
          fecha_de_emision={new Date('2025-10-22T10:00:00Z')}
          estado_del_pedido="en_proceso"
          precio={250}
          onEstadoActualizado={mockOnEstadoActualizado}
        />
      </SafeAreaProvider>
    );

    const botonEstado = getByTestId('boton-estado-pedido');
    fireEvent.press(botonEstado);

    const opcionCompletado = await findByTestId('opcion-completado');
    fireEvent.press(opcionCompletado);

    // Verificar que se muestra un alert de éxito
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '¡Éxito!',
        expect.stringContaining('completado'),
        expect.any(Array)
      );
    });

    // Verificar que se llamó el callback de actualización
    expect(mockOnEstadoActualizado).toHaveBeenCalled();
  });
});
