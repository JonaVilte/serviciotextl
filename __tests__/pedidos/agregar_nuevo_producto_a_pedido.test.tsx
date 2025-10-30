import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { ModalAgregarItem } from "@/src/pedidos/components/modalAgregarItem"

jest.mock("@/src/pedidos/hooks/productos", () => ({
  usarProductos: () => ({
    loading: false,
    productos: [
      { id: "1", nombre: "Producto A", precio: 1000, stock: 10, talla: "M", color: "Rojo" },
    ],
  }),
}))

jest.mock("@/src/pedidos/hooks/agregarItemPedido", () => ({
  agregarItemPedido: () => ({
    agregar: jest.fn().mockResolvedValue(true),
    loading: false,
  }),
}))

describe("Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.", () => {
  it("Es posible agregar nuevos ítems al pedido", async () => {
    const onClose = jest.fn()
    const onItemAgregado = jest.fn()

    const { getByText } = render(
      <ModalAgregarItem
        visible
        pedidoId="pedido-123"
        onClose={onClose}
        onItemAgregado={onItemAgregado}
      />
    )

    fireEvent.press(getByText("Seleccionar producto"))

    await waitFor(() => expect(getByText("Producto A")).toBeTruthy())
    fireEvent.press(getByText("Producto A"))

    fireEvent.press(getByText("Agregar"))

    await waitFor(() => {
      expect(onItemAgregado).toHaveBeenCalled()
      expect(onClose).toHaveBeenCalled()
    })
  })
})
