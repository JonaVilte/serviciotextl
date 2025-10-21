"use client"

import { useState } from "react"
import { View, ActivityIndicator, Alert } from "react-native"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useActualizarEstadoPedido from "@/src/pedidos/hooks/arctulizarEstadoDePedido"

type Props = {
  pedidoId: string
  nombre_del_encargado: string
  fecha_de_emision: Date
  estado_del_pedido: "completado" | "en_proceso" | "evaluando"
  precio: number
  onEstadoActualizado?: () => void
}

const TarjetaParaEditarPedido = ({
  pedidoId,
  nombre_del_encargado,
  fecha_de_emision,
  estado_del_pedido,
  precio,
  onEstadoActualizado,
}: Props) => {
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  }

  const [estadoActual, setEstadoActual] = useState(estado_del_pedido)
  const { actualizarEstado, cargando, error } = useActualizarEstadoPedido()

  const manejarCambioEstado = async (nuevoEstado: "completado" | "en_proceso" | "evaluando") => {
    const exito = await actualizarEstado(pedidoId, nuevoEstado)

    if (exito) {
      setEstadoActual(nuevoEstado)
      Alert.alert("¡Éxito!", `El estado del pedido se actualizó a "${nuevoEstado}"`, [{ text: "OK" }])
      // Llamar al callback para recargar la lista
      if (onEstadoActualizado) {
        onEstadoActualizado()
      }
    } else {
      Alert.alert("Error", error || "No se pudo actualizar el estado del pedido", [{ text: "OK" }])
    }
  }

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case "completado":
        return "bg-green-100 text-green-800"
      case "en proceso":
        return "bg-blue-100 text-blue-800"
      case "evaluando":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full max-w-sm bg-white shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Pedido de {nombre_del_encargado}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Fecha de Emisión: {fecha_de_emision.toLocaleString()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <View className="gap-3">
          <View className="gap-1">
            <Text className="text-sm font-semibold text-gray-700">Estado del Pedido:</Text>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`${obtenerColorEstado(estadoActual)} border-0`}
                  disabled={cargando}
                >
                  {cargando ? (
                    <View className="flex-row items-center gap-2">
                      <ActivityIndicator size="small" color="#6b7280" />
                      <Text>Actualizando...</Text>
                    </View>
                  ) : (
                    <Text className="font-semibold capitalize">{estadoActual}</Text>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent insets={contentInsets} sideOffset={2} className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem onPress={() => manejarCambioEstado("evaluando")}>
                    <View className="flex-row items-center gap-2 py-1">
                      <View className="w-3 h-3 rounded-full bg-yellow-500" />
                      <Text className="text-base">Evaluando</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem onPress={() => manejarCambioEstado("en_proceso")}>
                    <View className="flex-row items-center gap-2 py-1">
                      <View className="w-3 h-3 rounded-full bg-blue-500" />
                      <Text className="text-base">en_proceso</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem onPress={() => manejarCambioEstado("completado")}>
                    <View className="flex-row items-center gap-2 py-1">
                      <View className="w-3 h-3 rounded-full bg-green-500" />
                      <Text className="text-base">Completado</Text>
                    </View>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </View>

          <View className="bg-gray-50 p-3 rounded-lg">
            <Text className="text-sm text-gray-600 mb-1">Precio Total</Text>
            <Text className="text-2xl font-bold text-gray-900">${precio.toFixed(2)}</Text>
          </View>
        </View>
      </CardContent>

      <CardFooter className="flex-row justify-end gap-2">
        <Button variant="outline">
          <Text>Ver Detalles</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TarjetaParaEditarPedido
