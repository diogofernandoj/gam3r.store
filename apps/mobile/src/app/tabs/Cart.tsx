import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartItem as CartItemModel } from "@gstore/core";
import useCart from "@/src/data/hooks/useCart";
import CheckoutHeader from "@/src/components/checkout/CheckoutHeader";
import EmptyCart from "@/src/components/checkout/cart/EmptyCart";
import CartItem from "../../components/checkout/cart/CartItem";
import Colors from "@/src/data/constants/Colors";

export default function Cart({ navigation }: any) {
  const { items, itemsQuantity, addItemToCart, removeItem, removeProduct } =
    useCart();

  return (
    <SafeAreaView style={styles.container}>
      <CheckoutHeader step="cart" />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, width: "100%" }}
      >
        {items.length === 0 && <EmptyCart />}
        {items.map((item: CartItemModel) => (
          <CartItem
            key={item.product.id}
            item={item}
            addItem={() => addItemToCart(item.product)}
            removeItem={() => removeItem(item.product)}
            removeProduct={() => removeProduct(item.product)}
          />
        ))}
      </ScrollView>
      {itemsQuantity > 0 && (
        <Pressable
          style={styles.botao}
          onPress={() => {
            navigation.navigate("Payment");
          }}
        >
          <Ionicons name="card-outline" size={22} style={styles.botaoTexto} />
          <Text style={styles.botaoTexto}>Continuar</Text>
        </Pressable>
      )}
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
  botao: {
    color: "#FFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    alignSelf: "center",
    borderRadius: 9999,
    height: 40,
    marginVertical: 20,
    paddingHorizontal: 50,
    gap: 8,
  },
  botaoTexto: {
    color: "#FFF",
  },
});
