import { View, StyleSheet } from "react-native"
import { Text } from "@/components/ui/text"

type Props = {
  fecha_de_emision: Date
  precio: number
}

const InformacionPedido = ({ fecha_de_emision, precio }: Props) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.fecha}>Fecha de Emisión: {fecha_de_emision.toLocaleString()}</Text>
      <Text style={styles.precio}>Precio del Pedido: {precio.toFixed(2)}$</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 8,
  },
  fecha: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "600",
    marginTop: -4,
  },
  precio: {
    fontSize: 32,
    color: "#059669",
    fontWeight: "700",
    marginTop: 4,
  },
})

export default InformacionPedido
