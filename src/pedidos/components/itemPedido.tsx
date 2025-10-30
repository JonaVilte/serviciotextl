import { View, Text, StyleSheet } from "react-native"

type Props = {
  nombre: string
  descripcion: string
  talla: string
  color: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

export function ItemPedido({ nombre, descripcion, talla, color, cantidad, precioUnitario, subtotal }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
        <View style={styles.detallesContainer}>
          <Text style={styles.detalle}>Talla: {talla}</Text>
          <Text style={styles.detalle}>Color: {color}</Text>
        </View>
      </View>
      <View style={styles.preciosContainer}>
        <Text style={styles.cantidad}>x{cantidad}</Text>
        <Text style={styles.precio}>${precioUnitario.toFixed(2)}</Text>
        <Text style={styles.subtotal}>${subtotal.toFixed(2)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  nombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
  detallesContainer: {
    flexDirection: "row",
    gap: 12,
  },
  detalle: {
    fontSize: 11,
    color: "#9ca3af",
  },
  preciosContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  cantidad: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  precio: {
    fontSize: 12,
    color: "#6b7280",
  },
  subtotal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
})
