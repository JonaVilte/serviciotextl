import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"


export function usarAgregarProducto() {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const agregarProducto = async ({
    nombre,
    descripcion,
    precioUnitario,
    stock,
    categoria,
    talla,
    color,
  } : {
  nombre: string,
  descripcion: string,
  precioUnitario: number,
  stock: number,
  categoria: string,
  talla: string,
  color: string,
  }): Promise<boolean> => {
    try {
      setCargando(true)
      setError(null)

      const { error: supabaseError } = await supabase.from("productos").insert(
        {
          nombre: nombre,
          descripcion: descripcion,
          precio: precioUnitario,
          stock: stock,
          categoria: categoria,
          talla: talla,
          color: color,
        },
      )

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
