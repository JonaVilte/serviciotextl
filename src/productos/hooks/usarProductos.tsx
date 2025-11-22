// src/productos/hooks/usarProductos.ts
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
        .gt("stock", 0)
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

  // Función para actualizar el stock de un producto
  const actualizarStock = async (productoId: string, nuevoStock: number) => {
    try {
      const { error: supabaseError } = await supabase
        .from("productos")
        .update({ stock: nuevoStock })
        .eq("id", productoId)

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      // Actualizar el estado local inmediatamente
      setProductos(prev => prev.map(p => 
        p.id === productoId ? { ...p, stock: nuevoStock } : p
      ))

      return true
    } catch (err) {
      setError("Error al actualizar el stock")
      return false
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  return { 
    productos, 
    loading, 
    error, 
    recargarProductos: cargarProductos,
    actualizarStock
  }
}