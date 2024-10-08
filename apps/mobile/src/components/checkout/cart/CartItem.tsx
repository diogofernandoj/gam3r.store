import { AntDesign, Ionicons } from "@expo/vector-icons";
import { CartItem as CartItemModel, Coin } from "@gstore/core";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export interface CartItemProps {
  item: CartItemModel;
  addItem: () => void;
  removeItem: () => void;
  removeProduct: () => void;
}

export default function CartItem(props: CartItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.item.product.image }}
        style={styles.imagem}
        alt="Imagem do Produto"
      />
      <View style={styles.produtoInfo}>
        <Text style={styles.nome}>{props.item.product.name}</Text>
        <View style={styles.containerQuantidade}>
          <View style={styles.quantidade}>
            <Pressable
              onPress={props.removeItem}
              style={[styles.botaoQuantidade, styles.botaoMenos]}
            >
              <AntDesign name="minus" size={16} color="#FFF" />
            </Pressable>
            <Text style={styles.quantidadeValor}>{props.item.quantity}</Text>
            <Pressable
              onPress={props.addItem}
              style={[styles.botaoQuantidade, styles.botaoMais]}
            >
              <AntDesign name="plus" size={16} color="#FFF" />
            </Pressable>
          </View>
          <Pressable onPress={props.removeProduct} style={styles.botaoExcluir}>
            <Ionicons name="trash-outline" size={16} color="#ff2777" />
            <Text style={{ color: "#ff2777" }}>Remover</Text>
          </Pressable>
        </View>
        <View style={styles.precoContainer}>
          <Text style={styles.precoCheio}>
            De {Coin.format(props.item.product.base_price)}
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ color: "white" }}>Por</Text>
            <Text style={styles.preco}>
              {Coin.format(props.item.product.promotional_price)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#241440",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    width: 30,
    height: 30,
    backgroundColor: "#333",
    borderRadius: 4,
  },
  imagem: {
    width: 120,
    height: 120,
    marginRight: 15,
  },
  produtoInfo: {
    flex: 1,
    justifyContent: "space-between",
    gap: 6,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  precoCheio: {
    fontSize: 10,
    color: "#AAA",
    textDecorationLine: "line-through",
    marginBottom: 5,
  },
  precoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 4,
  },
  preco: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
  containerQuantidade: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantidade: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 6,
  },
  botaoQuantidade: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderColor: "#FFF",
  },
  botaoMenos: {
    borderRightWidth: 1,
  },
  botaoMais: {
    borderLeftWidth: 1,
  },
  botaoExcluir: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  quantidadeValor: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
