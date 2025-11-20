// src/productos/hooks/useBajoStock.ts
import { useMemo } from 'react';

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  talla: string;
  color: string;
};

// Umbral para considerar bajo stock (ajustable)
const UMBRAL_BAJO_STOCK = 10;

export const useBajoStock = ({ productos }: { productos: Producto[] }) => {
  const productosBajoStock = useMemo(() => {
    return productos.filter(producto => producto.stock <= UMBRAL_BAJO_STOCK);
  }, [productos]);

  const totalBajoStock = productosBajoStock.length;

  return {
    productosBajoStock,
    totalBajoStock,
    umbralBajoStock: UMBRAL_BAJO_STOCK
  };
};