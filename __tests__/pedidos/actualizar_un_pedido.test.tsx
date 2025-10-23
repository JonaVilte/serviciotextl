import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ListaDePedidosAdmin from '@/src/pedidos/components/listaDePedidosParaAdm';

jest.mock('@/src/pedidos/hooks/index', () => jest.fn());

jest.mock('@/src/pedidos/components/tarjetaParaEditarPedido', () => {
  const React = require('react');
  const { Pressable, Text } = require('react-native');
  return ({ onEstadoActualizado }: any) => (
    <Pressable testID="boton-actualizar" onPress={onEstadoActualizado}>
      <Text>Actualizar estado</Text>
    </Pressable>
  );
});

import usarPedidos from '@/src/pedidos/hooks/index';

describe('ListaDePedidosAdmin', () => {
  it('permite actualizar el estado del pedido', async () => {
    const recargarPedidosMock = jest.fn();

    (usarPedidos as jest.Mock).mockReturnValue({
      pedidos: () => [
        {
          id: '1',
          usuario_nombre: 'Juan Pérez',
          fecha_emision: new Date().toISOString(),
          estado: 'en_proceso',
          total: 1200,
        },
      ],
      error: null,
      loading: false,
      recargarPedidos: recargarPedidosMock,
    });

    const { getByTestId } = render(<ListaDePedidosAdmin />);

    const boton = getByTestId('boton-actualizar');

    fireEvent.press(boton);

    await waitFor(() => {
      expect(recargarPedidosMock).toHaveBeenCalledTimes(1);
    });
  });
});
