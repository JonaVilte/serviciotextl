import React, { useEffect, useState } from 'react';
// Asumo ScrollView de React Native o View/ScrollView si estás usando Next.js/Expo Web
import { ScrollView, View, Text } from 'react-native'; 
import { supabase } from '@/lib/supabaseClient';

// Asegúrate que la ruta de importación sea correcta según tu estructura
import TarjetaParaVisualizarUnPedidoConSupebase from '@/src/pedidos/pedidosConSupebase'; 

export default function ListaDePedidos() {
  const [pedidos, setPedidos] = useState<{ id: string | number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      // 1. Solo consultamos los IDs de todos los pedidos (es más ligero)
      const { data, error } = await supabase
        .from('pedidos')
        .select('id')
        .order('fecha_emision', { ascending: false }); 

      if (error) {
        console.error("Error al obtener la lista de IDs de pedidos:", error);
      }
      
      setPedidos(data || []);
      setLoading(false);
    };
    
    fetchPedidos();
  }, []);

  return (
    <ScrollView style={{ padding: 10, backgroundColor: '#1e1e1e' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 15 }}>
        Lista de Pedidos ({pedidos.length})
      </Text>
      
      {loading && <Text style={{ color: '#ccc' }}>Cargando lista de pedidos...</Text>}
      
      {/* Si no está cargando y no hay pedidos */}
      {!loading && pedidos.length === 0 && (
        <Text style={{ color: '#ccc' }}>No hay pedidos registrados en Supabase.</Text>
      )}

      {/* 2. Iteramos y pasamos el ID a la Tarjeta */}
      {pedidos.map((p) => (
        <TarjetaParaVisualizarUnPedidoConSupebase 
          key={p.id} 
          pedidoId={p.id} // 👈 ¡Clave! Se pasa el ID a la tarjeta
        />
      ))}
    </ScrollView>
  );
}