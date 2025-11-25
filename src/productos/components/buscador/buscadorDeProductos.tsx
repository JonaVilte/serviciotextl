// src/productos/components/buscadores/buscadorProductos.tsx
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Platform,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Text } from '@/components/ui/text';
import { Search, X } from 'lucide-react-native';

export interface BuscadorProductosProps {
  terminoBusqueda: string;
  onTerminoChange: (termino: string) => void;
  placeholder?: string;
}

const ShinySundayFont = Platform.select({ 
  ios: "System", 
  android: "Roboto",
  default: "System"
});

export default function BuscadorProductos({ 
  terminoBusqueda, 
  onTerminoChange,
  placeholder = "Buscar productos..." 
}: BuscadorProductosProps) {
  
  const limpiarBusqueda = () => {
    onTerminoChange('');
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorInput}>
        <Search 
          size={20} 
          color="#6b7280" 
          style={styles.iconoBusqueda} 
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={terminoBusqueda}
          onChangeText={onTerminoChange}
          placeholderTextColor="#9ca3af"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="never"
        />
        {terminoBusqueda.length > 0 && (
          <TouchableOpacity 
            onPress={limpiarBusqueda} 
            style={styles.botonLimpiar}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={18} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 16,
  },
  contenedorInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  iconoBusqueda: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.select({
      ios: 12,
      android: 10,
      default: 12,
    }),
    fontSize: 16,
    fontFamily: ShinySundayFont,
    color: '#1f2937',
  },
  botonLimpiar: {
    padding: 4,
    borderRadius: 12,
  },
});