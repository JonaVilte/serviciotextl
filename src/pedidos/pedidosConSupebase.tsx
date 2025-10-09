import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

type TarjetaProps = {
  pedidoId?: string | number;
  usuario?: { nombre: string };
  fecha_de_emision?: Date | string;
  estado_del_pedio?: string;
  precio?: number;
};

// Pedido sigue esperando un único objeto de usuario
type Pedido = {
  id: string | number;
  fecha_emision: string;
  estado: string;
  total: number;
  usuario: { nombre: string };
};

export default function TarjetaParaVisualizarUnPedidoConSupebase({
  pedidoId,
  usuario,
  fecha_de_emision,
  estado_del_pedio,
  precio,
}: TarjetaProps) {
  const [pedido, setPedido] = useState<Pedido | null>(
    usuario
      ? {
          id: pedidoId ?? 'mock-id',
          fecha_emision: fecha_de_emision?.toString() ?? '',
          estado: estado_del_pedio ?? '',
          total: precio ?? 0,
          usuario: usuario,
        }
      : null
  );

  useEffect(() => {
    if (!pedidoId) return; // si no hay pedidoId, no busques en supabase
    async function cargarPedido() {
      const { data, error } = await supabase
        .from('pedidos')
        .select('id, fecha_emision, estado, total, usuario:usuario_id(nombre)')
        .eq('id', pedidoId)
        .single();

      if (error) {
        console.error(`Error al cargar el pedido con ID ${pedidoId}:`, error);
        return;
      }

      const rawData = data as any;
      setPedido({
        id: rawData.id,
        fecha_emision: rawData.fecha_emision,
        estado: rawData.estado,
        total: rawData.total,
        usuario: Array.isArray(rawData.usuario) ? rawData.usuario[0] : rawData.usuario,
      });
    }

    cargarPedido();
  }, [pedidoId]);

  if (!pedido) {
    return (
      <div
        style={{
          padding: 15,
          margin: 10,
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: 8,
        }}>
        Cargando pedido con ID: {pedidoId}...
      </div>
    );
  }

  const fechaFormateada = new Date(pedido.fecha_emision).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const totalFormateado = pedido.total.toFixed(2);

  return (
    <Card className="w-full max-w-sm rounded-2xl bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Pedido de {pedido.usuario.nombre}{' '}
        </CardTitle>

        <CardDescription className="text-sm text-gray-500">
          Fecha de Emisión: {fechaFormateada}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <View className="gap-2">
          <Text>Estado del Pedido: {pedido.estado}</Text>
          <Text>Precio del Pedido: ${totalFormateado}</Text>
        </View>
      </CardContent>
    </Card>
  );
}
