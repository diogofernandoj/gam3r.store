import { LinearGradient } from "expo-linear-gradient";
import { Coin, Product } from "@gstore/core";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/data/constants/Colors";
import useCart from "../../data/hooks/useCart";
import RatingReview from "../shared/RatingReview";
import useInstallment from "@/src/data/hooks/useInstallment";

export interface ProductItemProps {
  product: Product;
  productSelected?: (product: Product) => void;
}

export default function ProductItem(props: ProductItemProps) {
  const { addItemToCart } = useCart();
  const installment = useInstallment(props.product.promotional_price);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.product}
        onPress={() => props.productSelected?.(props.product)}
      >
        <Image
          source={{ uri: props.product.image }}
          style={styles.imagem}
          alt="Imagem do Produto"
        />
        <View style={{ flex: 1 }}>
          <View style={styles.reviewContainer}>
            <RatingReview rating={props.product.rating} />
          </View>
          <Text style={styles.nome}>{props.product.name}</Text>
          <Text style={styles.precoCheio}>
            de {Coin.format(props.product.base_price)}
          </Text>
          <View style={styles.precoContainer}>
            <Text style={{ color: "white" }}>por</Text>
            <Text style={styles.preco}>
              {Coin.format(props.product.promotional_price)}
            </Text>
          </View>
          <Text style={styles.installment}>
            ou {installment.installment_quantity}x de{" "}
            {Coin.format(installment.installment_price)}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.botao}
        onPress={(e) => {
          e.preventDefault();
          addItemToCart(props.product);
        }}
      >
        <Ionicons name="cart-outline" size={22} style={styles.botaoTexto} />
        <Text style={styles.botaoTexto}>Adicionar</Text>
      </Pressable>
      <LinearGradient
        colors={["transparent", "#7811F5", "transparent"]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={styles.bordaInferior}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    maxWidth: Dimensions.get("window").width,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagem: {
    width: 150,
    height: 150,
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  precoCheio: {
    fontSize: 14,
    color: "#AAA",
    textDecorationLine: "line-through",
  },
  precoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  preco: {
    fontSize: 24,
    color: "#34d399",
    fontWeight: "bold",
  },
  installment: {
    fontSize: 14,
    color: "#FFF",
  },
  botao: {
    color: "#FFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    alignSelf: "center",
    borderRadius: 9999,
    height: 40,
    paddingHorizontal: 80,
    gap: 8,
  },
  botaoTexto: {
    color: "#FFF",
  },
  bordaInferior: {
    marginTop: 20,
    height: 2,
    width: Dimensions.get("window").width,
  },
});
