import { View, StyleSheet, Platform, ActivityIndicator, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"
import EncabezadoUsuario from "@/src/pedidos/components/encabezadoUsuario"
import ListaDeProductos from "@/src/pedidos/components/listaDeProductos"
import { usarSesion } from "@/src/pedidos/hooks/usarSesion"

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })
const ACCENT_COLOR = "#059669"

export default function HomeScreen() {
  const { usuario, cargando, cerrarSesion } = usarSesion()

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={ACCENT_COLOR} />
        <Text style={styles.textoCargando}>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <EncabezadoUsuario usuario={usuario} onCerrarSesion={cerrarSesion} />

      <View style={styles.contenido}>
        <View style={styles.seccionTitulo}>
          <Text style={styles.titulo}>Productos</Text>
          <TouchableOpacity style={styles.botonAgregar}>
            <Text style={styles.textoBotonAgregar}>+ Agregar</Text>
          </TouchableOpacity>
        </View>

        <ListaDeProductos />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF6",
  },
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFDF6",
  },
  textoCargando: {
    marginTop: 15,
    color: "#6b7280",
    fontSize: 16,
    fontFamily: ShinySundayFont,
  },
  contenido: {
    flex: 1,
    padding: 16,
  },
  seccionTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    fontFamily: ShinySundayFont,
  },
  botonAgregar: {
    backgroundColor: ACCENT_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textoBotonAgregar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: ShinySundayFont,
  },
})
