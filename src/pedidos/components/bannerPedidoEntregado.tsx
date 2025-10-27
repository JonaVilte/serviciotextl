import { View, StyleSheet } from "react-native"
import { Text } from "@/components/ui/text"

const BannerPedidoEntregado = () => {
  return (
    <View style={styles.bannerEntregado}>
      <View style={styles.filaIcono}>
        <View style={styles.iconoCheck}>
          <Text style={styles.textoCheck}>✓</Text>
        </View>
        <Text style={styles.tituloEntregado}>Pedido Entregado</Text>
      </View>
      <Text style={styles.mensajeEntregado}>Este pedido ya fue entregado y no puede ser modificado.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bannerEntregado: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#fbbf24",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  filaIcono: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconoCheck: {
    width: 20,
    height: 20,
    backgroundColor: "#f59e0b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textoCheck: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  tituloEntregado: {
    fontSize: 13,
    fontWeight: "700",
    color: "#92400e",
  },
  mensajeEntregado: {
    fontSize: 11,
    color: "#92400e",
    marginTop: 4,
    marginLeft: 28,
  },
})

export default BannerPedidoEntregado
