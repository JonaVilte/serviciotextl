import { View, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Text } from "@/components/ui/text"
import { LogOut } from "lucide-react-native"

// Marcador de posición para la fuente
const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })

type Props = {
  nombreUsuario: string
  rol?: string
  onCerrarSesion: () => void
}

const EncabezadoInicio = ({ nombreUsuario, rol = "Empleado", onCerrarSesion }: Props) => {
  // Obtener la primera letra del nombre para el avatar
  const inicial = nombreUsuario.charAt(0).toUpperCase()

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorInfo}>
        {/* Avatar circular */}
        <View style={styles.avatar}>
          <Text style={styles.textoAvatar}>{inicial}</Text>
        </View>

        {/* Información del usuario */}
        <View style={styles.textos}>
          <Text style={styles.saludo}>Bienvenido,</Text>
          <Text style={styles.nombre}>{nombreUsuario}</Text>
          <Text style={styles.rol}>{rol}</Text>
        </View>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.botonCerrarSesion} onPress={onCerrarSesion} activeOpacity={0.7}>
        <LogOut size={24} color="#ef4444" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFDF6",
  },
  contenedorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
  },
  textoAvatar: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: ShinySundayFont,
  },
  textos: {
    gap: 2,
  },
  saludo: {
    fontSize: 16,
    color: "#6b7280",
    fontFamily: ShinySundayFont,
  },
  nombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    fontFamily: ShinySundayFont,
  },
  rol: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "600",
    fontFamily: ShinySundayFont,
  },
  botonCerrarSesion: {
    padding: 8,
  },
})

export default EncabezadoInicio
