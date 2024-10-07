import { Ionicons } from "@expo/vector-icons";
import { Coin, Product } from "@gstore/core";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "@/src/data/constants/Colors";
import useCart from "../../data/hooks/useCart";
import useInstallment from "../../data/hooks/useInstallment";

export interface PurchaseBannerProps {
  product: Product;
}

export default function PurchaseBanner(props: PurchaseBannerProps) {
  const { product } = props;
  const { addItemToCart } = useCart();
  const installment = useInstallment(product.promotional_price);

  return (
    <View style={styles.container}>
      <View style={styles.containerPreco}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            borderRightWidth: 3,
            borderRightColor: Colors.PRIMARY,
          }}
        >
          <Text style={styles.valorCheio}>de R$ {product?.base_price}</Text>
          <View style={styles.precoPromocional}>
            <Text style={styles.valor}>por</Text>
            <Text style={styles.valorDestaque}>
              {Coin.format(product?.promotional_price)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.valor}>
            até {installment.installment_quantity}x de
          </Text>
          <Text style={styles.valor}>
            {Coin.format(installment.installment_price)}
          </Text>
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <Pressable
          onPress={() => addItemToCart(product)}
          style={{ ...styles.botao, backgroundColor: Colors.PRIMARY }}
        >
          <Ionicons style={styles.botaoTexto} name="cart-outline" size={20} />
          <Text style={styles.botaoTexto}>Adicionar</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={{
            ...styles.botao,
            backgroundColor: Colors.SECONDARY,
          }}
        >
          <Ionicons style={styles.botaoTexto} name="card-outline" size={20} />
          <Text style={styles.botaoTexto}>Comprar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    gap: 30,
  },
  containerPreco: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valorCheio: {
    textDecorationLine: "line-through",
    color: "#C4C4C4",
  },
  precoPromocional: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  valor: {
    fontSize: 16,
    color: "white",
  },
  valorDestaque: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.TEXT_HIGHLIGHT_1,
  },
  botao: {
    color: "#FFF",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 9999,
    height: 35,
    paddingHorizontal: 80,
    gap: 8,
  },
  botaoTexto: {
    color: "#FFF",
  },
});
