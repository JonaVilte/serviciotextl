"use client"

import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"
import { useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import FormularioProducto from "@/src/pedidos/components/formularioProducto"

export default function AgregarProductoScreen() {
  const router = useRouter()

  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botonFlecha} onPress={() => router.push("/(tabs)")}>
          <ArrowLeft size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Agregar Producto</Text>
      </View>

      <FormularioProducto />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#059669",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  botonFlecha: {
    marginRight: 16,
  },
  tituloHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
})
