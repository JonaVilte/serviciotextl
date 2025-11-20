// src/productos/components/alertas/alertaBajoStock.tsx
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { AlertTriangle } from 'lucide-react-native';

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" });

interface AlertaBajoStockProps {
  totalBajoStock: number;
  umbralBajoStock: number;
}

export default function AlertaBajoStock({ 
  totalBajoStock, 
  umbralBajoStock 
}: AlertaBajoStockProps) {
  if (totalBajoStock === 0) return null;

  return (
    <View style={styles.contenedor}>
      <AlertTriangle size={20} color="#dc2626" style={styles.icono} />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>Alerta de Bajo Stock</Text>
        <Text style={styles.mensaje}>
          {totalBajoStock === 1 
            ? `Tienes 1 producto con stock bajo (≤ ${umbralBajoStock} unidades)`
            : `Tienes ${totalBajoStock} productos con stock bajo (≤ ${umbralBajoStock} unidades)`
          }
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  icono: {
    marginRight: 12,
  },
  contenido: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4,
    fontFamily: ShinySundayFont,
  },
  mensaje: {
    fontSize: 14,
    color: '#991b1b',
    fontFamily: ShinySundayFont,
    lineHeight: 20,
  },
});