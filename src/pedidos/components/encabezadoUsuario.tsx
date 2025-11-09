import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { LogOut } from "lucide-react-native"

type Usuario = {
  id: string
  nombre: string
  email: string
}

interface EncabezadoUsuarioProps {
  usuario: Usuario | null
  onCerrarSesion: () => void
}

const EncabezadoUsuario: React.FC<EncabezadoUsuarioProps> = ({ usuario, onCerrarSesion }) => {
  return (
    <View style={styles.header}>
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{usuario?.nombre?.charAt(0).toUpperCase() || "U"}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Bienvenido,</Text>
          <Text style={styles.userName}>{usuario?.nombre || "Usuario"}</Text>
          <Text style={styles.userRole}>Empleado</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={onCerrarSesion}>
        <LogOut color="#EF4444" size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: "#6B7280",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  userRole: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "600",
  },
  logoutButton: {
    padding: 8,
  },
})

export default EncabezadoUsuario
