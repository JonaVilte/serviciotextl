// app/(tabs)/index.tsx
import { View, StyleSheet, Platform, ActivityIndicator, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"
import { useRouter } from "expo-router"
import { usarSesion } from "@/src/pedidos/hooks/usarSesion"
import EncabezadoInicio from "@/src/pedidos/components/encabezados/encabezadoInicio"

// Reemplaza estos componentes con los tuyos o mantén los placeholders
import ListaDeProductos from "@/src/productos/components/listas/listaDeProductos"

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })
const ACCENT_COLOR = "#059669"

export default function HomeScreen() {
  const router = useRouter()
  const { usuario, cargando } = usarSesion()

  // Si está cargando, mostrar spinner
  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={ACCENT_COLOR} />
        <Text style={styles.textoCargando}>Cargando...</Text>
      </View>
    )
  }

  // Si no hay usuario (no debería pasar por el layout, pero por seguridad)
  if (!usuario) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoCargando}>No autenticado</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Encabezado con información del usuario */}
      <EncabezadoInicio 
        nombreUsuario={usuario.nombre} 
        rol="Usuario" 
      />

      <View style={styles.contenido}>
        <View style={styles.seccionTitulo}>
          <Text style={styles.titulo}>Productos</Text>
          <TouchableOpacity 
            style={styles.botonAgregar} 
            onPress={() => router.push("/agregar-producto")}
          >
            <Text style={styles.textoBotonAgregar}>+ Agregar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de productos */}
        <ListaDeProductos />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
    borderRadius: 20,
  },
  textoBotonAgregar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: ShinySundayFont,
  },
})