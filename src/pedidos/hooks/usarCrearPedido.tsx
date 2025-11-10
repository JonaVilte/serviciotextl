"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Alert } from "react-native"

type ItemCarrito = {
  producto_id: string
  nombre: string
  descripcion: string
  precio: number
  cantidad: number
  stock: number
}

export function usarCrearPedido() {
  const [carritoItems, setCarritoItems] = useState<ItemCarrito[]>([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string | null>(null)
  const [observaciones, setObservaciones] = useState("")
  const [loading, setLoading] = useState(false)

  const agregarAlCarrito = (producto: {
    id: string
    nombre: string
    descripcion: string
    precio: number
    stock: number
  }) => {
    setCarritoItems((prev) => {
      const existente = prev.find((item) => item.producto_id === producto.id)
      if (existente) {
        if (existente.cantidad >= producto.stock) {
          Alert.alert("Stock insuficiente", `Solo hay ${producto.stock} unidades disponibles`)
          return prev
        }
        return prev.map((item) => (item.producto_id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item))
      }
      return [
        ...prev,
        {
          producto_id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          cantidad: 1,
          stock: producto.stock,
        },
      ]
    })
  }

  const incrementarCantidad = (producto_id: string) => {
    setCarritoItems((prev) =>
      prev.map((item) => {
        if (item.producto_id === producto_id) {
          if (item.cantidad >= item.stock) {
            Alert.alert("Stock insuficiente", `Solo hay ${item.stock} unidades disponibles`)
            return item
          }
          return { ...item, cantidad: item.cantidad + 1 }
        }
        return item
      }),
    )
  }

  const decrementarCantidad = (producto_id: string) => {
    setCarritoItems((prev) =>
      prev
        .map((item) => (item.producto_id === producto_id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0),
    )
  }

  const eliminarDelCarrito = (producto_id: string) => {
    setCarritoItems((prev) => prev.filter((item) => item.producto_id !== producto_id))
  }

  const calcularTotal = () => {
    return carritoItems.reduce((total, item) => total + item.precio * item.cantidad, 0)
  }

  const crearPedido = async () => {
    if (!usuarioSeleccionado) {
      Alert.alert("Error", "Debes seleccionar un usuario")
      return false
    }

    if (carritoItems.length === 0) {
      Alert.alert("Error", "Debes agregar al menos un producto")
      return false
    }

    try {
      setLoading(true)

      // Crear el pedido
      const { data: pedidoData, error: pedidoError } = await supabase
        .from("pedidos")
        .insert({
          usuario_id: usuarioSeleccionado,
          total: calcularTotal(),
          estado: "pendiente",
          observaciones: observaciones || null,
        })
        .select()
        .single()

      if (pedidoError) throw pedidoError

      // Insertar los detalles del pedido
      const detalles = carritoItems.map((item) => ({
        pedido_id: pedidoData.id,
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.precio * item.cantidad,
      }))

      const { error: detallesError } = await supabase.from("pedido_detalles").insert(detalles)

      if (detallesError) throw detallesError

      // Limpiar el carrito y formulario
      setCarritoItems([])
      setUsuarioSeleccionado(null)
      setObservaciones("")

      return true
    } catch (error) {
      console.error("Error al crear pedido:", error)
      Alert.alert("Error", "No se pudo crear el pedido")
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    carritoItems,
    usuarioSeleccionado,
    observaciones,
    loading,
    setUsuarioSeleccionado,
    setObservaciones,
    agregarAlCarrito,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
    calcularTotal,
    crearPedido,
  }
}
