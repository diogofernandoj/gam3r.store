import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import useProducts from "@/src/data/hooks/useProducts";
import ProductItem from "../../components/product/ProductItem";

export default function Home({ navigation }: any) {
  const { products } = useProducts();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, width: "100%" }}
      >
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            productSelected={() => {
              navigation.navigate("ProductDetails", { product });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E001D",
    width: "100%",
  },
});
