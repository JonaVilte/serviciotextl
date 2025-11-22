// src/productos/components/editores/modalEditorStock.tsx
import { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Platform, 
  TextInput, 
  TouchableOpacity, 
  Modal,
  Alert 
} from 'react-native';
import { Text } from '@/components/ui/text';
import { Plus, Minus, X, Package } from 'lucide-react-native';

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" });

interface ModalEditorStockProps {
  producto: {
    id: string;
    nombre: string;
    stock: number;
  };
  visible: boolean;
  onCerrar: () => void;
  onStockActualizado: (productoId: string, nuevoStock: number) => Promise<boolean>;
  umbralBajoStock: number;
}

export default function ModalEditorStock({ 
  producto,
  visible,
  onCerrar,
  onStockActualizado,
  umbralBajoStock 
}: ModalEditorStockProps) {
  const [nuevoStock, setNuevoStock] = useState(producto.stock.toString());
  const [actualizando, setActualizando] = useState(false);
  const tieneBajoStock = producto.stock <= umbralBajoStock;

  const handleIncrementar = () => {
    const valor = parseInt(nuevoStock) + 1;
    setNuevoStock(valor.toString());
  };

  const handleDecrementar = () => {
    const valor = Math.max(0, parseInt(nuevoStock) - 1);
    setNuevoStock(valor.toString());
  };

  const handleGuardar = async () => {
    const stockNum = parseInt(nuevoStock);
    
    if (isNaN(stockNum) || stockNum < 0) {
      Alert.alert('Error', 'Por favor ingresa un valor válido para el stock');
      return;
    }

    setActualizando(true);
    const exito = await onStockActualizado(producto.id, stockNum);
    setActualizando(false);

    if (exito) {
      onCerrar();
    }
  };

  const handleCerrar = () => {
    setNuevoStock(producto.stock.toString());
    onCerrar();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCerrar}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Package size={24} color="#059669" />
              <Text style={styles.titulo}>Actualizar Stock</Text>
            </View>
            <TouchableOpacity onPress={handleCerrar} style={styles.botonCerrar}>
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Producto info */}
          <View style={styles.productoInfo}>
            <Text style={styles.nombreProducto}>{producto.nombre}</Text>
            <Text style={[
              styles.stockActual,
              tieneBajoStock && styles.stockBajo
            ]}>
              Stock actual: {producto.stock}
            </Text>
          </View>

          {/* Controles de stock */}
          <View style={styles.controles}>
            <Text style={styles.label}>Nuevo stock:</Text>
            
            <View style={styles.controlesStock}>
              <TouchableOpacity 
                style={styles.botonControl} 
                onPress={handleDecrementar}
                disabled={actualizando}
              >
                <Minus size={20} color="#374151" />
              </TouchableOpacity>
              
              <TextInput
                style={styles.input}
                value={nuevoStock}
                onChangeText={setNuevoStock}
                keyboardType="numeric"
                editable={!actualizando}
                selectTextOnFocus
              />
              
              <TouchableOpacity 
                style={styles.botonControl} 
                onPress={handleIncrementar}
                disabled={actualizando}
              >
                <Plus size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Indicador visual */}
            <View style={styles.indicador}>
              <View style={[
                styles.barraStock,
                { width: `${Math.min(100, (parseInt(nuevoStock) / 50) * 100)}%` },
                parseInt(nuevoStock) <= umbralBajoStock ? styles.barraBajoStock : styles.barraNormal
              ]} />
              <Text style={styles.textoIndicador}>
                {parseInt(nuevoStock) <= umbralBajoStock ? 'Bajo Stock' : 'Stock Normal'}
              </Text>
            </View>
          </View>

          {/* Botones de acción */}
          <View style={styles.botonesAccion}>
            <TouchableOpacity 
              style={[styles.boton, styles.botonSecundario]}
              onPress={handleCerrar}
              disabled={actualizando}
            >
              <Text style={styles.textoBotonSecundario}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.boton, styles.botonPrimario]}
              onPress={handleGuardar}
              disabled={actualizando}
            >
              <Text style={styles.textoBotonPrimario}>
                {actualizando ? 'Guardando...' : 'Actualizar Stock'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: ShinySundayFont,
  },
  botonCerrar: {
    padding: 4,
  },
  productoInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  nombreProducto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    fontFamily: ShinySundayFont,
  },
  stockActual: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: ShinySundayFont,
  },
  stockBajo: {
    color: '#dc2626',
    fontWeight: '500',
  },
  controles: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
    fontFamily: ShinySundayFont,
  },
  controlesStock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  botonControl: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 12,
    minWidth: 100,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: ShinySundayFont,
    color: '#1f2937',
  },
  indicador: {
    alignItems: 'center',
    gap: 8,
  },
  barraStock: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
  },
  barraNormal: {
    backgroundColor: '#059669',
  },
  barraBajoStock: {
    backgroundColor: '#dc2626',
  },
  textoIndicador: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: ShinySundayFont,
  },
  botonesAccion: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  boton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonPrimario: {
    backgroundColor: '#059669',
  },
  botonSecundario: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  textoBotonPrimario: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: ShinySundayFont,
  },
  textoBotonSecundario: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: ShinySundayFont,
  },
});