"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

type Usuario = {
  id: string
  nombre: string
  email: string
}

export function usarSesion() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargarUsuario = async () => {
    try {
      setCargando(true)
      setError(null)

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        throw sessionError
      }

      if (!session?.user) {
        setUsuario(null)
        return
      }

      // Obtener datos del usuario desde la tabla usuarios
      const { data, error: userError } = await supabase
        .from("usuarios")
        .select("id, nombre, email")
        .eq("id", session.user.id)
        .single()

      if (userError) {
        throw userError
      }

      setUsuario(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar sesión")
      console.error("Error al cargar sesión:", err)
    } finally {
      setCargando(false)
    }
  }

  const cerrarSesion = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUsuario(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cerrar sesión")
      console.error("Error al cerrar sesión:", err)
    }
  }

  useEffect(() => {
    cargarUsuario()
  }, [])

  return { usuario, cargando, error, cerrarSesion, recargarUsuario: cargarUsuario }
}
