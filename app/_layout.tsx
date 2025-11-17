import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { usarSesion } from '@/src/pedidos/hooks/usarSesion';
import { useRouter, useSegments } from 'expo-router';

export default function RootLayout() {
  const { usuario, cargando } = usarSesion();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (cargando) return;

    try {
      // Conversión segura a string
      const currentSegment = String(segments[0] || '');
      const inAuthGroup = currentSegment === 'login' || currentSegment === 'registro';

      if (!usuario && !inAuthGroup) {
        router.push('/login');
      } else if (usuario && inAuthGroup) {
        router.push('/(tabs)');
      }
    } catch (error) {
      console.error('Error en redirección:', error);
    }
  }, [usuario, cargando, segments]);

  if (cargando) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}