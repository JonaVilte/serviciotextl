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

    const inAuthGroup = segments[0] === 'login';

    if (!usuario && !inAuthGroup) {
      // Redirigir al login si no hay usuario
      router.replace('/login');
    } else if (usuario && inAuthGroup) {
      // Redirigir al home si ya está autenticado
      router.replace('/(tabs)');
    }
  }, [usuario, cargando, segments]);

  if (cargando) {
    return null; // O un componente de loading
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
