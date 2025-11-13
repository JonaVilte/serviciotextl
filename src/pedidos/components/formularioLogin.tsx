import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Text } from '@/components/ui/text';
import { Eye, EyeOff } from 'lucide-react-native';
import usarAutenticacion, { Credenciales } from '../hooks/usarAutetincacion';
import { usarSesion } from '@/src/pedidos/hooks/usarSesion';

type Props = {
  onInicioSesionExitoso?: () => void;
};

const FormularioLogin = ({ onInicioSesionExitoso }: Props) => {
  const [credenciales, setCredenciales] = useState<Credenciales>({
    email: '',
    password: '',
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const { iniciarSesion, cargando, error } = usarAutenticacion();
  const { iniciarSesion: iniciarSesionGlobal } = usarSesion();

  const manejarCambio = (campo: keyof Credenciales, valor: string) => {
    setCredenciales((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const manejarEnvio = async () => {
    if (!credenciales.email || !credenciales.password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const usuario = await iniciarSesion(credenciales);

      if (usuario) {
        // Iniciar sesión en el contexto global
        await iniciarSesionGlobal(usuario);
        Alert.alert('Éxito', `Bienvenido ${usuario.nombre}`, [
          {
            text: 'OK',
            onPress: () => {
              onInicioSesionExitoso?.();
            },
          },
        ]);
      } else {
        Alert.alert('Error', error || 'Credenciales incorrectas');
      }
    } catch (err) {
      Alert.alert('Error', 'Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.grupoInput}>
        <Text style={styles.etiqueta}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@email.com"
          value={credenciales.email}
          onChangeText={(valor) => manejarCambio('email', valor)}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!cargando}
        />
      </View>

      <View style={styles.grupoInput}>
        <Text style={styles.etiqueta}>Contraseña</Text>
        <View style={styles.contenedorPassword}>
          <TextInput
            style={[styles.input, styles.inputPassword]}
            placeholder="Tu contraseña"
            value={credenciales.password}
            onChangeText={(valor) => manejarCambio('password', valor)}
            secureTextEntry={!mostrarPassword}
            editable={!cargando}
          />
          <TouchableOpacity
            style={styles.botonOjo}
            onPress={() => setMostrarPassword(!mostrarPassword)}
            disabled={cargando}>
            {mostrarPassword ? (
              <EyeOff size={20} color="#6b7280" />
            ) : (
              <Eye size={20} color="#6b7280" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {error && <Text style={styles.textoError}>{error}</Text>}

      <TouchableOpacity
        style={[styles.botonLogin, cargando && styles.botonDeshabilitado]}
        onPress={manejarEnvio}
        disabled={cargando}>
        <Text style={styles.textoBoton}>{cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}</Text>
      </TouchableOpacity>
    </View>
  );
};

// ... estilos igual que antes ...
const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    gap: 20,
  },
  grupoInput: {
    gap: 8,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  contenedorPassword: {
    position: 'relative',
  },
  inputPassword: {
    paddingRight: 50,
  },
  botonOjo: {
    position: 'absolute',
    right: 16,
    top: 12,
    padding: 4,
  },
  botonLogin: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonDeshabilitado: {
    backgroundColor: '#9ca3af',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  textoError: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FormularioLogin;
