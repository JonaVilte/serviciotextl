import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

//type AlertaBajoStockProps = {
//  productos?: string[]
//  mensaje?: string
//}

//export default function AlertaBajoStock({ productos = ["camisetas", "calzas"], mensaje }: AlertaBajoStockProps) {
//  const mensajeAlerta = mensaje || `Alerta de bajo stock en ${productos.join(" y ")}`

export default function AlertaBajoStock() {
  return (
    <View style={styles.alertContainer}>
      <Alert variant="destructive" icon={AlertCircleIcon}>
        <AlertTitle>Hay bajos stocks en CAMISETAS y CALZAS.</AlertTitle>
        <AlertDescription>Por favor reincorporar los productos de bajo stock.</AlertDescription>
      </Alert>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute', 
    bottom: 20,
    right: 20,
    zIndex: 999, 
    elevation: 10, 
  },
});

