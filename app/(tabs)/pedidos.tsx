"use client"

import { View, StyleSheet, Platform, TouchableOpacity } from "react-native"
import { Text } from "@/components/ui/text"
import { useRouter } from "expo-router"
import ListaDePedidosAdmin from "@/src/pedidos/components/listaDePedidosParaAdm"
import { ArrowLeft } from "lucide-react-native"

const ShinySundayFont = Platform.select({ ios: "System", android: "sans-serif" })

export default function PedidosScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(tabs)")}>
          <ArrowLeft color="#FFFDF6" size={28} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={styles.title}>Gestión de Pedidos</Text>
      </View>

      <ListaDePedidosAdmin />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF6",
  },
  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#059669",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
    elevation: 0,
    shadowColor: "transparent",
  },
  backButton: {
    paddingRight: 10,
    paddingVertical: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFDF6",
    fontFamily: ShinySundayFont,
    flex: 1,
  },
})
