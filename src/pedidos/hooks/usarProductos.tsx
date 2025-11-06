import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

type Producto = {
  id: string
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria: string
  talla: string
  color: string
}

export function usarProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargarProductos = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from("productos")
        .select("id, nombre, descripcion, precio, stock, categoria, talla, color")
        .gt("stock", 0) // Solo productos con stock disponible
        .order("nombre", { ascending: true })

      if (supabaseError) {
        setError(supabaseError.message)
        return
      }

      setProductos(data || [])
    } catch (err) {
      setError("Error al cargar los productos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  return { productos, loading, error, recargarProductos: cargarProductos }
}
