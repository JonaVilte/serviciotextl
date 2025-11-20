// src/productos/components/indicadores/indicadorBajoStock.tsx
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { AlertTriangle } from 'lucide-react-native';

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" });

interface IndicadorBajoStockProps {
  stock: number;
  umbralBajoStock: number;
}

export default function IndicadorBajoStock({ 
  stock, 
  umbralBajoStock 
}: IndicadorBajoStockProps) {
  if (stock > umbralBajoStock) return null;

  return (
    <View style={styles.contenedor}>
      <AlertTriangle size={14} color="#dc2626" />
      <Text style={styles.texto}>
        Bajo stock: {stock} unidades
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  texto: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: ShinySundayFont,
  },
});