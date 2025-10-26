import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TarjetaParaEditarPedido from '@/src/pedidos/components/tarjetaParaEditarPedido';
import actualizarEstadoPedido from '@/src/pedidos/hooks/actulizarEstadoDePedido';

jest.mock("@/src/pedidos/hooks/actulizarEstadoDePedido")

// Mock de useSafeAreaInsets
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}))

// Mock del DropdownMenu para que funcione en tests
jest.mock("@/components/ui/dropdown-menu", () => {
  const { View, TouchableOpacity } = require("react-native")
  return {
    DropdownMenu: ({ children }: any) => <View>{children}</View>,
    DropdownMenuTrigger: ({ children, asChild }: any) => <View>{children}</View>,
    DropdownMenuContent: ({ children }: any) => <View testID="dropdown-content">{children}</View>,
    DropdownMenuGroup: ({ children }: any) => <View>{children}</View>,
    DropdownMenuItem: ({ children, onPress, testID }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID}>
        {children}
      </TouchableOpacity>
    ),
  }
})

describe('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {

        const mockActualizarEstado = jest.fn()
        const mockOnEstadoActualizado = jest.fn();

        jest.clearAllMocks()
        // Mock del hook de actualización de estado
        ;(actualizarEstadoPedido as jest.Mock).mockReturnValue({
            actualizarEstado: mockActualizarEstado,
            cargando: false,
            error: null,})
    

    test('Poder actualizar el estado del pedido', async () => {
        mockActualizarEstado.mockResolvedValue(true)

        const { getByTestId } = render(
        <TarjetaParaEditarPedido
            usuario_id='1'
            pedidoId="123"
            nombre_del_encargado="Carlos"
            fecha_de_emision={new Date('2025-10-22T10:00:00Z')}
            estado_del_pedido="en_proceso"
            precio={250}
            onEstadoActualizado={mockOnEstadoActualizado}
        />
    );
    
    const opcionCompletado = getByTestId('opcion-entregado');
    fireEvent.press(opcionCompletado);
        await waitFor(() => {
        expect(mockActualizarEstado).toHaveBeenCalledWith("123", "entregado")
    })
    // Verificar que se llamó el callback de actualización
    expect(mockOnEstadoActualizado).toHaveBeenCalledTimes(1);
    });
});