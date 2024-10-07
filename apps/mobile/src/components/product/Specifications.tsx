import Colors from "@/src/data/constants/Colors";
import { Product } from "@gstore/core";
import { View, Text, StyleSheet } from "react-native";

export interface SpecificationsProps {
  product: Product;
}

export default function Specifications(props: SpecificationsProps) {
  const { product } = props;

  return (
    <View style={styles.container}>
      {product?.specifications &&
        Object.keys(product?.specifications!)
          .filter((k) => k !== "highlight")
          .map((key) => (
            <View key={key} style={styles.especificacao}>
              <Text style={styles.nome}>{key}</Text>
              <Text style={styles.valor}>{product?.specifications[key]}</Text>
            </View>
          ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  especificacao: {
    flexDirection: "row",
    gap: 10,
  },
  nome: {
    color: "white",
    width: "35%",
    backgroundColor: Colors.PRIMARY,
    padding: 8,
    borderRadius: 6,
  },
  valor: {
    flex: 1,
    color: "white",
    backgroundColor: Colors.PRIMARY,
    padding: 8,
    borderRadius: 6,
  },
});
