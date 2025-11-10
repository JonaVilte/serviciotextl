import { render, screen , renderHook, waitFor } from '@testing-library/react-native';
import { usarAgregarProducto } from '@/src/pedidos/hooks/usarAgregarProducto';
import ListaDeProductos from '@/src/pedidos/components/listaDeProductos';

describe('Como encargado de ventas de una tienda de ropa (textil), me gustaría poder registrar mis pedidos, para poder llevar un control de las ventas.', () => {
  test.skip('Es posible agregar nuevos ítems al pedido', async () => {
    const { result } = renderHook(() => usarAgregarProducto());
    const success = await result.current.agregarProducto({
        nombre: 'elrayo',
        descripcion: 'el mas veloz',
        precioUnitario: 35000,
        stock: 78,
        categoria: 'Pantalon',
        talla: 'XL',
        color: 'Rojo',
    });

    await waitFor(() => {
      expect(success).toBe(true);
    });
  });

    test('Corroborar que existen 8 pedidos registrados', async () => {
        render(<ListaDeProductos />);

        await waitFor(() => expect(screen.queryByText('Cargando productos...')).toBeNull(), {
        timeout: 3000,
        });
        expect(screen.getByText('Calsa')).toBeTruthy();
        expect(screen.getByText('$2300.00')).toBeTruthy();
        expect(screen.getAllByText('Elástica, frizada y sin puntos')).toBeTruthy();
        expect(screen.getAllByText('Pantalón')).toBeTruthy();
        expect(screen.getAllByText('Stock: 28')).toBeTruthy();
        expect(screen.getAllByText('Talla: M')).toBeTruthy();
        expect(screen.getAllByText('Color: Azul')).toBeTruthy();
    });
})

