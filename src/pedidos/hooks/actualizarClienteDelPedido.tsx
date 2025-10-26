"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const actualizarClientePedido = () => {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const actualizarCliente = async (pedidoId: string, nuevoUsuarioId: string): Promise<boolean> => {
    try {
      setCargando(true)
      setError(null)

      // Verificar que el pedido no esté entregado
      const { data: pedidoActual, error: errorConsulta } = await supabase
        .from("pedidos")
        .select("estado")
        .eq("id", pedidoId)
        .single()

      if (errorConsulta) {
        throw errorConsulta
      }

      if (pedidoActual?.estado === "entregado") {
        setError("No se puede modificar un pedido que ya fue entregado")
        return false
      }

      // Actualizar el usuario_id del pedido
      const { error: errorActualizacion } = await supabase
        .from("pedidos")
        .update({ usuario_id: nuevoUsuarioId })
        .eq("id", pedidoId)

      if (errorActualizacion) {
        throw errorActualizacion
      }

      return true
    } catch (err) {
      const mensajeError = err instanceof Error ? err.message : "Error al actualizar el cliente"
      setError(mensajeError)
      console.error("Error al actualizar cliente del pedido:", err)
      return false
    } finally {
      setCargando(false)
    }
  }

  return { actualizarCliente, cargando, error }
}

export default actualizarClientePedido
