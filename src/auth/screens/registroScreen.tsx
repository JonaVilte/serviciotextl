// app/registro.tsx
import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Platform,
  Alert 
} from 'react-native';
import { Text } from '@/components/ui/text';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import usarAutenticacion from '@/src/pedidos/hooks/usarAutetincacion';

export default function RegistroScreen() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  
  const router = useRouter();
  const { registrarse, cargando, error } = usarAutenticacion();

  const manejarRegistro = async () => {
    if (!nombre || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const usuario = await registrarse({ nombre, email, password });
      
      if (usuario) {
        Alert.alert(
          'Cuenta creada', 
          'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else {
        Alert.alert('Error', error || 'Error al crear la cuenta');
      }
    } catch (err) {
      Alert.alert('Error', 'Error al crear la cuenta');
    }
  };

  const irALogin = () => {
    router.push('/login');
  };

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
          {/* Nombre Input */}
          <View style={styles.inputContainer}>
            <User size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
              editable={!cargando}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Mail size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!cargando}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Lock size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!mostrarPassword}
              editable={!cargando}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setMostrarPassword(!mostrarPassword)}>
              {mostrarPassword ? (
                <EyeOff size={20} color="#6b7280" />
              ) : (
                <Eye size={20} color="#6b7280" />
              )}
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, cargando && styles.buttonDisabled]}
            onPress={manejarRegistro}
            disabled={cargando}>
            <Text style={styles.registerButtonText}>
              {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={irALogin} disabled={cargando}>
            <Text style={styles.loginText}>
              ¿Ya tienes cuenta? <Text style={styles.loginLink}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  registerButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginText: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#059669',
    fontWeight: '600',
  },
});