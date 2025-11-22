// src/productos/components/listas/listaDeProductos.tsx
import { 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView, 
  Platform 
} from "react-native"
import { Text } from "@/components/ui/text"
import TarjetaProducto from "../tarjetas/tarjetaDeProducto"
import { usarProductos } from "../../hooks/usarProductos"
import BuscadorProductos from "../buscador/buscadorDeProductos"
import { useBuscarProductos } from "../../hooks/usarBuscarProductos"
import { useBajoStock } from "../../hooks/bajoStock"
import AlertaBajoStock from "../alertas/alertaDeStock"

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })
const ACCENT_COLOR = "#059669"

const ListaDeProductos = () => {
  const { productos, loading, error, actualizarStock } = usarProductos()
  const { 
    terminoBusqueda, 
    setTerminoBusqueda,
    productosFiltrados 
  } = useBuscarProductos({ productos })
  
  const { 
    totalBajoStock,
    umbralBajoStock 
  } = useBajoStock({ productos: productosFiltrados })

  if (loading) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={ACCENT_COLOR} />
        <Text style={styles.textoCargando}>Cargando productos...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoError}>Hubo un problema al cargar los productos.</Text>
      </View>
    )
  }

  return (
    <View style={styles.contenedor}>
      <BuscadorProductos
        terminoBusqueda={terminoBusqueda}
        onTerminoChange={setTerminoBusqueda}
        placeholder="Buscar productos por nombre..."
      />

      {/* Alerta general de bajo stock */}
      <AlertaBajoStock 
        totalBajoStock={totalBajoStock}
        umbralBajoStock={umbralBajoStock}
      />

      {/* Información de búsqueda */}
      {terminoBusqueda ? (
        <View style={styles.infoBusqueda}>
          <Text style={styles.textoInfo}>
            {productosFiltrados.length === 0 
              ? 'No se encontraron productos' 
              : `Encontrados: ${productosFiltrados.length} producto${productosFiltrados.length !== 1 ? 's' : ''}`
            }
          </Text>
        </View>
      ) : null}

      {/* Lista de productos */}
      {productosFiltrados.length === 0 && terminoBusqueda ? (
        <View style={styles.centrado}>
          <Text style={styles.textoVacio}>
            No se encontraron productos que coincidan con "{terminoBusqueda}"
          </Text>
        </View>
      ) : productosFiltrados.length === 0 ? (
        <View style={styles.centrado}>
          <Text style={styles.textoVacio}>No hay productos disponibles.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {productosFiltrados.map((producto) => (
            <TarjetaProducto 
              key={producto.id} 
              producto={producto}
              onActualizarStock={actualizarStock}
            />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textoCargando: {
    marginTop: 15,
    color: "#6b7280",
    fontSize: 18,
    fontFamily: ShinySundayFont,
  },
  textoError: {
    color: "#ef4444",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: ShinySundayFont,
  },
  textoVacio: {
    color: "#4b5563",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: ShinySundayFont,
  },
  infoBusqueda: {
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  textoInfo: {
    color: "#059669",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: ShinySundayFont,
  },
})

export default ListaDeProductos