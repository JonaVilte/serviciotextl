import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"

type Props = {
  pedidoEntregado: boolean
  onEditar?: () => void
  onMostrarDetalles?: () => void
}

const BotonesAccion = ({ pedidoEntregado, onEditar, onMostrarDetalles }: Props) => {
  return (
    <View style={styles.botonesAccion}>
      <TouchableOpacity style={styles.botonIcono} disabled={pedidoEntregado} onPress={onEditar}>
        <Text style={styles.iconoEditar}>✎</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonIcono} onPress={onMostrarDetalles}>
        <Text style={styles.iconoChevron}>⌄</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  botonesAccion: {
    flexDirection: "row",
    gap: 8,
  },
  botonIcono: {
    width: 44,
    height: 44,
    backgroundColor: "#d1fae5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconoEditar: {
    fontSize: 18,
    color: "#059669",
  },
  iconoChevron: {
    fontSize: 20,
    color: "#6b7280",
  },
})

export default BotonesAccion
