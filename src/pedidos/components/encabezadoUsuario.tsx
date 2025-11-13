import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from '@/components/ui/text';
import { LogOut } from 'lucide-react-native';

type Usuario = {
  id: string;
  nonline: string; // nombre
  email: string;
  created_at: string;
};

type Props = {
  usuario: Usuario | null;
  onCerrarSesion: () => void;
};

const EncabezadoUsuario = ({ usuario, onCerrarSesion }: Props) => {
  const manejarCerrarSesion = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que quieres cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        style: 'destructive',
        onPress: onCerrarSesion,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoUsuario}>
        <Text style={styles.nombre}>Hola, {usuario?.nonline || 'Usuario'}</Text>
        <Text style={styles.email}>{usuario?.email}</Text>
      </View>

      <TouchableOpacity style={styles.botonCerrarSesion} onPress={manejarCerrarSesion}>
        <LogOut size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoUsuario: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
  },
  botonCerrarSesion: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
  },
});

export default EncabezadoUsuario;
