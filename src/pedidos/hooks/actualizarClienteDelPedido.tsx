"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const actualizarClientePedido = () => {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const actualizarCliente = async (pedidoId: string, nuevoUsuarioId: string): Promise<boolean> => {
    setCargando(true)
    setError(null)

    // Verificar que el pedido no esté entregado
    const { data: pedidoActual, error: errorConsulta } = await supabase
      .from("pedidos")
      .select("estado")
      .eq("id", pedidoId)
      .single()

    if (errorConsulta) {
      setError("No se puede el pedido")
      setCargando(false)
      return false
    }

    if (pedidoActual?.estado === "entregado") {
      setError("No se puede modificar un pedido que ya fue entregado")
      setCargando(false)
      return false
    }

    // Actualizar el usuario_id del pedido
    const { error: errorActualizacion } = await supabase
      .from("pedidos")
      .update({ usuario_id: nuevoUsuarioId })
      .eq("id", pedidoId)

    if (errorActualizacion) {
      setError("No se puede actualizar el cliente")
      setCargando(false)
      return false
    }

    setCargando(false)
    return true
  }

  return { actualizarCliente, cargando, error }
}

export default actualizarClientePedido
