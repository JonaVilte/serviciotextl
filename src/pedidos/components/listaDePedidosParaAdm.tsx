"use client"

import { View, StyleSheet, ActivityIndicator, ScrollView, Platform, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"
import usarPedidos from "@/src/pedidos/hooks/usarIndex"
import TarjetaParaEditarPedido from "./tarjetaParaEditarPedido"
import { useRouter } from "expo-router"
import { Plus } from "lucide-react-native"

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })
const ACCENT_COLOR = "#059669"

const ListaDePedidosAdmin = () => {
  const { pedidos, error, loading, recargarPedidos } = usarPedidos()
  const router = useRouter()

  if (loading) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={ACCENT_COLOR} />
        <Text style={styles.textoCargando}>Cargando pedidos...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoError}>Hubo un problema al cargar los pedidos.</Text>
      </View>
    )
  }
  const listaPedidos = pedidos()

  if (listaPedidos.length === 0) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoVacio}>No hay pedidos registrados. ¡Todo al día!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.lista}>
        {listaPedidos.map((pedido) => (
          <TarjetaParaEditarPedido
            key={pedido.id}
            pedidoId={pedido.id}
            usuario_id={pedido.usuario_id}
            nombre_del_encargado={pedido.usuario_nombre}
            fecha_de_emision={new Date(pedido.fecha_emision)}
            estado_del_pedido={pedido.estado as "completado" | "en_proceso" | "cancelado" | "entregado" | "pendiente"}
            precio={pedido.total}
            onEstadoActualizado={recargarPedidos}
            onClienteActualizado={recargarPedidos}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.botonFlotante} onPress={() => router.push("/crear-pedido")} activeOpacity={0.8}>
        <Plus color="#FFFDF6" size={32} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF6",
  },
  lista: {
    padding: 16,
    gap: 12,
    backgroundColor: "#FFFDF6",
  },
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
  botonFlotante: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
})

export default ListaDePedidosAdmin
