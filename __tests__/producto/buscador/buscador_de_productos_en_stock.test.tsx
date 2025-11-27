import { act, renderHook, render, waitFor } from '@testing-library/react-native';
import { useBuscarProductos } from '../../../src/productos/hooks/usarBuscarProductos';
import TarjetaProducto from '@/src/productos/components/tarjetas/tarjetaDeProducto';

describe('Como vendedor, quiero poder buscar productos disponibles en el stock, para encontrar rápidamente los artículos que necesito agregar a un pedido.', () => {

    test('El buscador muestra coincidencias por nombre.', async () => {
      const { result } = renderHook(() => useBuscarProductos());

      act(() => {
        result.current.setTerminoBusqueda('Pato');
      });

    await waitFor(() => {
      expect(result.current.buscando).toBe(false);
    });
  
      expect(result.current.productosFiltrados).toHaveLength(1);
      expect(result.current.productosFiltrados[0].nombre).toBe('Pato');
    });


    test('En caso de buscar un producto inexistente, debe de mandar un mensaje diciendo de la inexistencia del producto. ', async () => {
        const { result } = renderHook(() => useBuscarProductos());

        act(() => {
            result.current.setTerminoBusqueda('zapatos deportivos');
        });

    await waitFor(() => {
      expect(result.current.buscando).toBe(false);
    });
        expect(result.current.noSeEncontraronProductos).toBe(true);
        expect(result.current.productosFiltrados).toHaveLength(0);
    });


    test('El buscador muestra los producto sin stock con una marca', async () => {

    const producto = {
      id: '2',
      nombre: 'Vestido',
      descripcion: 'Cómodo y lindo',
      precio: 3000.00,
      stock: 2,
      categoria: 'Vestido',
      talla: 'M',
      color: 'Verde'
    };

      const { result } = renderHook(() => useBuscarProductos());

      act(() => {
        result.current.setTerminoBusqueda('vestido');
      });

    await waitFor(() => {
      expect(result.current.buscando).toBe(false);
    });

    const { getByText } = render(
      <TarjetaProducto 
        producto={producto} 
        onActualizarStock={async () => true}
      />
    );
    
    expect(getByText('Bajo Stock')).toBeTruthy();
  });})