import { View, StyleSheet, ActivityIndicator, ScrollView, Platform } from "react-native"
import { Text } from "@/components/ui/text"
import TarjetaProducto from "./tarjetaDeProducto"
import { usarProductos } from "../hooks/usarProductos"

// Marcador de posición para la fuente
const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })
const ACCENT_COLOR = "#059669"

const ListaDeProductos = () => {
  const { productos, loading, error } = usarProductos()

  if (loading) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={ACCENT_COLOR} />
        <Text style={styles.textoCargando}>Cargando productos...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoError}>Hubo un problema al cargar los productos.</Text>
      </View>
    )
  }

  if (productos.length === 0) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoVacio}>No hay productos disponibles.</Text>
      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFDF6",
  },
  textoCargando: {
    marginTop: 15,
    color: "#6b7280",
    fontSize: 18,
    fontFamily: ShinySundayFont,
  },
  textoError: {
    color: "#ef4444",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: ShinySundayFont,
  },
  textoVacio: {
    color: "#4b5563",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: ShinySundayFont,
  },
})

export default ListaDeProductos
