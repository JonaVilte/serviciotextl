"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

type Usuario = {
  id: string
  nombre: string
  email: string
}

const usarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargarUsuarios = async () => {
    try {
      setCargando(true)
      setError(null)

      const { data, error: errorSupabase } = await supabase
        .from("usuarios")
        .select("id, nombre, email")
        .order("nombre", { ascending: true })

      if (errorSupabase) {
        throw errorSupabase
      }

      setUsuarios(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuarios")
      console.error("Error al cargar usuarios:", err)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  return { usuarios, cargando, error, recargarUsuarios: cargarUsuarios }
}

export default usarUsuarios
