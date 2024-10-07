import Colors from "@/src/data/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Installment, Coin } from "@gstore/core";
import { View, Text, StyleSheet, Pressable } from "react-native";

export interface PaymentOverviewProps {
  itemsQuantity: number;
  totalAmount: number;
  fullTotalAmount: number;
  installment: Installment;
  finishPurchase: () => void;
  className?: string;
}

export default function PaymentOverview(props: PaymentOverviewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.valorItens}>
        <Text style={{ color: "white" }}>
          Valor total ({props.itemsQuantity} itens):{" "}
        </Text>
        <Text style={styles.valorItensDestaque}>
          {Coin.format(props.totalAmount)}
        </Text>
      </View>
      <Pressable style={styles.botao} onPress={() => props.finishPurchase?.()}>
        <Ionicons name="cart-outline" size={22} style={styles.botaoTexto} />
        <Text style={styles.botaoTexto}>Finalizar Compra</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    paddingHorizontal: 60,
    paddingVertical: 20,
    backgroundColor: "#241440",
    borderRadius: 10,
    gap: 10,
  },
  valorItens: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valorItensDestaque: {
    color: "#34d399",
    fontWeight: "bold",
  },
  botao: {
    color: "#FFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 9999,
    height: 40,
    paddingHorizontal: 45,
    gap: 8,
  },
  botaoTexto: {
    color: "#FFF",
  },
});
