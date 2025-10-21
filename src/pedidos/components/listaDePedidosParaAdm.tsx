import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import TarjetaParaVisualizarUnPedido from '@/src/pedidos/components/index';
import usarPedidos from '@/src/pedidos/hooks/index';
import TarjetaParaEditarPedido from './tarjetaParaEditarPedido';

const ListaDePedidosAdmin = () => {
  const { pedidos, error, loading, recargarPedidos } = usarPedidos();

  if (loading) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.textoCargando}>Cargando pedidos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoError}>Hubo un problema al cargar los pedidos.</Text>
      </View>
    );
  }
  const listaPedidos = pedidos();

  if (listaPedidos.length === 0) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoVacio}>No hay pedidos registrados.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.lista}>
      {listaPedidos.map((pedido) => (
        <View key={pedido.id} style={styles.contenedorTarjeta}>
          <TarjetaParaEditarPedido
            pedidoId={pedido.id}
            nombre_del_encargado={pedido.usuario_nombre}
            fecha_de_emision={new Date(pedido.fecha_emision)}
            estado_del_pedido={pedido.estado as 'completado' | 'en_proceso' | 'evaluando'}
            precio={pedido.total}
            onEstadoActualizado={recargarPedidos}

          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lista: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  contenedorTarjeta: {
    marginBottom: 16,
    width: '95%',
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  textoCargando: {
    marginTop: 10,
    color: '#6b7280',
    fontSize: 16,
  },
  textoError: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
  },
  textoVacio: {
    color: '#9ca3af',
    fontSize: 16,
  },
});

export default ListaDePedidosAdmin;
