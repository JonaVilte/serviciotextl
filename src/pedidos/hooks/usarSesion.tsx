// hooks/usarSesion.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  created_at: string;
};

const CLAVE_USUARIO = '@usuario_sesion';

export function usarSesion() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarSesion();
  }, []);

  const cargarSesion = async () => {
    try {
      const usuarioGuardado = await AsyncStorage.getItem(CLAVE_USUARIO);
      
      if (usuarioGuardado) {
        const usuarioData = JSON.parse(usuarioGuardado);
        setUsuario(usuarioData);
      }
    } catch (error) {
      console.error('Error al cargar sesión:', error);
    } finally {
      setCargando(false);
    }
  };

  const iniciarSesion = async (usuarioData: Usuario) => {
    try {
      await AsyncStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuarioData));
      setUsuario(usuarioData);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem(CLAVE_USUARIO);
      setUsuario(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  return {
    usuario,
    cargando,
    iniciarSesion,
    cerrarSesion,
  };
}