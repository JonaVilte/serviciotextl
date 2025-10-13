import React from 'react';
import { render } from '@testing-library/react-native';

import TarjetaParaVisualizarUnPedidoConSupebase from '@/src/pedidos/components/index';

describe('Registrar pedido - Visualización de Historial - visualización de un pedido', () => {
  test('Que tenga el nombre de la persona que encargó el pedido, el estado, precio y fecha de emisión', async () => {
    const { findByText } = render(
      <TarjetaParaVisualizarUnPedidoConSupebase
        nombre_del_encargado={ 'Ma' }
        fecha_de_emision={new Date(2025, 7, 27)}
        estado_del_pedido={'en proceso'}
        precio={19100}
      />
    );

    expect(await findByText('Pedido de Ma')).toBeVisible();
    expect(await findByText('Fecha de Emisión: 27/8/2025, 12:00:00')).toBeVisible();
    expect(await findByText('Estado del Pedido: en proceso')).toBeVisible();
    expect(await findByText('Precio del Pedido: $19100')).toBeVisible();
  });
});
