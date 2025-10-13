"use client";

import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabaseClient";

type TarjetaProps = {
  pedidoId?: string | number;
  usuario?: { nombre: string };
  fecha_de_emision?: Date | string;
  estado_del_pedio?: string;
  precio?: number;
};

type Pedido = {
  id: string | number;
  fecha_emision: string;
  estado: string;
  total: number;
  usuario: { nombre: string };
};

export default function TarjetaParaVisualizarUnPedidoConSupebase({
  pedidoId,
  usuario,
  fecha_de_emision,
  estado_del_pedio,
  precio,
}: TarjetaProps) {
  const [pedido, setPedido] = useState<Pedido | null>(
    usuario
      ? {
          id: pedidoId ?? "mock-id",
          fecha_emision: fecha_de_emision?.toString() ?? "",
          estado: estado_del_pedio ?? "",
          total: precio ?? 0,
          usuario,
        }
      : null
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pedidoId) return;

    async function cargarPedido() {
      setLoading(true);
      const { data, error } = await supabase
        .from("pedidos")
        .select("id, fecha_emision, estado, total, usuario:usuario_id(nombre)")
        .eq("id", pedidoId)
        .single();

      if (error) {
        console.error(`Error al cargar el pedido con ID ${pedidoId}:`, error);
        setLoading(false);
        return;
      }

      const rawData = data as any;
      setPedido({
        id: rawData.id,
        fecha_emision: rawData.fecha_emision,
        estado: rawData.estado,
        total: rawData.total,
        usuario: Array.isArray(rawData.usuario)
          ? rawData.usuario[0]
          : rawData.usuario,
      });
      setLoading(false);
    }

    cargarPedido();
  }, [pedidoId]);

  if (loading || !pedido) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>
          Cargando pedido con ID: {pedidoId}...
        </Text>
      </View>
    );
  }

  const fechaFormateada = new Date(pedido.fecha_emision).toLocaleDateString(
    "es-ES",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
  const totalFormateado = pedido.total.toFixed(2);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Pedido de {pedido.usuario.nombre}</Text>
        <Text style={styles.subtitle}>
          Fecha de Emisión: {fechaFormateada}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>
          Estado del Pedido: {pedido.estado}
        </Text>
        <Text style={styles.text}>
          Precio del Pedido: ${totalFormateado}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    padding: 12,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 8,
    paddingBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
  },
  body: {
    marginTop: 6,
    gap: 6,
  },
  text: {
    fontSize: 15,
    color: "#374151",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 8,
    color: "#6b7280",
  },
});
