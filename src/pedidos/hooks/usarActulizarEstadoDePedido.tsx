"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type EstadoPedido = "completado" | "en_proceso" | "pendiente" | "entregado" | 'cancelado'

interface actualizarEstadoPedidoReturn {
  actualizarEstado: (pedidoId: string, nuevoEstado: EstadoPedido) => Promise<boolean>
  cargando: boolean
  error: string | null
}

const usarEstadoDelPedido = (): actualizarEstadoPedidoReturn => {
  const [cargando, setCargando] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const actualizar = async (pedidoId: string, nuevoEstado: EstadoPedido): Promise<boolean> => {
    setCargando(true)
    setError(null)

    try {
        const { data: pedidoActual, error: fetchError } = await supabase
        .from("pedidos")
        .select("estado")
        .eq("id", pedidoId)
        .single()

      if (fetchError) {
        console.error("Error al verificar el estado del pedido:", fetchError)
        setError("No se pudo verificar el estado del pedido")
        setCargando(false)
        return false
      }

      if (pedidoActual?.estado === "entregado") {
        setError("No se puede editar un pedido que ya fue entregado")
        setCargando(false)
        return false
      }

      const { error: updateError } = await supabase
        .from("pedidos")
        .update({
          estado: nuevoEstado,
          updated_at: new Date().toISOString(),
        })
        .eq("id", pedidoId)

      if (updateError) {
        console.error("Error al actualizar el estado del pedido:", updateError)
        setError("No se pudo actualizar el estado del pedido")
        setCargando(false)
        return false
      }

      setCargando(false)
      return true
    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado")
      setCargando(false)
      return false
    }
  }

  return { actualizarEstado: actualizar, cargando, error }
}

export default usarEstadoDelPedido
