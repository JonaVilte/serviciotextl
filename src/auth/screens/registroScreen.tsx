import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import FormularioRegistro from '../../pedidos/components/formularioRegistro';
import { usarSesion } from '@/src/pedidos/hooks/usarSesion';
import { useEffect } from 'react';

const ShinySundayFont = Platform.select({ ios: 'System', android: 'sans-serif' });

export default function RegistroScreen() {
  const router = useRouter();
  const { usuario, cargando } = usarSesion();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (usuario && !cargando) {
      router.replace('/(tabs)');
    }
  }, [usuario, cargando]);

  const manejarRegistroExitoso = () => {
    // Redirigir al login después del registro exitoso
    Alert.alert('Éxito', 'Cuenta creada correctamente. Ahora puedes iniciar sesión.');
    router.replace('/login');
  };

  const manejarIrALogin = () => {
    router.replace('/login');
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoCargando}>Cargando...</Text>
      </View>
    );
  }

  if (usuario) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#059669" />
        <Text style={styles.textoCargando}>Redirigiendo...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Crear Cuenta</Text>
          <Text style={styles.subtitulo}>Regístrate para comenzar</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <FormularioRegistro
            onRegistroExitoso={manejarRegistroExitoso}
            onIrALogin={manejarIrALogin}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.textoFooter}>Usa un email válido y una contraseña segura</Text>
        </View>
      </View>
    </ScrollView>
  );
}

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
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    fontFamily: ShinySundayFont,
  },
  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: ShinySundayFont,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  textoFooter: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: ShinySundayFont,
  },
});