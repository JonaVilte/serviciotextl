import { View, StyleSheet, Platform } from "react-native"
import { Text } from "@/components/ui/text"

// Marcador de posición para la fuente
const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })
const ACCENT_COLOR = "#059669"

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
}

const TarjetaProducto = ({ producto }: Props) => {
  return (
    <View style={styles.tarjeta}>
      {/* Nombre y precio */}
      <View style={styles.encabezado}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>${producto.precio.toFixed(2)}</Text>
      </View>

      {/* Descripción */}
      {producto.descripcion && <Text style={styles.descripcion}>{producto.descripcion}</Text>}

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
          <Text style={styles.textoDetalle}>Stock: {producto.stock}</Text>
        </View>
      </View>

      {/* Tags de talla y color */}
      <View style={styles.tags}>
        {producto.talla && (
          <View style={styles.tag}>
            <Text style={styles.textoTag}>Talla: {producto.talla}</Text>
          </View>
        )}
        {producto.color && (
          <View style={styles.tag}>
            <Text style={styles.textoTag}>Color: {producto.color}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: ACCENT_COLOR,
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    fontFamily: ShinySundayFont,
    flex: 1,
    marginRight: 8,
  },
  precio: {
    fontSize: 20,
    fontWeight: "bold",
    color: ACCENT_COLOR,
    fontFamily: ShinySundayFont,
  },
  descripcion: {
    fontSize: 14,
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
    fontSize: 13,
    color: "#374151",
    fontFamily: ShinySundayFont,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  textoTag: {
    fontSize: 12,
    color: ACCENT_COLOR,
    fontWeight: "600",
    fontFamily: ShinySundayFont,
  },
})

export default TarjetaProducto
