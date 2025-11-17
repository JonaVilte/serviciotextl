"use client"

import { useState } from "react"
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native"
import { Text } from "@/components/ui/text"

type Usuario = {
  id: string
  nombre: string
  email: string
}

type Props = {
  // Props para editar pedido existente
  clienteActual?: { id: string; nombre: string }
  pedidoEntregado?: boolean
  contentInsets?: { top: number; bottom: number; left: number; right: number }
  onCambiarCliente?: (usuarioId: string, nombre: string) => void

  // Props para crear pedido nuevo
  usuarioSeleccionado?: string | null
  onSeleccionar?: (usuarioId: string | null) => void

  // Props comunes
  usuarios: Usuario[]
  cargandoCliente?: boolean
  cargandoUsuarios?: boolean
  onDropdownChange?: (abierto: boolean) => void
}

const SelectorCliente = ({
  clienteActual,
  usuarios,
  cargandoCliente,
  cargandoUsuarios,
  pedidoEntregado,
  contentInsets,
  onCambiarCliente,
  usuarioSeleccionado,
  onSeleccionar,
  onDropdownChange,
}: Props) => {
  const [abierto, setAbierto] = useState(false)

  const modoCrear = usuarioSeleccionado !== undefined && onSeleccionar !== undefined
  const usuarioMostrado = modoCrear
    ? usuarioSeleccionado && usuarios.length > 0
      ? usuarios.find((u) => u.id === usuarioSeleccionado)?.nombre || "Seleccionar usuario"
      : "Seleccionar usuario"
    : clienteActual?.nombre || ""

  const toggleDropdown = () => {
    if (!pedidoEntregado && !cargandoCliente && !cargandoUsuarios) {
      const nuevoEstado = !abierto
      setAbierto(nuevoEstado)
      onDropdownChange?.(nuevoEstado)
    }
  }

  const seleccionarUsuario = (usuario: Usuario) => {
    if (modoCrear && onSeleccionar) {
      onSeleccionar(usuario.id)
    } else if (onCambiarCliente) {
      onCambiarCliente(usuario.id, usuario.nombre)
    }
    setAbierto(false)
    onDropdownChange?.(false)
  }

  return (
    <View style={[styles.contenedorCliente, abierto && { zIndex: 9999 }]}>
      <View style={styles.filaEtiqueta}>
        <Text style={styles.etiquetaCliente}>Para: </Text>
        <TouchableOpacity
          testID="boton-cambiar-cliente"
          style={styles.botonCliente}
          disabled={cargandoCliente || cargandoUsuarios || pedidoEntregado}
          onPress={toggleDropdown}
        >
          {cargandoCliente || cargandoUsuarios ? (
            <ActivityIndicator size="small" color="#059669" />
          ) : (
            <Text style={styles.textoCliente}>{usuarioMostrado}</Text>
          )}
        </TouchableOpacity>
      </View>

      {abierto && !pedidoEntregado && usuarios.length > 0 && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
            {usuarios.map((usuario) => (
              <TouchableOpacity
                key={usuario.id}
                style={styles.dropdownItem}
                onPress={() => seleccionarUsuario(usuario)}
                testID={`opcion-cliente-${usuario.id}`}
              >
                <View style={styles.itemMenuCliente}>
                  <Text style={styles.textoMenuCliente}>{usuario.nombre}</Text>
                  <Text style={styles.emailCliente}>{usuario.email}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  contenedorCliente: {
    gap: 6,
    position: "relative",
  },
  filaEtiqueta: {
    flexDirection: "row",
    alignItems: "center",
  },
  etiquetaCliente: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  botonCliente: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  textoCliente: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  dropdownContainer: {
    position: "absolute",
    top: 35,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 999,
    zIndex: 9999,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
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
})

export default SelectorCliente
