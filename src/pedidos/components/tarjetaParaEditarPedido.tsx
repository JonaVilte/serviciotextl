"use client"

import { useState } from "react"
import { View, Alert, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native"
import { Card, CardContent } from "@/components/ui/card"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import usarEstadoDelPedido from "@/src/pedidos/hooks/usarActulizarEstadoDePedido"
import usarUsuarios from "@/src/pedidos/hooks/usarUsuarios"
import actualizarClientePedido from "@/src/pedidos/hooks/usarActualizarClienteDelPedido"
import BannerPedidoEntregado from "./bannerPedidoEntregado"
import SelectorCliente from "./seleccionarCliente"
import InformacionPedido from "./informacionDelPedido"
import SelectorEstado from "./seleccionarEstado"
import BotonesAccion from "./botonesAccion"
import { DetallePedido } from "./detallePedido"
import { ModalAgregarItem } from "./modalAgregarItem"

// Habilitar LayoutAnimation en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const ACCENT_COLOR = "#059669" // color acento

type EstadoPedido = "completado" | "en_proceso" | "pendiente" | "entregado" | "cancelado"

type Props = {
  pedidoId: string
  usuario_id: string
  nombre_del_encargado: string
  fecha_de_emision: Date
  estado_del_pedido: EstadoPedido
  precio: number
  onEstadoActualizado?: () => void
  onClienteActualizado?: () => void
}

const TarjetaParaEditarPedido = ({
  pedidoId,
  usuario_id,
  nombre_del_encargado,
  fecha_de_emision,
  estado_del_pedido,
  precio,
  onEstadoActualizado,
  onClienteActualizado,
}: Props) => {
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  }

  const [estadoActual, setEstadoActual] = useState<EstadoPedido>(estado_del_pedido)
  const [clienteActual, setClienteActual] = useState({
    id: usuario_id,
    nombre: nombre_del_encargado,
  })
  const [expandido, setExpandido] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [dropdownAbierto, setDropdownAbierto] = useState(false)
  const [dropdownClienteAbierto, setDropdownClienteAbierto] = useState(false)

  const { actualizarEstado, cargando, error } = usarEstadoDelPedido()
  const { usuarios, cargando: cargandoUsuarios } = usarUsuarios()
  const { actualizarCliente, cargando: cargandoCliente, error: errorCliente } = actualizarClientePedido()

  const pedidoEntregado = estadoActual === "entregado"

  const manejarToggleExpandido = () => {
    // Animación nativa de expansión/colapso
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpandido((prev) => !prev)
  }

  const manejarCambioEstado = async (nuevoEstado: EstadoPedido) => {
    setDropdownAbierto(false)

    if (pedidoEntregado) {
      return Alert.alert("Pedido Entregado", "No se puede modificar el estado de un pedido que ya fue entregado.", [
        { text: "Entendido" },
      ])
    }

    const exito = await actualizarEstado(pedidoId, nuevoEstado)

    if (exito) {
      setEstadoActual(nuevoEstado)
      Alert.alert("¡Éxito!", `El estado del pedido se actualizó a "${nuevoEstado}"`, [{ text: "OK" }])
      onEstadoActualizado?.()
    } else {
      Alert.alert("Error", error || "No se pudo actualizar el estado del pedido", [{ text: "OK" }])
    }
  }

  const manejarCambioCliente = async (nuevoUsuarioId: string, nuevoNombre: string) => {
    if (pedidoEntregado) {
      return Alert.alert("Pedido Entregado", "No se puede modificar el cliente de un pedido que ya fue entregado.", [
        { text: "Entendido" },
      ])
    }

    const exito = await actualizarCliente(pedidoId, nuevoUsuarioId)

    if (exito) {
      setClienteActual({ id: nuevoUsuarioId, nombre: nuevoNombre })
      Alert.alert("¡Éxito!", `El cliente del pedido se actualizó a "${nuevoNombre}"`, [{ text: "OK" }])
      onClienteActualizado?.()
    } else {
      Alert.alert("Error", errorCliente || "No se pudo actualizar el cliente del pedido", [{ text: "OK" }])
    }
  }

  const manejarItemAgregado = () => {
    onEstadoActualizado?.()
  }

  return (
    <Card style={[styles.tarjeta, (dropdownAbierto || dropdownClienteAbierto) && { zIndex: 9999 }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={manejarToggleExpandido}>
        <CardContent style={styles.contenido}>
          {pedidoEntregado && <BannerPedidoEntregado />}

          <SelectorCliente
            clienteActual={clienteActual}
            usuarios={usuarios}
            cargandoCliente={cargandoCliente}
            cargandoUsuarios={cargandoUsuarios}
            pedidoEntregado={pedidoEntregado}
            contentInsets={contentInsets}
            onCambiarCliente={manejarCambioCliente}
            onDropdownChange={setDropdownClienteAbierto}
          />

          <InformacionPedido fecha_de_emision={fecha_de_emision} precio={precio} />

          <View style={styles.contenedorInferior}>
            <SelectorEstado
              estadoActual={estadoActual}
              cargando={cargando}
              pedidoEntregado={pedidoEntregado}
              contentInsets={contentInsets}
              onCambiarEstado={manejarCambioEstado}
              onDropdownChange={setDropdownAbierto}
            />

            <BotonesAccion pedidoEntregado={pedidoEntregado} />
          </View>

          {expandido && <DetallePedido pedidoId={pedidoId} />}

          {/* CONTENEDOR DEL BOTÓN: dentro del flujo del contenido (no absoluto),
              así nunca tapa al detalle del pedido */}
          {expandido && (
            <View style={styles.contenedorAgregarItem}>
              <TouchableOpacity
                style={[styles.botonAgregarItem, pedidoEntregado && styles.botonDeshabilitado]}
                onPress={() => setModalVisible(true)}
                disabled={pedidoEntregado}
                activeOpacity={0.8}
              >
                <View style={[styles.iconoMas, pedidoEntregado && styles.iconoDeshabilitado]}>
                  <View style={styles.masHorizontal} />
                  <View style={styles.masVertical} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </CardContent>
      </TouchableOpacity>

      <ModalAgregarItem
        visible={modalVisible}
        pedidoId={pedidoId}
        onClose={() => setModalVisible(false)}
        onItemAgregado={manejarItemAgregado}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  tarjeta: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  contenido: {
    padding: 20,
    gap: 14,
  },
  contenedorInferior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },

  /* --- nuevo contenedor para el botón --- */
  contenedorAgregarItem: {
    marginTop: 12,
    // lo alineamos a la derecha dentro del flujo del contenido
    alignItems: "flex-end",
  },

  botonAgregarItem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  botonDeshabilitado: {
    backgroundColor: "#9ca3af",
  },

  iconoMas: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconoDeshabilitado: {
    opacity: 0.4,
  },
  masHorizontal: {
    position: "absolute",
    width: 20,
    height: 3,
    backgroundColor: "#FFFDF6",
    borderRadius: 2,
  },
  masVertical: {
    position: "absolute",
    width: 3,
    height: 20,
    backgroundColor: "#FFFDF6",
    borderRadius: 2,
  },
})

export default TarjetaParaEditarPedido
