import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type TarjetaProps = {
  pedidoId: string | number;
};

// Pedido sigue esperando un único objeto de usuario
type Pedido = {
  id: string | number;
  fecha_emision: string;
  estado: string;
  total: number;
  usuario: { nombre: string }; 
};

export default function TarjetaParaVisualizarUnPedidoConSupebase({ pedidoId }: TarjetaProps) {
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    async function cargarPedido() {
      // Consulta de Supabase
      const { data, error } = await supabase
        .from("pedidos")
        .select("id, fecha_emision, estado, total, usuario:usuario_id(nombre)") 
        .eq('id', pedidoId)
        .single();

      if (error) {
        console.error(`Error al cargar el pedido con ID ${pedidoId}:`, error);
        return;
      }
      
      const rawData = data as any; 
      
      setPedido({
        id: rawData.id,
        fecha_emision: rawData.fecha_emision,
        estado: rawData.estado,
        total: rawData.total,
        // Aquí resolvemos el array: Si existe y es un array, tomamos el primer elemento.
        usuario: Array.isArray(rawData.usuario) ? rawData.usuario[0] : rawData.usuario, 
      }); 
    }

    cargarPedido();
  }, [pedidoId]);

  if (!pedido) {
    return (
      <div style={{ padding: 15, margin: 10, backgroundColor: '#333', color: '#fff', borderRadius: 8 }}>
        Cargando pedido con ID: {pedidoId}...
      </div>
    );
  }

  const fechaFormateada = new Date(pedido.fecha_emision).toLocaleDateString('es-ES', { 
      day: '2-digit', month: '2-digit', year: 'numeric' 
  });
  const totalFormateado = pedido.total.toFixed(2);

  return (
    <div style={{ 
      padding: 15, 
      margin: 10, 
      border: '1px solid #555', 
      borderRadius: 8, 
      backgroundColor: '#282c34', 
      color: 'white' 
    }}>
      
      <h2>Pedido #{pedido.id}</h2>
      
      <p>Encargado: <strong>{pedido.usuario.nombre}</strong></p>
      <p>Fecha de Emisión: {fechaFormateada}</p>
      <p>
        Estado: 
        <span style={{ fontWeight: 'bold', color: pedido.estado === 'completado' ? '#4CAF50' : '#FFC107', marginLeft: 5 }}>
          {pedido.estado.toUpperCase()}
        </span>
      </p>
      <p>Total: <strong>${totalFormateado}</strong></p>
    </div>
  );
}