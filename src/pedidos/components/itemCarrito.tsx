import { View, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Text } from "@/components/ui/text"
import { Minus, Plus, Trash2 } from "lucide-react-native"

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })

type ItemCarritoProps = {
  nombre: string
  precio: number
  cantidad: number
  onIncrementar: () => void
  onDecrementar: () => void
  onEliminar: () => void
}

export default function ItemCarrito({
  nombre,
  precio,
  cantidad,
  onIncrementar,
  onDecrementar,
  onEliminar,
}: ItemCarritoProps) {
  const subtotal = precio * cantidad

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.calculo}>
          ${precio.toFixed(2)} x {cantidad} = ${subtotal.toFixed(2)}
        </Text>
      </View>
      <View style={styles.controles}>
        <TouchableOpacity style={styles.botonControl} onPress={onDecrementar}>
          <Minus color="#6b7280" size={20} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.cantidad}>{cantidad}</Text>
        <TouchableOpacity style={styles.botonControl} onPress={onIncrementar}>
          <Plus color="#6b7280" size={20} strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonEliminar} onPress={onEliminar}>
          <Trash2 color="#ef4444" size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    fontFamily: ShinySundayFont,
    marginBottom: 4,
  },
  calculo: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: ShinySundayFont,
  },
  controles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  botonControl: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  cantidad: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    fontFamily: ShinySundayFont,
    minWidth: 20,
    textAlign: "center",
  },
  botonEliminar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
})
