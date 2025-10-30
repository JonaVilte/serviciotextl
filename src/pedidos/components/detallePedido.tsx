import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { usarDetallesPedido } from "../hooks/detallesPedido"
import { ItemPedido } from "./itemPedido"

type Props = {
  pedidoId: string
}

export function DetallePedido({ pedidoId }: Props) {
  const { detalles, loading, error } = usarDetallesPedido(pedidoId)

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    )
  }

  if (detalles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay items en este pedido</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalle del Pedido</Text>
      <ScrollView style={styles.listaContainer}>
        {detalles.map((item) => (
          <ItemPedido
            key={item.id}
            nombre={item.producto_nombre}
            descripcion={item.producto_descripcion}
            talla={item.producto_talla}
            color={item.producto_color}
            cantidad={item.cantidad}
            precioUnitario={item.precio_unitario}
            subtotal={item.subtotal}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  listaContainer: {
    maxHeight: 300,
  },
  centerContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
  },
  emptyText: {
    color: "#9ca3af",
    fontSize: 14,
  },
})
