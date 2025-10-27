import { View, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Colors } from "@/constants/colors"

type EstadoPedido = "completado" | "en_proceso" | "pendiente" | "entregado" | "cancelado"

type Props = {
  estadoActual: EstadoPedido
  cargando: boolean
  pedidoEntregado: boolean
  contentInsets: { top: number; bottom: number; left: number; right: number }
  onCambiarEstado: (nuevoEstado: EstadoPedido) => void
}

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

const SelectorEstado = ({ estadoActual, cargando, pedidoEntregado, contentInsets, onCambiarEstado }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TouchableOpacity
          testID="boton-estado-pedido"
          style={[styles.statusBadge, { backgroundColor: getStatusColor(estadoActual) + "20" }]}
          disabled={cargando || pedidoEntregado}
        >
          {cargando ? (
            <ActivityIndicator size="small" />
          ) : (
            <View style={styles.filaBadge}>
              <Text style={[styles.statusText, { color: getStatusColor(estadoActual) }]}>
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
            <DropdownMenuItem onPress={() => onCambiarEstado("pendiente")} testID="opcion-pendiente">
              <View style={styles.itemMenu}>
                <View />
                <Text style={styles.textoMenu}>pendiente</Text>
              </View>
            </DropdownMenuItem>

            <DropdownMenuItem onPress={() => onCambiarEstado("en_proceso")} testID="opcion-en_proceso">
              <View style={styles.itemMenu}>
                <View />
                <Text style={styles.textoMenu}>en proceso</Text>
              </View>
            </DropdownMenuItem>

            <DropdownMenuItem onPress={() => onCambiarEstado("cancelado")} testID="opcion-cancelado">
              <View style={styles.itemMenu}>
                <View />
                <Text style={styles.textoMenu}>cancelado</Text>
              </View>
            </DropdownMenuItem>

            <DropdownMenuItem onPress={() => onCambiarEstado("completado")} testID="opcion-completado">
              <View style={styles.itemMenu}>
                <View />
                <Text style={styles.textoMenu}>completado</Text>
              </View>
            </DropdownMenuItem>

            <DropdownMenuItem onPress={() => onCambiarEstado("entregado")} testID="opcion-entregado">
              <View style={styles.itemMenu}>
                <View />
                <Text style={styles.textoMenu}>entregado</Text>
              </View>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

const styles = StyleSheet.create({
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  filaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  itemMenu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 6,
  },
  textoMenu: {
    fontSize: 15,
    color: "#374151",
  },
})

export default SelectorEstado
