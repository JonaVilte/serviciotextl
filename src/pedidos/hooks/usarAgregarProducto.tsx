"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type NuevoProducto = {
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria: string
  talla: string
  color: string
}

export function usarAgregarProducto() {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const agregarProducto = async (producto: NuevoProducto): Promise<boolean> => {
    try {
      setCargando(true)
      setError(null)

      const { error: supabaseError } = await supabase.from("productos").insert([
        {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
          categoria: producto.categoria,
          talla: producto.talla,
          color: producto.color,
        },
      ])

      if (supabaseError) {
        setError(supabaseError.message)
        return false
      }

      return true
    } catch (err) {
      setError("Error al agregar el producto")
      return false
    } finally {
      setCargando(false)
    }
  }

  return { agregarProducto, cargando, error }
}
