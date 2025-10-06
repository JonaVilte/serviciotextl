import { render } from '@testing-library/react-native';

import TarjetaParaVisualizarUnPedido from '@/src/pedidos';

describe('Registrar pedido - Visualización de Historial - visualizacion de un pedido', () => {
  test('Que tenga el nombre de la persona que encargo el pedido, el estado, precio y fecha de emicion', () => {
    const { getByText } = render(
      <TarjetaParaVisualizarUnPedido
        nombre_del_encargado={'Mario Bargas'}
        fecha_de_emision={new Date(1999, 8, 10)}
        estado_del_pedio={'completado'}
        precio={2700}
      />
    );

    expect(getByText('Nombre del Encargada del Pedido: Mario Bargas')).toBeVisible();
    expect(getByText('Fecha de Emicion: 10/09/1999')).toBeVisible();
    expect(getByText('El Estado del Pedido: Completado ')).toBeVisible();
    expect(getByText('Precio del Pedido: 2700 $')).toBeVisible();
  });
});
