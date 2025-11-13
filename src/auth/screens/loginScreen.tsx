import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import FormularioLogin from '../../pedidos/components/formularioLogin';
import { usarSesion } from '@/src/pedidos/hooks/usarSesion';
import { useEffect } from 'react';

const ShinySundayFont = Platform.select({ ios: 'System', android: 'sans-serif' });
const ACCENT_COLOR = '#059669';

export default function LoginScreen() {
  const router = useRouter();
  const { usuario, cargando } = usarSesion();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (usuario && !cargando) {
      console.log('Usuario autenticado, redirigiendo a home');
      router.replace('/(tabs)');
    }
  }, [usuario, cargando]);

  const manejarInicioSesionExitoso = () => {
    console.log('Inicio de sesión exitoso, redirigiendo...');
    // La redirección se manejará automáticamente por el efecto de arriba
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoCargando}>Cargando...</Text>
      </View>
    );
  }

  // Si ya hay usuario, no mostrar el login (será redirigido por el efecto)
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
          <Text style={styles.titulo}>Bienvenido</Text>
          <Text style={styles.subtitulo}>Inicia sesión en tu cuenta para continuar</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <FormularioLogin onInicioSesionExitoso={manejarInicioSesionExitoso} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.textoFooter}>Usa tu email y contraseña registrados</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Agregar el estilo para ActivityIndicator
const styles = StyleSheet.create({
  // ... tus estilos existentes ...
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
