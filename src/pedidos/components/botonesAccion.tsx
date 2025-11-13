import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import usarEliminarPedido from '@/src/pedidos/hooks/usarEliminarPedido';

type Props = {
  pedidoId: string;
  onPedidoEliminado?: () => void;
  pedidoEntregado: boolean;
};

const BotonesAccion = ({ pedidoId, onPedidoEliminado, pedidoEntregado }: Props) => {
  const { eliminarPedido, cargando } = usarEliminarPedido();

  const manejarEliminar = () => {
    if (pedidoEntregado) {
      return Alert.alert('No permitido', 'No se pueden eliminar pedidos ya entregados.');
    }

    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro que deseas eliminar este pedido? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const exito = await eliminarPedido(pedidoId);
            if (exito) {
              Alert.alert('Eliminado', 'El pedido fue eliminado correctamente.');
              onPedidoEliminado?.();
            } else {
              Alert.alert('Error', 'No se pudo eliminar el pedido.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.botonEliminar, cargando && { opacity: 0.6 }]}
        onPress={manejarEliminar}
        disabled={cargando}>
        <Trash2 color="#FFFDF6" size={22} />
        <Text style={styles.texto}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  botonEliminar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DC2626', // rojo de advertencia
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  texto: {
    color: '#FFFDF6',
    fontWeight: '600',
  },
});

export default BotonesAccion;
