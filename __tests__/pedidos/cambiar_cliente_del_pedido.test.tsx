import { render, fireEvent, waitFor } from "@testing-library/react-native"
import TarjetaParaEditarPedido from "@/src/pedidos/components/tarjetaParaEditarPedido"
import actualizarClientePedido from "@/src/pedidos/hooks/actualizarClienteDelPedido"
import usarUsuarios from "@/src/pedidos/hooks/usuarios"

jest.mock("@/src/pedidos/hooks/usuarios")
jest.mock("@/src/pedidos/hooks/actualizarClienteDelPedido")

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}))

// Mock del DropdownMenu para que funcione 
jest.mock("@/components/ui/dropdown-menu", () => {
  const { View, TouchableOpacity } = require("react-native")
  return {
    DropdownMenu: ({ children }: any) => <View>{children}</View>,
    DropdownMenuTrigger: ({ children }: any) => <View>{children}</View>,
    DropdownMenuContent: ({ children }: any) => <View testID="dropdown-content">{children}</View>,
    DropdownMenuGroup: ({ children }: any) => <View>{children}</View>,
    DropdownMenuItem: ({ children, onPress, testID }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID}>
        {children}
      </TouchableOpacity>
    ),
  }
})

describe("Como encargado de ventas de una tienda de ropa (textil), quiero poder cambiar el cliente de un pedido", () => {
  const mockActualizarCliente = jest.fn()
  const mockOnClienteActualizado = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(usarUsuarios as jest.Mock).mockReturnValue({
      usuarios: [
        { id: "1", nombre: "Carlos", email: "carlos@mail.com" },
        { id: "2", nombre: "Lucía", email: "lucia@mail.com" },
      ],
      cargando: false,
    })

    // Mock del hook de actualización de cliente
    ;(actualizarClientePedido as jest.Mock).mockReturnValue({
      actualizarCliente: mockActualizarCliente,
      cargando: false,
      error: null,
    })
  })

  test("Permite cambiar el cliente asociado al pedido", async () => {
    mockActualizarCliente.mockResolvedValue(true)

    const { getByTestId } = render(
      <TarjetaParaEditarPedido
        pedidoId="123"
        usuario_id="1"
        nombre_del_encargado="Carlos"
        fecha_de_emision={new Date("2025-10-22T10:00:00Z")}
        estado_del_pedido="pendiente"
        precio={500}
        onClienteActualizado={mockOnClienteActualizado}
      />
    )

    const botonCliente = getByTestId("boton-cambiar-cliente")
    fireEvent.press(botonCliente)

    const opcionLucia = getByTestId("opcion-cliente-2")
    fireEvent.press(opcionLucia)

    await waitFor(() => {
      expect(mockActualizarCliente).toHaveBeenCalledWith("123", "2")
    })

    // Verificar que se ejecuta el callback de actualización
    expect(mockOnClienteActualizado).toHaveBeenCalledTimes(1)
  })
})
