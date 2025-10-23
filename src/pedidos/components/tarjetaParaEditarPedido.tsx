'use client';

import { useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import actualizarEstadoPedido from '@/src/pedidos/hooks/actulizarEstadoDePedido';

type Props = {
  pedidoId: string;
  nombre_del_encargado: string;
  fecha_de_emision: Date;
  estado_del_pedido: 'completado' | 'en_proceso' | 'evaluando' | 'entregado';
  precio: number;
  onEstadoActualizado?: () => void;
};

const TarjetaParaEditarPedido = ({
  pedidoId,
  nombre_del_encargado,
  fecha_de_emision,
  estado_del_pedido,
  precio,
  onEstadoActualizado,
}: Props) => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };

  const [estadoActual, setEstadoActual] = useState(estado_del_pedido);
  const { actualizarEstado, cargando, error } = actualizarEstadoPedido();

  const pedidoEntregado = estadoActual === 'entregado';

  const manejarCambioEstado = async (
    nuevoEstado: 'completado' | 'en_proceso' | 'evaluando' | 'entregado'
  ) => {
    if (pedidoEntregado) {
      Alert.alert(
        'Pedido Entregado',
        'No se puede modificar el estado de un pedido que ya fue entregado.',
        [{ text: 'Entendido' }]
      );
      return;
    }

    const exito = await actualizarEstado(pedidoId, nuevoEstado);

    if (exito) {
      setEstadoActual(nuevoEstado);
      Alert.alert('¡Éxito!', `El estado del pedido se actualizó a "${nuevoEstado}"`, [
        { text: 'OK' },
      ]);
      if (onEstadoActualizado) {
        onEstadoActualizado();
      }
    } else {
      Alert.alert('Error', error || 'No se pudo actualizar el estado del pedido', [{ text: 'OK' }]);
    }
  };

  const obtenerEstilosEstado = (estado: string) => {
    switch (estado) {
      case 'completado':
        return { backgroundColor: '#d1fae5', color: '#059669' };
      case 'en proceso':
        return { backgroundColor: '#d1fae5', color: '#059669' };
      case 'evaluando':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'entregado':
        return { backgroundColor: '#e0e7ff', color: '#4f46e5' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#6b7280' };
    }
  };

  const estilosEstado = obtenerEstilosEstado(estadoActual);

  const formatearFecha = (fecha: Date) => {
    const dia = fecha.getDate();
    const meses = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ];
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${dia} ${mes} ${año}, ${horas}:${minutos}`;
  };

  return (
    <Card style={styles.tarjeta}>
      <CardContent style={styles.contenido}>
        {pedidoEntregado && (
          <View style={styles.bannerEntregado}>
            <View style={styles.filaIcono}>
              <View style={styles.iconoCheck}>
                <Text style={styles.textoCheck}>✓</Text>
              </View>
              <Text style={styles.tituloEntregado}>Pedido Entregado</Text>
            </View>
            <Text style={styles.mensajeEntregado}>
              Este pedido ya fue entregado y no puede ser modificado.
            </Text>
          </View>
        )}

        <Text style={styles.paraNombre}>Pedido de {nombre_del_encargado}</Text>

        <Text style={styles.fecha}>Fecha de Emisión: {fecha_de_emision.toLocaleString()}</Text>

        <Text style={styles.precio}>Precio del Pedido: {precio.toFixed(2)}$</Text>

        <View style={styles.contenedorInferior}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TouchableOpacity
                testID="boton-estado-pedido"
                style={[styles.badgeEstado, { backgroundColor: estilosEstado.backgroundColor }]}
                disabled={cargando || pedidoEntregado}>
                {cargando ? (
                  <ActivityIndicator size="small" color={estilosEstado.color} />
                ) : (
                  <View style={styles.filaBadge}>
                    <Text style={[styles.textoEstado, { color: estilosEstado.color }]}>
                      {estadoActual === 'en_proceso'
                        ? 'En Proceso'
                        : estadoActual.charAt(0).toUpperCase() + estadoActual.slice(1)}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </DropdownMenuTrigger>

            {!pedidoEntregado && (
              <DropdownMenuContent
                insets={contentInsets}
                sideOffset={2}
                className="w-56"
                align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem onPress={() => manejarCambioEstado('evaluando')}>
                    <View style={styles.itemMenu}>
                      <View style={[styles.indicadorEstado, { backgroundColor: '#eab308' }]} />
                      <Text style={styles.textoMenu}>evaluando</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem onPress={() => manejarCambioEstado('en_proceso')}>
                    <View style={styles.itemMenu}>
                      <View style={[styles.indicadorEstado, { backgroundColor: '#059669' }]} />
                      <Text style={styles.textoMenu}>en proceso</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    testID="opcion-completado"
                    onPress={() => manejarCambioEstado('completado')}>
                    <View style={styles.itemMenu}>
                      <View style={[styles.indicadorEstado, { backgroundColor: '#059669' }]} />
                      <Text style={styles.textoMenu}>completado</Text>
                    </View>
                  </DropdownMenuItem>

                  <DropdownMenuItem onPress={() => manejarCambioEstado('entregado')}>
                    <View style={styles.itemMenu}>
                      <View style={[styles.indicadorEstado, { backgroundColor: '#4f46e5' }]} />
                      <Text style={styles.textoMenu}>entregado</Text>
                    </View>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          <View style={styles.botonesAccion}>
            <TouchableOpacity style={styles.botonIcono} disabled={pedidoEntregado}>
              <Text style={styles.iconoEditar}>✎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonIcono}>
              <Text style={styles.iconoChevron}>⌄</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    padding: 0,
  },
  contenido: {
    padding: 20,
    gap: 12,
  },
  bannerEntregado: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fbbf24',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  filaIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconoCheck: {
    width: 20,
    height: 20,
    backgroundColor: '#f59e0b',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCheck: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tituloEntregado: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400e',
  },
  mensajeEntregado: {
    fontSize: 11,
    color: '#92400e',
    marginTop: 4,
    marginLeft: 28,
  },
  paraNombre: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '400',
  },
  fecha: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '600',
    marginTop: -4,
  },
  precio: {
    fontSize: 32,
    color: '#059669',
    fontWeight: '700',
    marginTop: 4,
  },
  contenedorInferior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  badgeEstado: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 130,
  },
  filaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconoRefresh: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '600',
  },
  textoEstado: {
    fontSize: 14,
    fontWeight: '600',
  },
  botonesAccion: {
    flexDirection: 'row',
    gap: 8,
  },
  botonIcono: {
    width: 44,
    height: 44,
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoEditar: {
    fontSize: 18,
    color: '#059669',
  },
  iconoChevron: {
    fontSize: 20,
    color: '#6b7280',
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  indicadorEstado: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  textoMenu: {
    fontSize: 15,
    color: '#374151',
  },
});

export default TarjetaParaEditarPedido;
