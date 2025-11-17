import { View, StyleSheet } from "react-native"
import { Text } from "@/components/ui/text"

type Props = {
  fecha_de_emision: Date
  precio: number
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

const InformacionPedido = ({ fecha_de_emision, precio }: Props) => {
  return (
    <View style={styles.contenedor}>
      {/* Aqui esta la fecha de emición y el precio del pedido*/}
      <Text style={styles.fecha}>{formatDate(fecha_de_emision)}</Text>
      <Text style={styles.precio}>${precio.toFixed(2)}</Text>
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
    fontSize: 20,
    color: "#059669",
    fontWeight: "700",
    marginTop: 4,
  },
})

export default InformacionPedido
