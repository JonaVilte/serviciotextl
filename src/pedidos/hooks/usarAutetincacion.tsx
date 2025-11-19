// hooks/usarAutenticacion.ts
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Alert } from 'react-native';

export type Credenciales = {
  email: string;
  password: string;
};

export type DatosRegistro = {
  nombre: string;
  email: string;
  password: string;
};

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  created_at: string;
};

const usarAutenticacion = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limpiarError = () => setError(null);

  const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validarPassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const iniciarSesion = async (credenciales: Credenciales): Promise<Usuario | null> => {
    setCargando(true);
    limpiarError();

    try {
      if (!credenciales.email || !credenciales.password) {
        setError('Email y contraseña son requeridos');
        return null;
      }

      if (!validarEmail(credenciales.email)) {
        setError('Por favor ingresa un email válido');
        return null;
      }

      const { data, error: errorSupabase } = await supabase
        .from('usuarios')
        .select('id, nombre, email, created_at')
        .eq('email', credenciales.email)
        .eq('password', credenciales.password)
        .single();

      if (errorSupabase) {
        setError('Credenciales incorrectas');
        return null;
      }

      return data;
    } catch (err) {
      setError('Error al iniciar sesión');
      return null;
    } finally {
      setCargando(false);
    }
  };

  const registrarse = async (datos: DatosRegistro): Promise<Usuario | null> => {
    setCargando(true);
    limpiarError();

    try {
      if (!datos.nombre || !datos.email || !datos.password) {
        setError('Todos los campos son requeridos');
        return null;
      }

      if (!validarEmail(datos.email)) {
        setError('Por favor ingresa un email válido');
        return null;
      }

      if (!validarPassword(datos.password)) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return null;
      }

      // Verificar si el usuario ya existe
      const { data: usuarioExistente } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', datos.email)
        .single();

      if (usuarioExistente) {
        setError('Ya existe un usuario con este email');
        return null;
      }

      // Crear nuevo usuario
      const { data, error: errorSupabase } = await supabase
        .from('usuarios')
        .insert([
          {
            nombre: datos.nombre,
            email: datos.email,
            password: datos.password,
            created_at: new Date().toISOString(),
          },
        ])
        .select('id, nombre, email, created_at')
        .single();

      if (errorSupabase) {
        setError('Error al crear la cuenta');
        return null;
      }

      return data;
    } catch (err) {
      setError('Error al crear la cuenta');
      return null;
    } finally {
      setCargando(false);
    }
  };

  return {
    iniciarSesion,
    registrarse,
    cargando,
    error,
    limpiarError,
  };
};

export default usarAutenticacion;