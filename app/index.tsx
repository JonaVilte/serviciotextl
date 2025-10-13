import React, { useEffect, useState } from 'react';

import { ScrollView, View, Text } from 'react-native'; 
import { supabase } from '@/lib/supabaseClient';

import TarjetaParaVisualizarUnPedidoConSupebase from '@/src/pedidos/pedidosConSupebase'; 
import AlertaBajoStock from '@/src/alertaDeStock';

export default function ListaDePedidos() {
  const [pedidos, setPedidos] = useState<{ id: string | number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      const { data, error } = await supabase
        .from('pedidos')
        .select('id')
        .order('fecha_emision', { ascending: false });

      if (error) console.error("Error al obtener pedidos:", error);
      setPedidos(data || []);
      setLoading(false);
    };
    fetchPedidos();
  }, []);

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#1e1e1e' }}>
      <ScrollView style={{ padding: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 15 }}>
          Lista de Pedidos ({pedidos.length})
        </Text>

        {loading && <Text style={{ color: '#ccc' }}>Cargando lista de pedidos...</Text>}

        {!loading && pedidos.length === 0 && (
          <Text style={{ color: '#ccc' }}>No hay pedidos registrados en Supabase.</Text>
        )}

        {pedidos.map((p) => (
          <TarjetaParaVisualizarUnPedidoConSupebase key={p.id} pedidoId={p.id} />
        ))}
      </ScrollView>

      <AlertaBajoStock />
    </View>
  );
}
