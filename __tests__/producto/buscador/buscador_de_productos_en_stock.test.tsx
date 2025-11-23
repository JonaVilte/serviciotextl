import { act, renderHook, render } from '@testing-library/react-native';
import { useBuscarProductos } from '../../../src/productos/hooks/usarBuscarProductos';
import TarjetaProducto from '@/src/productos/components/tarjetas/tarjetaDeProducto';

describe('Como vendedor, quiero poder buscar productos disponibles en el stock, para encontrar rápidamente los artículos que necesito agregar a un pedido.', () => {
    const productoUno={
        id: '309438cb-2902-4e48-8145-9d5e49d12975',
        nombre: 'Pato',
        descripcion: 'Linfoy frescoo',
        precio: 16800.00,
        stock: 44,
        categoria: 'Pato',
        talla: 'M',
        color: 'Azul'
    }
    const productoDos={
        id: 'd27019d1-78d2-4ec3-9d9a-e61f36aa9f63',
        nombre: 'Vestido',
        descripcion: 'Cómodo y lindo',
        precio: 3000.00,
        stock: 2,
        categoria: 'Vestido',
        talla: 'M',
        color: 'Verde'
    }

    test('El buscador muestra coincidencias por nombre.', async () => {
      const { result } = renderHook(() => useBuscarProductos({ 
        productos: [productoUno]
      }));

      act(() => {
        result.current.setTerminoBusqueda('pato');
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      expect(result.current.productosFiltrados).toHaveLength(1);
      expect(result.current.productosFiltrados[0].nombre).toBe('Pato');
    });

    test('En caso de buscar un producto inexistente, debe de mandar un mensaje diciendo de la inexistencia del producto. ', async () => {
        const { result } = renderHook(() => useBuscarProductos({ 
            productos: [productoUno]
        }));

        act(() => {
            result.current.setTerminoBusqueda('zapatos deportivos');
        });

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 600));
        });

        expect(result.current.noSeEncontraronProductos).toBe(true);
        expect(result.current.productosFiltrados).toHaveLength(0);
    });

    test('El buscador muestra los producto sin stock con una marca', async () => {
      
        const { result } = renderHook(() => useBuscarProductos({ 
        productos: [productoDos]
      }));

      act(() => {
        result.current.setTerminoBusqueda('vestido');
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      expect(result.current.productosFiltrados[0].nombre).toBe('Vestido');
      expect(result.current.productosFiltrados[0].stock).toBe(2);
    });
    const { getByText } = render(<TarjetaProducto 
        producto={productoDos} 
        onActualizarStock={async () => true}
    />);
    expect(getByText('Bajo Stock')).toBeTruthy();
})