import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { supabase } from '@/lib/supabaseClient';
import { Text } from '@/components/ui/text';
import { ArrowLeft } from 'lucide-react-native'; // ✅ Flecha real
import ListaDePedidosAdmin from '@/src/pedidos/components/listaDePedidosParaAdm';

const ShinySundayFont = Platform.select({ ios: 'System', android: 'sans-serif' });

export default function MostrarPedidos() {
  const [pedidos, setPedidos] = useState<{ id: string | number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      const { data, error } = await supabase
        .from('pedidos')
        .select('id')
        .order('fecha_emision', { ascending: false });

      if (error) console.error('Error al obtener pedidos:', error);
      setPedidos(data || []);
      setLoading(false);
    };
    fetchPedidos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => console.log('Navegar hacia atrás')}
        >
          <ArrowLeft color="#FFFDF6" size={28} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={styles.title}>Gestión de Pedidos</Text>
      </View>

      <ListaDePedidosAdmin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF6',
  },
  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0, // ✅ sin borde
    elevation: 0, // ✅ sin sombra en Android
    shadowColor: 'transparent', // ✅ sin sombra en iOS
  },
  backButton: {
    paddingRight: 10,
    paddingVertical: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFDF6',
    fontFamily: ShinySundayFont,
    flex: 1,
  },
});
