// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { usarSesion } from '../src/pedidos/hooks/usarSesion';
import { useRouter, useSegments } from 'expo-router';

export default function RootLayout() {
  const { usuario, cargando } = usarSesion();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (cargando) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'registro';

    if (!usuario && !inAuthGroup) {
      router.replace('/login');
    } else if (usuario && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [usuario, cargando, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}