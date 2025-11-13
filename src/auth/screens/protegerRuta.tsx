import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { usarSesion } from '@/src/pedidos/hooks/usarSesion';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const ProtegerRuta = ({ children }: Props) => {
  const { usuario, cargando } = usarSesion();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !usuario) {
      router.replace('/login');
    }
  }, [usuario, cargando]);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#059669" />
        <Text style={styles.textoCargando}>Verificando sesión...</Text>
      </View>
    );
  }

  if (!usuario) {
    return null;
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textoCargando: {
    marginTop: 15,
    color: '#6b7280',
    fontSize: 16,
  },
});

export default ProtegerRuta;
