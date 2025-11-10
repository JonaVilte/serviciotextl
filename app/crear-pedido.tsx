"use client"

import { View, StyleSheet, Platform, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native"
import { Text } from "@/components/ui/text"
import { useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { usarProductos } from "@/src/pedidos/hooks/usarProductos"
import { usarCrearPedido } from "@/src/pedidos/hooks/usarCrearPedido"
import SelectorCliente from "@/src/pedidos/components/seleccionarCliente"
import TarjetaProductoParaPedido from "@/src/pedidos/components/tarjetaProductoParaPedido"
import ItemCarrito from "@/src/pedidos/components/itemCarrito"
import usarUsuarios  from "@/src/pedidos/hooks/usarUsuarios"

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })

export default function CrearPedidoScreen() {
  const router = useRouter()
  const { productos, loading: loadingProductos } = usarProductos()
  const { usuarios, cargando: loadingUsuarios } = usarUsuarios()
  const {
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
  } = usarCrearPedido()

  const manejarCrearPedido = async () => {
    const exito = await crearPedido()
    if (exito) {
      Alert.alert("Éxito", "Pedido creado correctamente", [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)"),
        },
      ])
    }
  }

  const manejarCancelar = () => {
    router.push("/(tabs)")
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={manejarCancelar}>
          <ArrowLeft color="#FFFDF6" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.title}>Crear Pedido</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenido}>
        {/* Selector de usuario */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>¿Para quién es el pedido?</Text>
          <SelectorCliente
            usuarios={usuarios}
            cargandoUsuarios={loadingUsuarios}
            usuarioSeleccionado={usuarioSeleccionado}
            onSeleccionar={setUsuarioSeleccionado}
            onDropdownChange={() => {}}
          />
        </View>

        {/* Lista de productos disponibles */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Productos Disponibles</Text>
          <View style={styles.listaProductos}>
            {loadingProductos ? (
              <Text style={styles.textoCargando}>Cargando productos...</Text>
            ) : productos.length === 0 ? (
              <Text style={styles.textoVacio}>No hay productos disponibles</Text>
            ) : (
              productos.map((producto) => (
                <TarjetaProductoParaPedido
                  key={producto.id}
                  nombre={producto.nombre}
                  descripcion={producto.descripcion}
                  precio={producto.precio}
                  stock={producto.stock}
                  onAgregar={() => agregarAlCarrito(producto)}
                />
              ))
            )}
          </View>
        </View>

        {/* Carrito de compras */}
        {carritoItems.length > 0 && (
          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>Carrito de Compras</Text>
            <View style={styles.carrito}>
              {carritoItems.map((item) => (
                <ItemCarrito
                  key={item.producto_id}
                  nombre={item.nombre}
                  precio={item.precio}
                  cantidad={item.cantidad}
                  onIncrementar={() => incrementarCantidad(item.producto_id)}
                  onDecrementar={() => decrementarCantidad(item.producto_id)}
                  onEliminar={() => eliminarDelCarrito(item.producto_id)}
                />
              ))}
            </View>

            {/* Total */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalTexto}>Total: ${calcularTotal().toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* Observaciones */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Observaciones (opcional)</Text>
          <TextInput
            style={styles.inputObservaciones}
            placeholder="Agregar observaciones al pedido..."
            placeholderTextColor="#9ca3af"
            value={observaciones}
            onChangeText={setObservaciones}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botones */}
        <View style={styles.botones}>
          <TouchableOpacity
            style={[styles.botonCrear, loading && styles.botonDeshabilitado]}
            onPress={manejarCrearPedido}
            disabled={loading}
          >
            <Text style={styles.textoBotonCrear}>{loading ? "Creando..." : "Crear Pedido"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonCancelar} onPress={manejarCancelar}>
            <Text style={styles.textoBotonCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF6",
  },
  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#059669",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    paddingRight: 10,
    paddingVertical: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFDF6",
    fontFamily: ShinySundayFont,
    flex: 1,
  },
  contenido: {
    padding: 16,
    gap: 24,
  },
  seccion: {
    gap: 12,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    fontFamily: ShinySundayFont,
  },
  listaProductos: {
    gap: 12,
  },
  carrito: {
    gap: 12,
  },
  totalContainer: {
    backgroundColor: "#d1fae5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  totalTexto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#059669",
    fontFamily: ShinySundayFont,
  },
  inputObservaciones: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1f2937",
    fontFamily: ShinySundayFont,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    minHeight: 100,
  },
  botones: {
    gap: 12,
    marginBottom: 20,
  },
  botonCrear: {
    backgroundColor: "#059669",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  textoBotonCrear: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFDF6",
    fontFamily: ShinySundayFont,
  },
  botonCancelar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#059669",
  },
  textoBotonCancelar: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
    fontFamily: ShinySundayFont,
  },
  textoCargando: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    fontFamily: ShinySundayFont,
  },
  textoVacio: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    fontFamily: ShinySundayFont,
  },
})
