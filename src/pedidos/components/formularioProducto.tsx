"use client"

import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"
import { Text } from "@/components/ui/text"
import { useState } from "react"
import { usarAgregarProducto } from "@/src/pedidos/hooks/usarAgregarProducto"
import { useRouter } from "expo-router"

const FormularioProducto = () => {
  const router = useRouter()
  const { agregarProducto, cargando } = usarAgregarProducto()

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")
  const [categoria, setCategoria] = useState("")
  const [talla, setTalla] = useState("")
  const [color, setColor] = useState("")

  const validarFormulario = () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre del producto es obligatorio")
      return false
    }
    if (!precio || isNaN(Number(precio)) || Number(precio) <= 0) {
      Alert.alert("Error", "El precio debe ser un número válido mayor a 0")
      return false
    }
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
      Alert.alert("Error", "El stock debe ser un número válido mayor o igual a 0")
      return false
    }
    return true
  }

  const manejarAgregar = async () => {
    if (!validarFormulario()) return

    const exito = await agregarProducto({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: Number(precio),
      stock: Number(stock),
      categoria: categoria.trim(),
      talla: talla.trim(),
      color: color.trim(),
    })

    if (exito) {
      Alert.alert("Éxito", "Producto agregado correctamente", [
        {
          text: "OK",
          onPress: () => {
            setTimeout(() => {
              router.push("/(tabs)")
            }, 1000)
          },
        },
      ])
    } else {
      Alert.alert("Error", "No se pudo agregar el producto")
    }
  }

  const manejarCancelar = () => {
    router.push("/(tabs)")
  }

  return (
    <ScrollView style={styles.contenedor} showsVerticalScrollIndicator={false}>
      {/* Icono central */}
      <View style={styles.contenedorIcono}>
        <View style={styles.circuloIcono}>
          <View style={styles.masHorizontal} />
          <View style={styles.masVertical} />
        </View>
      </View>

      <Text style={styles.titulo}>Agregar Producto</Text>
      <Text style={styles.subtitulo}>Completa la información del nuevo producto</Text>

      {/* Nombre del producto */}
      <View style={styles.campoContainer}>
        <Text style={styles.etiqueta}>Nombre del producto</Text>
        <View style={styles.inputConIcono}>
          <Text style={styles.icono}>🏷️</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Descripción */}
      <View style={styles.campoContainer}>
        <Text style={styles.etiqueta}>Descripción</Text>
        <View style={styles.inputConIcono}>
          <Text style={styles.icono}>📄</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripción del producto"
            value={descripcion}
            onChangeText={setDescripcion}
            placeholderTextColor="#9ca3af"
            multiline
          />
        </View>
      </View>

      {/* Precio y Stock */}
      <View style={styles.filaDoble}>
        <View style={[styles.campoContainer, { flex: 1 }]}>
          <Text style={styles.etiqueta}>Precio</Text>
          <View style={styles.inputConIcono}>
            <Text style={styles.icono}>💵</Text>
            <TextInput
              style={styles.input}
              placeholder="Precio"
              value={precio}
              onChangeText={setPrecio}
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={[styles.campoContainer, { flex: 1 }]}>
          <Text style={styles.etiqueta}>Stock</Text>
          <View style={styles.inputConIcono}>
            <Text style={styles.icono}>📦</Text>
            <TextInput
              style={styles.input}
              placeholder="Stock"
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      </View>

      {/* Categoría */}
      <View style={styles.campoContainer}>
        <Text style={styles.etiqueta}>Categoría</Text>
        <View style={styles.inputConIcono}>
          <Text style={styles.icono}>▦</Text>
          <TextInput
            style={styles.input}
            placeholder="Categoría (e.j: Camisas, Pantalones, Vestidos)"
            value={categoria}
            onChangeText={setCategoria}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Talla y Color */}
      <View style={styles.filaDoble}>
        <View style={[styles.campoContainer, { flex: 1 }]}>
          <Text style={styles.etiqueta}>Talla</Text>
          <View style={styles.inputConIcono}>
            <Text style={styles.icono}>📏</Text>
            <TextInput
              style={styles.input}
              placeholder="Talla (S, M, L, XL)"
              value={talla}
              onChangeText={setTalla}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={[styles.campoContainer, { flex: 1 }]}>
          <Text style={styles.etiqueta}>Color</Text>
          <View style={styles.inputConIcono}>
            <Text style={styles.icono}>🎨</Text>
            <TextInput
              style={styles.input}
              placeholder="Color"
              value={color}
              onChangeText={setColor}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      </View>

      {/* Botones */}
      <TouchableOpacity
        style={[styles.botonPrimario, cargando && styles.botonDeshabilitado]}
        onPress={manejarAgregar}
        disabled={cargando}
      >
        <Text style={styles.textoBotonPrimario}>{cargando ? "Agregando..." : "Agregar Producto"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonSecundario} onPress={manejarCancelar} disabled={cargando}>
        <Text style={styles.textoBotonSecundario}>Cancelar</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  contenedorIcono: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  circuloIcono: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  masHorizontal: {
    position: "absolute",
    width: 40,
    height: 5,
    backgroundColor: "#ffffff",
    borderRadius: 2.5,
  },
  masVertical: {
    position: "absolute",
    width: 5,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 2.5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 32,
  },
  campoContainer: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  inputConIcono: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  icono: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  filaDoble: {
    flexDirection: "row",
    gap: 12,
  },
  botonPrimario: {
    backgroundColor: "#059669",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  botonDeshabilitado: {
    backgroundColor: "#9ca3af",
  },
  textoBotonPrimario: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  botonSecundario: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 2,
    borderColor: "#059669",
  },
  textoBotonSecundario: {
    color: "#059669",
    fontSize: 18,
    fontWeight: "600",
  },
})

export default FormularioProducto
