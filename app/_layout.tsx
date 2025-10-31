import React, { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native'; 
import { supabase } from '@/lib/supabaseClient';
import { Text } from '@/components/ui/text'
import AlertaBajoStock from '@/src/alertaDeStock';
import ListaDePedidos from '@/src/pedidos/components/listaDePedidos';
import ListaDePedidosAdmin from '@/src/pedidos/components/listaDePedidosParaAdm'

export default function MostrarPedidos() {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Pedidos</Text>
      </View>
      <ListaDePedidosAdmin />   
      <AlertaBajoStock />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
})

