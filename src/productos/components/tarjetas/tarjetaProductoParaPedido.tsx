import { View, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Text } from "@/components/ui/text"
import { Plus } from "lucide-react-native"

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })

type TarjetaProductoParaPedidoProps = {
  nombre: string
  descripcion: string
  precio: number
  stock: number
  onAgregar: () => void
}

export default function TarjetaProductoParaPedido({
  nombre,
  descripcion,
  precio,
  stock,
  onAgregar,
}: TarjetaProductoParaPedidoProps) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.contenido}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.precio}>${precio.toFixed(2)}</Text>
          <Text style={styles.stock}>Stock: {stock}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.botonAgregar} onPress={onAgregar}>
        <Plus color="#FFFDF6" size={24} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contenido: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    fontFamily: ShinySundayFont,
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: ShinySundayFont,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  precio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
    fontFamily: ShinySundayFont,
  },
  stock: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: ShinySundayFont,
  },
  botonAgregar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
})
