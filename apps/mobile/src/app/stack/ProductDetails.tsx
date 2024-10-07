import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Specifications from "../../components/product/Specifications";
import PurchaseBanner from "../../components/product/PurchaseBanner";
import PriceEstimator from "@/src/components/product/PriceEstimator";
import Colors from "@/src/data/constants/Colors";
import UserReviews from "@/src/components/product/UserReviews";

export default function ProductDetails(props: any) {
  const { product } = props.route.params;
  if (!product) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productInfo}>
        <Text style={styles.titulo}>{product.name}</Text>
        <View style={styles.imagemBackground}>
          <Image
            source={{ uri: product.image }}
            style={styles.imagem}
            alt="Imagem do Produto"
          />
        </View>
        <Specifications product={product} />
      </View>
      <PurchaseBanner product={product} />
      <PriceEstimator product={product} />
      <UserReviews product={product} />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    gap: 10,
    backgroundColor: Colors.BG_PRIMARY,
  },
  productInfo: {
    backgroundColor: Colors.BG_SECONDARY,
    padding: 20,
    gap: 20,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  imagemBackground: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 20,
    height: 230,
  },
  imagem: {
    width: "80%",
    height: "100%",
    borderRadius: 10,
  },
});
