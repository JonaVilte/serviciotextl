import { useState } from "react"
import { View, Alert, StyleSheet } from "react-native"
import { Card, CardContent } from "@/components/ui/card"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import actualizarEstadoPedido from "@/src/pedidos/hooks/actulizarEstadoDePedido"
import usarUsuarios from "@/src/pedidos/hooks/usuarios"
import actualizarClientePedido from "@/src/pedidos/hooks/actualizarClienteDelPedido"
import BannerPedidoEntregado from "./bannerPedidoEntregado"
import SelectorCliente from "./seleccionarCliente"
import InformacionPedido from "./informacionDelPedido"
import SelectorEstado from "./seleccionarEstado"
import BotonesAccion from "./botonesAccion"

type Props = {
  pedidoId: string
  usuario_id: string
  nombre_del_encargado: string
  fecha_de_emision: Date
  estado_del_pedido: "completado" | "en_proceso" | "pendiente" | "entregado" | "cancelado"
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

  const [estadoActual, setEstadoActual] = useState(estado_del_pedido)
  const [clienteActual, setClienteActual] = useState({
    id: usuario_id,
    nombre: nombre_del_encargado,
  })

  const { actualizarEstado, cargando, error } = actualizarEstadoPedido()
  const { usuarios, cargando: cargandoUsuarios } = usarUsuarios()
  const { actualizarCliente, cargando: cargandoCliente, error: errorCliente } = actualizarClientePedido()

  const pedidoEntregado = estadoActual === "entregado"

  const manejarCambioEstado = async (
    nuevoEstado: "completado" | "en_proceso" | "pendiente" | "entregado" | "cancelado",
  ) => {
    if (pedidoEntregado) {
      Alert.alert("Pedido Entregado", "No se puede modificar el estado de un pedido que ya fue entregado.", [
        { text: "Entendido" },
      ])
      return
    }

    const exito = await actualizarEstado(pedidoId, nuevoEstado)

    if (exito) {
      setEstadoActual(nuevoEstado)
      Alert.alert("¡Éxito!", `El estado del pedido se actualizó a "${nuevoEstado}"`, [{ text: "OK" }])
      if (onEstadoActualizado) {
        onEstadoActualizado()
      }
    } else {
      Alert.alert("Error", error || "No se pudo actualizar el estado del pedido", [{ text: "OK" }])
    }
  }

  const manejarCambioCliente = async (nuevoUsuarioId: string, nuevoNombre: string) => {
    if (pedidoEntregado) {
      Alert.alert("Pedido Entregado", "No se puede modificar el cliente de un pedido que ya fue entregado.", [
        { text: "Entendido" },
      ])
      return
    }

    const exito = await actualizarCliente(pedidoId, nuevoUsuarioId)

    if (exito) {
      setClienteActual({ id: nuevoUsuarioId, nombre: nuevoNombre })
      Alert.alert("¡Éxito!", `El cliente del pedido se actualizó a "${nuevoNombre}"`, [{ text: "OK" }])
      if (onClienteActualizado) {
        onClienteActualizado()
      }
    } else {
      Alert.alert("Error", errorCliente || "No se pudo actualizar el cliente del pedido", [{ text: "OK" }])
    }
  }

  return (
    <Card style={styles.tarjeta}>
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
        />

        <InformacionPedido fecha_de_emision={fecha_de_emision} precio={precio} />

        <View style={styles.contenedorInferior}>
          <SelectorEstado
            estadoActual={estadoActual}
            cargando={cargando}
            pedidoEntregado={pedidoEntregado}
            contentInsets={contentInsets}
            onCambiarEstado={manejarCambioEstado}
          />

          <BotonesAccion pedidoEntregado={pedidoEntregado} />
        </View>
      </CardContent>
    </Card>
  )
}

const styles = StyleSheet.create({
  tarjeta: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    padding: 0,
  },
  contenido: {
    padding: 20,
    gap: 12,
  },
  contenedorInferior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
})

export default TarjetaParaEditarPedido
