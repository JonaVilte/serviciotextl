import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Alert } from 'react-native';

export type Credenciales = {
  email: string;
  password: string;
};

type Usuario = {
  id: string;
  nombre: string;
  email: string;
};

const usarAutenticacion = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iniciarSesion = async (credenciales: Credenciales): Promise<Usuario | null> => {
    setCargando(true);
    setError(null);

    try {
      // Buscar usuario en tu tabla usuarios por email y password
      const { data, error: errorSupabase } = await supabase
        .from('usuarios')
        .select('id, nombre, email')
        .eq('email', credenciales.email)
        .eq('password', credenciales.password) // Nota: Esto no es seguro para producción
        .single();
      console.log(data);
      if (errorSupabase) {
        if (errorSupabase.code === 'PGRST116') {
          setError('Credenciales incorrectas');
        } else {
          setError(errorSupabase.message);
        }
        return null;
      }

      if (!data) {
        setError('Usuario no encontrado');
        return null;
      }

      return data;
    } catch (err) {
      setError('Error inesperado al iniciar sesión');
      return null;
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = (): boolean => {
    // Para autenticación simple, solo limpiamos el estado
    return true;
  };

  return {
    iniciarSesion,
    cerrarSesion,
    cargando,
    error,
  };
};

export default usarAutenticacion;
