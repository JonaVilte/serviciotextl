import { render } from '@testing-library/react-native';

import TarjetaParaVisualizarUnPedido from '@/src/pedidos';
import React from 'react';
import TarjetaParaVisualizarUnPedidoConSupebase from '@/src/pedidos/pedidosConSupebase';

describe('Registrar pedido - Visualización de Historial - visualizacion de un pedido', () => {
  test('Que tenga el nombre de la persona que encargo el pedido, el estado, precio y fecha de emicion', () => {
    const { getByText } = render(
      <TarjetaParaVisualizarUnPedidoConSupebase
        usuario={{ nombre: "Mario Bargas" }}
        fecha_de_emision={new Date(1999, 8, 10)}
        estado_del_pedio={'completado'}
        precio={2700}
      />
    );

    expect(getByText('Pedido de Mario Bargas')).toBeVisible();
    expect(getByText('Fecha de Emicion: 10/09/1999')).toBeVisible();
    expect(getByText('Estado del Pedido: completado ')).toBeVisible();
    expect(getByText('Precio del Pedido: $2700')).toBeVisible();
  });
});
