import React from 'react';
import { View } from 'react-native';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Props = {
  nombre_del_encargado: string;
  fecha_de_emision: Date;
  estado_del_pedido: 'completado' | 'en proceso' | 'evaluando';
  precio: number;
};

const TarjetaParaEditarPedido = ({
  nombre_del_encargado,
  fecha_de_emision,
  estado_del_pedido, 
  precio,
}: Props) => {
  // Formato de la fecha
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };
 


  return (
    <Card className="w-full max-w-sm bg-white shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Pedido de {nombre_del_encargado}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Fecha de Emisión: {fecha_de_emision.toLocaleString()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <View className="gap-2">
          <Text className="text-base text-gray-700">
            <Text className="font-semibold">Estado del Pedido: </Text>{' '}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                        <Button variant="outline">
                            <Text>{estado_del_pedido}</Text>
                        </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent insets={contentInsets} sideOffset={2} className="w-56" align="start">

                    <DropdownMenuGroup>

                        <DropdownMenuItem>
                            <Text>completado</Text>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Text>evaluando</Text>
                        </DropdownMenuItem>

                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>            
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
      </CardFooter>
    </Card>
  );
};

export default TarjetaParaEditarPedido;
