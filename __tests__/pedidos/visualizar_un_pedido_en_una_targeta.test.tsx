import React from 'react';
import { render } from '@testing-library/react-native';

// 👇 Importamos el mock automáticamente

import TarjetaParaVisualizarUnPedidoConSupebase from '@/src/pedidos/pedidosConSupebase';
jest.mock('../../lib/__mock__/mockDeSupebase');

describe('Registrar pedido - Visualización de Historial - visualización de un pedido', () => {
  test('Que tenga el nombre de la persona que encargó el pedido, el estado, precio y fecha de emisión', async () => {
    const { findByText } = render(
      <TarjetaParaVisualizarUnPedidoConSupebase
        usuario={{ nombre: 'Ma' }}
        fecha_de_emision={new Date(2025, 7, 27)}
        estado_del_pedio={'en_proceso'}
        precio={19100}
      />
    );

    expect(await findByText('Pedido de Ma')).toBeVisible();
    expect(await findByText('Fecha de Emisión: 27/08/2025')).toBeVisible();
    expect(await findByText('Estado del Pedido: en_proceso')).toBeVisible();
    expect(await findByText('Precio del Pedido: $19100.00')).toBeVisible();
  });
});
