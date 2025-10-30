import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

type DetalleItem = {
  id: string
  pedido_id: string
  producto_id: string
  cantidad: number
  precio_unitario: number
  subtotal: number
  producto_nombre: string
  producto_descripcion: string
  producto_talla: string
  producto_color: string
}

export function usarDetallesPedido(pedidoId: string) {
  const [detalles, setDetalles] = useState<DetalleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargarDetalles = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from("pedido_detalles")
        .select(`
          id,
          pedido_id,
          producto_id,
          cantidad,
          precio_unitario,
          subtotal,
          productos (
            nombre,
            descripcion,
            talla,
            color
          )
        `)
        .eq("pedido_id", pedidoId)
        .order("created_at", { ascending: true })

      if (supabaseError) {
        setError(supabaseError.message)
        return
      }

      const detallesFormateados = data.map((item: any) => ({
        id: item.id,
        pedido_id: item.pedido_id,
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario,
        subtotal: item.subtotal,
        producto_nombre: item.productos.nombre,
        producto_descripcion: item.productos.descripcion,
        producto_talla: item.productos.talla,
        producto_color: item.productos.color,
      }))

      setDetalles(detallesFormateados)
    } catch (err) {
      setError("Error al cargar los detalles del pedido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (pedidoId) {
      cargarDetalles()
    }
  }, [pedidoId])

  return { detalles, loading, error, recargarDetalles: cargarDetalles }
}
