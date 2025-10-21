"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type EstadoPedido = "completado" | "en_proceso" | "evaluando"

interface actualizarEstadoPedidoReturn {
  actualizarEstado: (pedidoId: string, nuevoEstado: EstadoPedido) => Promise<boolean>
  cargando: boolean
  error: string | null
}

const actualizarEstadoPedido = (): actualizarEstadoPedidoReturn => {
  const [cargando, setCargando] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const actualizarEstado = async (pedidoId: string, nuevoEstado: EstadoPedido): Promise<boolean> => {
    setCargando(true)
    setError(null)

    try {
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

  return { actualizarEstado, cargando, error }
}

export default actualizarEstadoPedido
