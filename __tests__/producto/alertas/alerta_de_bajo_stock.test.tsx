import { render } from '@testing-library/react-native';
import AlertaBajoStock from '@/src/productos/components/alertas/alertaDeStock';

describe('Como empleado de una tienda de ropa, me gustaría poder visualizar un mensaje que me advierta del bajo stock', () => {
  test('Muestra alerta cuando hay productos con stock bajo', () => {
    const { getByText } = render(<AlertaBajoStock totalBajoStock={3} umbralBajoStock={5} />);

    expect(getByText('Alerta de Bajo Stock')).toBeTruthy();
    expect(getByText('Tienes 3 productos con stock bajo (≤ 5 unidades)')).toBeTruthy();
  });

  test('Muestra mensaje singular cuando solo hay un producto con stock bajo', () => {
    const { getByText } = render(<AlertaBajoStock totalBajoStock={1} umbralBajoStock={5} />);

    expect(getByText('Tienes 1 producto con stock bajo (≤ 5 unidades)')).toBeTruthy();
  });

  test('No muestra alerta cuando no hay productos con stock bajo', () => {
    const { queryByText } = render(<AlertaBajoStock totalBajoStock={0} umbralBajoStock={5} />);

    expect(queryByText('Alerta de Bajo Stock')).toBeNull();
  });
});
