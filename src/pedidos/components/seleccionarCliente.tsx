import { View, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Usuario = {
  id: string
  nombre: string
  email: string
}

type Props = {
  clienteActual: { id: string; nombre: string }
  usuarios: Usuario[]
  cargandoCliente: boolean
  cargandoUsuarios: boolean
  pedidoEntregado: boolean
  contentInsets: { top: number; bottom: number; left: number; right: number }
  onCambiarCliente: (usuarioId: string, nombre: string) => void
}

const SelectorCliente = ({
  clienteActual,
  usuarios,
  cargandoCliente,
  cargandoUsuarios,
  pedidoEntregado,
  contentInsets,
  onCambiarCliente,
}: Props) => {
  return (
    <View style={styles.contenedorCliente}>
      <Text style={styles.etiquetaCliente}>
        Pedido de{" "}
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
                    onPress={() => onCambiarCliente(usuario.id, usuario.nombre)}
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
  )
}

const styles = StyleSheet.create({
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
