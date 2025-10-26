"use client"

import { useState } from "react"
import { View, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from "react-native"
import { Card, CardContent } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import actualizarEstadoPedido from "@/src/pedidos/hooks/actulizarEstadoDePedido"
import usarUsuarios from "@/src/pedidos/hooks/usuarios"
import actualizarClientePedido from "@/src/pedidos/hooks/actualizarClienteDelPedido"
import { Colors } from "@/constants/colors"

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

  const formatearFecha = (fecha: Date) => {
    const dia = fecha.getDate()
    const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
    const mes = meses[fecha.getMonth()]
    const año = fecha.getFullYear()
    const horas = fecha.getHours().toString().padStart(2, "0")
    const minutos = fecha.getMinutes().toString().padStart(2, "0")
    return `${dia} ${mes} ${año}, ${horas}:${minutos}`
  }

  return (
    <Card style={styles.tarjeta}>
      <CardContent style={styles.contenido}>
        {pedidoEntregado && (
          <View style={styles.bannerEntregado}>
            <View style={styles.filaIcono}>
              <View style={styles.iconoCheck}>
                <Text style={styles.textoCheck}>✓</Text>
              </View>
              <Text style={styles.tituloEntregado}>Pedido Entregado</Text>
            </View>
            <Text style={styles.mensajeEntregado}>Este pedido ya fue entregado y no puede ser modificado.</Text>
          </View>
        )}

        <View style={styles.contenedorCliente}>
          <Text style={styles.etiquetaCliente}>Pedido de 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TouchableOpacity
                testID="boton-cambiar-cliente"
                style={styles.botonCliente}
                disabled={cargandoCliente || cargandoUsuarios || pedidoEntregado}
              >
                {cargandoCliente ? (
                  <ActivityIndicator size="small" color="#059669" />
                ) : (
                  <View style={styles.filaCliente}>
                    <Text style={styles.textoCliente}>{clienteActual.nombre}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </DropdownMenuTrigger>

            {!pedidoEntregado && (
              <DropdownMenuContent insets={contentInsets} sideOffset={2} className="w-64" align="start">
                <DropdownMenuGroup>
                  {usuarios.map((usuario) => (
                    <DropdownMenuItem
                      key={usuario.id}
                      onPress={() => manejarCambioCliente(usuario.id, usuario.nombre)}
                      testID={`opcion-cliente-${usuario.id}`}
                    >
                      <View style={styles.itemMenuCliente}>
                        <Text style={styles.textoMenuCliente}>{usuario.nombre}</Text>
                        <Text style={styles.emailCliente}>{usuario.email}</Text>
                      </View>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
          </Text>
        </View>

        <Text style={styles.fecha}>Fecha de Emisión: {fecha_de_emision.toLocaleString()}</Text>

        <Text style={styles.precio}>Precio del Pedido: {precio.toFixed(2)}$</Text>

        <View style={styles.contenedorInferior}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TouchableOpacity
                testID="boton-estado-pedido"
                style={[styles.statusBadge, { backgroundColor: getStatusColor(estado_del_pedido) + "20" }]}
                disabled={cargando || pedidoEntregado}
              >
                {cargando ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <View style={styles.filaBadge}>
                    <Text style={[styles.statusText, { color: getStatusColor(estado_del_pedido) }]}>
                      {estadoActual === "en_proceso"
                        ? "En Proceso"
                        : estadoActual.charAt(0).toUpperCase() + estadoActual.slice(1)}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </DropdownMenuTrigger>

            {!pedidoEntregado && (
              <DropdownMenuContent insets={contentInsets} sideOffset={2} className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem onPress={() => manejarCambioEstado("pendiente")} testID="opcion-pendiente">
                    <View style={styles.itemMenu}>
                      <View />
                      <Text style={styles.textoMenu}>pendiente</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem onPress={() => manejarCambioEstado("en_proceso")} testID="opcion-en_proceso">
                    <View style={styles.itemMenu}>
                      <View />
                      <Text style={styles.textoMenu}>en proceso</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem onPress={() => manejarCambioEstado("cancelado")} testID="opcion-cancelado">
                    <View style={styles.itemMenu}>
                      <View />
                      <Text style={styles.textoMenu}>cancelado</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem onPress={() => manejarCambioEstado("completado")} testID="opcion-completado">
                    <View style={styles.itemMenu}>
                      <View />
                      <Text style={styles.textoMenu}>completado</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem onPress={() => manejarCambioEstado("entregado")} testID="opcion-entregado">
                    <View style={styles.itemMenu}>
                      <View />
                      <Text style={styles.textoMenu}>entregado</Text>
                    </View>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          <View style={styles.botonesAccion}>
            <TouchableOpacity style={styles.botonIcono} disabled={pedidoEntregado}>
              <Text style={styles.iconoEditar}>✎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonIcono}>
              <Text style={styles.iconoChevron}>⌄</Text>
            </TouchableOpacity>
          </View>
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
  contenedorCliente: {
    gap: 6,
  },
  etiquetaCliente: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  botonCliente: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  filaCliente: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoCliente: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "600",
  },
  iconoChevronAbajo: {
    fontSize: 12,
    color: "#6b7280",
  },
  itemMenuCliente: {
    paddingVertical: 4,
  },
  textoMenuCliente: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
  emailCliente: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
  paraNombre: {
    fontSize: 16,
    color: "#9ca3af",
    fontWeight: "400",
  },
  fecha: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "600",
    marginTop: -4,
  },
  precio: {
    fontSize: 32,
    color: "#059669",
    fontWeight: "700",
    marginTop: 4,
  },
  contenedorInferior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  badgeEstado: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 130,
  },
  filaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconoRefresh: {
    fontSize: 16,
    color: "#059669",
    fontWeight: "600",
  },
  textoEstado: {
    fontSize: 14,
    fontWeight: "600",
  },
  botonesAccion: {
    flexDirection: "row",
    gap: 8,
  },
  botonIcono: {
    width: 44,
    height: 44,
    backgroundColor: "#d1fae5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconoEditar: {
    fontSize: 18,
    color: "#059669",
  },
  iconoChevron: {
    fontSize: 20,
    color: "#6b7280",
  },
  itemMenu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 6,
  },
  indicadorEstado: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  textoMenu: {
    fontSize: 15,
    color: "#374151",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
})

const statusOptions = [
  { key: "pendiente", label: "Pendiente", color: Colors.secondary },
  { key: "en_proceso", label: "En Proceso", color: Colors.primary },
  { key: "completado", label: "Completado", color: Colors.accent },
  { key: "cancelado", label: "Cancelado", color: Colors.destructive },
  { key: "entregado", label: "Entregado", color: Colors.entregado },
]

const getStatusColor = (status: string) => {
  const statusOption = statusOptions.find((option) => option.key === status)
  return statusOption?.color || Colors.foreground
}

export default TarjetaParaEditarPedido
