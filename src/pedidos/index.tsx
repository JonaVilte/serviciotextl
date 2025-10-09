import React from 'react';
import { View } from 'react-native';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

type Props = {
  nombre_del_encargado: string;
  fecha_de_emision: Date;
  estado_del_pedio: 'completado' | 'en proceso' | 'evaluando';
  precio: number;
};

const TarjetaParaVisualizarUnPedido = ({
  nombre_del_encargado,
  fecha_de_emision,
  estado_del_pedio,
  precio,
}: Props) => {
  // Formato de la fecha
  const fechaFormateada = new Date(fecha_de_emision).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });


  return (
    <Card className="w-full max-w-sm bg-white shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Pedido de {nombre_del_encargado}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Fecha de Emicion: {fechaFormateada}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <View className="gap-2">
          <Text className="text-base text-gray-700">
            <Text className="font-semibold">Estado del Pedido:</Text>{' '}
            <Text className={`capitalize`}>{estado_del_pedio}</Text>
          </Text>
          <Text className="text-base text-gray-700">
            <Text className="font-semibold">Precio del Pedido:</Text> ${precio}
          </Text>
        </View>
      </CardContent>

      <CardFooter className="flex-row justify-end gap-2">
        <Button variant="outline">
          <Text>Ver Detalles</Text>
        </Button>
        <Button>
          <Text>Contactar</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TarjetaParaVisualizarUnPedido;
