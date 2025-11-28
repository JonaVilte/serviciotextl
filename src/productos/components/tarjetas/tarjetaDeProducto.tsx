// src/productos/components/tarjetas/tarjetaDeProducto.tsx
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"
import { Colors } from "@/constants/colors"
import { AlertTriangle } from "lucide-react-native"
import { useState } from "react"
import ModalEditorStock from "../iditar/modalParaEditaStock"

const ShinySundayFont = Platform.select({ ios: "System", android: "Roboto" })
const ACCENT_COLOR = "#059669"
const UMBRAL_BAJO_STOCK = 10

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

type Props = {
  producto: Producto
  onActualizarStock: (productoId: string, nuevoStock: number) => Promise<boolean>
}

const TarjetaProducto = ({ producto, onActualizarStock }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const tieneBajoStock = producto.stock <= UMBRAL_BAJO_STOCK

  const handlePress = () => {
    setModalVisible(true)
  }

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View style={[
          styles.tarjeta,
          tieneBajoStock && styles.tarjetaBajoStock
        ]}>
          {/* Nombre y precio */}
          <View style={styles.encabezado}>
            <Text style={styles.nombre}>{producto.nombre}</Text>
            <Text style={styles.precio}>${producto.precio.toFixed(2)}</Text>
          </View>

          {/* Descripción */}
          {producto.descripcion ? (
            <Text style={styles.descripcion}>{producto.descripcion}</Text>
          ) : null}

          {/* Detalles: categoría y stock */}
          <View style={styles.detalles}>
            <View style={styles.detalle}>
              <View style={styles.iconoTag}>
                <Text style={styles.iconoTexto}>🏷️</Text>
              </View>
              <Text style={styles.textoDetalle}>{producto.categoria || "Alien"}</Text>
            </View>

            <View style={styles.detalle}>
              <View style={styles.iconoPaquete}>
                <Text style={styles.iconoTexto}>📦</Text>
              </View>
              <Text style={[
                styles.textoDetalle,
                tieneBajoStock && styles.stockBajo
              ]}>
                Stock: {producto.stock}
              </Text>
            </View>
          </View>

          {/* Tags de talla y color */}
          <View style={styles.tags}>
            {producto.talla ? (
              <View style={styles.tag}>
                <Text style={styles.textoTag}>Talla: {producto.talla}</Text>
              </View>
            ) : null}
            
            {producto.color ? (
              <View style={styles.tag}>
                <Text style={styles.textoTag}>Color: {producto.color}</Text>
              </View>
            ) : null}
            
            {/* Indicador de bajo stock */}
            {tieneBajoStock ? (
              <View style={styles.tagAlerta}>
                <AlertTriangle size={12} color="#dc2626" />
                <Text style={styles.textoTagAlerta}>Bajo Stock</Text>
              </View>
            ) : null}
          </View>

          {/* Mensaje de alerta adicional para stock muy bajo */}
          {tieneBajoStock ? (
            <View style={styles.alertaContainer}>
              <AlertTriangle size={14} color="#dc2626" />
              <Text style={styles.textoAlerta}>
                {producto.stock === 0 
                  ? "¡Producto agotado!" 
                  : `Solo quedan ${producto.stock} unidades`}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

      <ModalEditorStock
        producto={producto}
        visible={modalVisible}
        onCerrar={() => setModalVisible(false)}
        onStockActualizado={onActualizarStock}
        umbralBajoStock={UMBRAL_BAJO_STOCK}
      />
    </>
  )
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  tarjetaBajoStock: {
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  nombre: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1f2937",
    fontFamily: ShinySundayFont,
    flex: 1,
    marginRight: 8,
  },
  precio: {
    fontSize: 27,
    fontWeight: "bold",
    color: ACCENT_COLOR,
    fontFamily: ShinySundayFont,
  },
  descripcion: {
    fontSize: 19,
    color: "#6b7280",
    marginBottom: 12,
    fontFamily: ShinySundayFont,
    lineHeight: 20,
  },
  detalles: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  detalle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconoTag: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconoPaquete: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconoTexto: {
    fontSize: 16,
  },
  textoDetalle: {
    fontSize: 17,
    color: "#374151",
    fontFamily: ShinySundayFont,
  },
  stockBajo: {
    color: "#dc2626",
    fontWeight: "600",
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  tag: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  textoTag: {
    fontSize: 16,
    color: ACCENT_COLOR,
    fontWeight: "600",
    fontFamily: ShinySundayFont,
  },
  tagAlerta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fecaca",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  textoTagAlerta: {
    fontSize: 16,
    color: "#dc2626",
    fontWeight: "600",
    fontFamily: ShinySundayFont,
  },
  alertaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  textoAlerta: {
    fontSize: 16,
    color: "#dc2626",
    fontWeight: "500",
    fontFamily: ShinySundayFont,
    flex: 1,
  },
})

export default TarjetaProducto