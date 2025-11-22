// src/productos/components/editores/editorStock.tsx
import { useState } from 'react';
import { View, StyleSheet, Platform, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Text } from '@/components/ui/text';
import { Plus, Minus, Check } from 'lucide-react-native';

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" });

interface EditorStockProps {
  productoId: string;
  stockActual: number;
  onStockActualizado: (productoId: string, nuevoStock: number) => Promise<boolean>;
  umbralBajoStock: number;
}

export default function EditorStock({ 
  productoId, 
  stockActual, 
  onStockActualizado,
  umbralBajoStock 
}: EditorStockProps) {
  const [editando, setEditando] = useState(false);
  const [nuevoStock, setNuevoStock] = useState(stockActual.toString());
  const [actualizando, setActualizando] = useState(false);

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
    const exito = await onStockActualizado(productoId, stockNum);
    setActualizando(false);

    if (exito) {
      setEditando(false);
    }
  };

  const handleCancelar = () => {
    setNuevoStock(stockActual.toString());
    setEditando(false);
  };

  if (!editando) {
    return (
      <TouchableOpacity 
        style={[
          styles.botonEditar,
          stockActual <= umbralBajoStock && styles.botonEditarBajoStock
        ]}
        onPress={() => setEditando(true)}
      >
        <Text style={styles.textoBoton}>
          Stock: {stockActual} {stockActual <= umbralBajoStock && '⚠️'}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.contenedorEditor}>
      <View style={styles.controles}>
        <TouchableOpacity 
          style={styles.botonControl} 
          onPress={handleDecrementar}
          disabled={actualizando}
        >
          <Minus size={16} color="#374151" />
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
          <Plus size={16} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.botonesAccion}>
        <TouchableOpacity 
          style={[styles.botonAccion, styles.botonCancelar]}
          onPress={handleCancelar}
          disabled={actualizando}
        >
          <Text style={styles.textoBotonCancelar}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.botonAccion, styles.botonGuardar]}
          onPress={handleGuardar}
          disabled={actualizando}
        >
          <Check size={16} color="#ffffff" />
          <Text style={styles.textoBotonGuardar}>
            {actualizando ? 'Guardando...' : 'Guardar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botonEditar: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  botonEditarBajoStock: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  textoBoton: {
    color: '#065f46',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: ShinySundayFont,
  },
  contenedorEditor: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  botonControl: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
    minWidth: 80,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: ShinySundayFont,
    color: '#1f2937',
  },
  botonesAccion: {
    flexDirection: 'row',
    gap: 8,
  },
  botonAccion: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  botonCancelar: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  botonGuardar: {
    backgroundColor: '#059669',
  },
  textoBotonCancelar: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: ShinySundayFont,
  },
  textoBotonGuardar: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: ShinySundayFont,
  },
});