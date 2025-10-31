import { render } from '@testing-library/react-native';

import AlertaBajoStock from '@/src/alertaDeStock';

describe.skip('Como empleado de una tienda de ropa (textil), me gustaría poder visualizar un menaje que me advierta del bajo stock, para poder recargar el producto.', () => {
  test('Mensaje visual de bajo stock en la lista de productos.', async () => {
    const { findByText } = render(<AlertaBajoStock />);

    expect(await findByText('Hay bajos stocks en CAMISETAS y CALZAS.')).toBeVisible();
  });
});
