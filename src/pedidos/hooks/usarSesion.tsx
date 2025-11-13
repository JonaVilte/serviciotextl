'use client';

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
};

const CLAVE_USUARIO = '@usuario_sesion';

export function usarSesion() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  // Guardar usuario en AsyncStorage
  const guardarUsuario = async (usuarioData: Usuario | null) => {
    try {
      if (usuarioData) {
        await AsyncStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuarioData));
      } else {
        await AsyncStorage.removeItem(CLAVE_USUARIO);
      }
    } catch (error) {
      console.error('Error guardando sesión:', error);
    }
  };

  // Cargar usuario desde AsyncStorage
  const cargarSesion = async () => {
    try {
      setCargando(true);

      const usuarioGuardado = await AsyncStorage.getItem(CLAVE_USUARIO);

      if (usuarioGuardado) {
        const usuarioData = JSON.parse(usuarioGuardado);
        setUsuario(usuarioData);
      } else {
        setUsuario(null);
      }
    } catch (err) {
      console.error('Error al cargar sesión:', err);
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  const iniciarSesion = async (usuarioData: Usuario) => {
    setUsuario(usuarioData);
    await guardarUsuario(usuarioData);
  };

  const cerrarSesion = async () => {
    setUsuario(null);
    await guardarUsuario(null);
  };

  useEffect(() => {
    cargarSesion();
  }, []);

  return {
    usuario,
    cargando,
    cerrarSesion,
    iniciarSesion,
    recargarUsuario: cargarSesion,
  };
}
