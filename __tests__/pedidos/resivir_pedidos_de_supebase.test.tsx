import React from 'react';
import { render, renderHook, waitFor } from '@testing-library/react-native';

import usarPedidos from '@/src/pedidos/hooks/index';

describe('Registrar pedido - Visualización de Historial - visualización de un pedido', () => {
  test('Que tenga el nombre de la persona que encargó el pedido, el estado, precio y fecha de emisión', async () => {
    const { result } = renderHook(() => usarPedidos());

    expect(result.current.pedidos().length).toBe(0);

    await waitFor(() => expect(result.current.pedidos().length).toBe(8));
  });
});
