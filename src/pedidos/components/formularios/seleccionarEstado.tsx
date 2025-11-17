"use client"

import { useState } from "react"
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "@/components/ui/text"
import { Colors } from "@/constants/colors"

type EstadoPedido = "completado" | "en_proceso" | "pendiente" | "entregado" | "cancelado"

type Props = {
  estadoActual: EstadoPedido
  cargando: boolean
  pedidoEntregado: boolean
  contentInsets: { top: number; bottom: number; left: number; right: number }
  onCambiarEstado: (nuevoEstado: EstadoPedido) => void
  onDropdownChange?: (abierto: boolean) => void
}

const statusOptions = [
  { key: "pendiente", label: "pendiente", color: Colors.secondary },
  { key: "en_proceso", label: "en proceso", color: Colors.primary },
  { key: "completado", label: "completado", color: Colors.accent },
  { key: "cancelado", label: "cancelado", color: Colors.destructive },
  { key: "entregado", label: "entregado", color: Colors.entregado },
]

const getStatusColor = (status: string) => {
  const statusOption = statusOptions.find((option) => option.key === status)
  return statusOption?.color || Colors.foreground
}

const SelectorEstado = ({ estadoActual, cargando, pedidoEntregado, onCambiarEstado, onDropdownChange }: Props) => {
  const [expanded, setExpanded] = useState(false)

  const handleSeleccion = (nuevoEstado: EstadoPedido) => {
    setExpanded(false)
    onDropdownChange?.(false)
    onCambiarEstado(nuevoEstado)
  }

  const toggleExpanded = () => {
    const nuevoEstado = !expanded
    setExpanded(nuevoEstado)
    onDropdownChange?.(nuevoEstado)
  }

  return (
    <View style={[styles.container, expanded && { zIndex: 9999 }]}>
      <TouchableOpacity
        testID="boton-estado-pedido"
        style={[styles.statusBadge, { backgroundColor: getStatusColor(estadoActual) + "20" }]}
        disabled={cargando || pedidoEntregado}
        onPress={() => !pedidoEntregado && toggleExpanded()}
      >
        {cargando ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text style={[styles.statusText, { color: getStatusColor(estadoActual) }]}>
            {estadoActual === "en_proceso" ? "en proceso" : estadoActual}
          </Text>
        )}
      </TouchableOpacity>

      {expanded && !pedidoEntregado && (
        <View style={styles.dropdownMenu}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.menuItem, estadoActual === option.key && styles.menuItemSelected]}
              onPress={() => handleSeleccion(option.key as EstadoPedido)}
              testID={`opcion-${option.key}`}
            >
              <Text style={[styles.textoMenu, estadoActual === option.key && { fontWeight: "600" }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
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
  },
  dropdownMenu: {
    position: "absolute",
    top: 35,
    left: 0,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 4,
    minWidth: 130,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    zIndex: 9999,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuItemSelected: {
    backgroundColor: "#f3f4f6",
  },
  textoMenu: {
    fontSize: 14,
    color: "#374151",
  },
})

export default SelectorEstado
