"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native"
import { usarProductos } from "../hooks/productos"
import { agregarItemPedido } from "../hooks/agregarItemPedido"

type Props = {
  visible: boolean
  pedidoId: string
  onClose: () => void
  onItemAgregado: () => void
}

export function ModalAgregarItem({ visible, pedidoId, onClose, onItemAgregado }: Props) {
  const { productos, loading: loadingProductos } = usarProductos()
  const { agregar, loading: agregando } = agregarItemPedido()
  const [productoSeleccionado, setProductoSeleccionado] = useState<string | null>(null)
  const [cantidad, setCantidad] = useState("1")
  const [mostrarProductos, setMostrarProductos] = useState(false)

  const productoActual = productos.find((p) => p.id === productoSeleccionado)

  const handleAgregar = async () => {
    if (!productoSeleccionado || !cantidad) return

    const cantidadNum = Number.parseInt(cantidad)
    if (isNaN(cantidadNum) || cantidadNum <= 0) return

    const producto = productos.find((p) => p.id === productoSeleccionado)
    if (!producto) return

    const exito = await agregar(pedidoId, productoSeleccionado, cantidadNum, producto.precio)

    if (exito) {
      setProductoSeleccionado(null)
      setCantidad("1")
      onItemAgregado()
      onClose()
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>Agregar Producto al Pedido</Text>

          {loadingProductos ? (
            <ActivityIndicator size="large" color="#3b82f6" />
          ) : (
            <>
              <TouchableOpacity style={styles.selector} onPress={() => setMostrarProductos(!mostrarProductos)}>
                <Text style={styles.selectorText}>
                  {productoActual ? productoActual.nombre : "Seleccionar producto"}
                </Text>
                <Text style={styles.chevron}>{mostrarProductos ? "▲" : "▼"}</Text>
              </TouchableOpacity>

              {mostrarProductos && (
                <ScrollView style={styles.listaProductos}>
                  {productos.map((producto) => (
                    <TouchableOpacity
                      key={producto.id}
                      style={styles.productoItem}
                      onPress={() => {
                        setProductoSeleccionado(producto.id)
                        setMostrarProductos(false)
                      }}
                    >
                      <View>
                        <Text style={styles.productoNombre}>{producto.nombre}</Text>
                        <Text style={styles.productoDetalle}>
                          {producto.talla} - {producto.color}
                        </Text>
                      </View>
                      <Text style={styles.productoPrecio}>${producto.precio.toFixed(2)}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              {productoActual && (
                <View style={styles.infoProducto}>
                  <Text style={styles.infoLabel}>Precio unitario:</Text>
                  <Text style={styles.infoPrecio}>${productoActual.precio.toFixed(2)}</Text>
                  <Text style={styles.infoStock}>Stock disponible: {productoActual.stock}</Text>
                </View>
              )}

              <View style={styles.cantidadContainer}>
                <Text style={styles.label}>Cantidad:</Text>
                <TextInput
                  style={styles.input}
                  value={cantidad}
                  onChangeText={setCantidad}
                  keyboardType="numeric"
                  placeholder="1"
                />
              </View>

              <View style={styles.botonesContainer}>
                <TouchableOpacity style={[styles.boton, styles.botonCancelar]} onPress={onClose} disabled={agregando}>
                  <Text style={styles.botonCancelarText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.boton,
                    styles.botonAgregar,
                    (!productoSeleccionado || agregando) && styles.botonDeshabilitado,
                  ]}
                  onPress={handleAgregar}
                  disabled={!productoSeleccionado || agregando}
                >
                  {agregando ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.botonAgregarText}>Agregar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectorText: {
    fontSize: 14,
    color: "#111827",
  },
  chevron: {
    fontSize: 12,
    color: "#6b7280",
  },
  listaProductos: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 12,
  },
  productoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  productoNombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  productoDetalle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  productoPrecio: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3b82f6",
  },
  infoProducto: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  infoPrecio: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginVertical: 4,
  },
  infoStock: {
    fontSize: 12,
    color: "#6b7280",
  },
  cantidadContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  botonesContainer: {
    flexDirection: "row",
    gap: 12,
  },
  boton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botonCancelar: {
    backgroundColor: "#f3f4f6",
  },
  botonCancelarText: {
    color: "#374151",
    fontWeight: "600",
  },
  botonAgregar: {
    backgroundColor: "#3b82f6",
  },
  botonAgregarText: {
    color: "#fff",
    fontWeight: "600",
  },
  botonDeshabilitado: {
    backgroundColor: "#9ca3af",
  },
})
