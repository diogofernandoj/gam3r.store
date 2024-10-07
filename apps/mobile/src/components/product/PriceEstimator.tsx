import { Fontisto, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Product } from "@gstore/core";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/src/data/constants/Colors";

export interface PriceEstimatorProps {
  product: Product;
}

export default function PriceEstimator(props: PriceEstimatorProps) {
  const {
    lower_price: minimum,
    higher_price: maximum,
    promotional_price: current,
    average_price: average,
  } = props.product;

  let percentage;
  if (current > average) {
    percentage = ((current - average) / (maximum - average)) * 50 + 50;
  } else {
    percentage = (1 - (average - current) / (average - minimum)) * 50;
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusPreco}>
        {percentage >= 40 && percentage < 60 ? (
          <Fontisto name="confused" size={40} style={{ color: "#eab308" }} />
        ) : percentage >= 60 ? (
          <Fontisto name="mad" size={40} style={{ color: "#ef4444" }} />
        ) : (
          <Fontisto name="smiley" size={40} style={{ color: "#22c55e" }} />
        )}
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white" }}>O preço do product está </Text>
            <Text
              style={{
                color: Colors.TEXT_HIGHLIGHT_1,
                fontWeight: "bold",
              }}
            >
              {percentage >= 40 && percentage < 60
                ? "na média"
                : percentage >= 60
                  ? "acima da média"
                  : "abaixo da média"}
            </Text>
          </View>
          <Text style={{ color: "white" }}>
            Com base no preço dos últimos 30 dias.
          </Text>
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <LinearGradient
          colors={["#22c55e", "#facc15", "#ef4444"]}
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
          style={styles.barraPreco}
        ></LinearGradient>
        <View style={{ ...styles.posicaoPreco, left: `${percentage}%` }}>
          <Ionicons
            name="chevron-down"
            size={20}
            style={{ color: Colors.TEXT_HIGHLIGHT_1 }}
          />
          <View style={styles.circuloPrecoExterno}>
            <View style={styles.circuloPrecoInterno} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  statusPreco: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barraPreco: {
    position: "relative",
    height: 7,
    borderRadius: 9999,
  },
  posicaoPreco: {
    position: "absolute",
    alignItems: "center",
    top: -25,
  },
  circuloPrecoExterno: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 18,
    width: 18,
    borderRadius: 9999,
  },
  circuloPrecoInterno: {
    backgroundColor: Colors.TEXT_HIGHLIGHT_1,
    height: 13,
    width: 13,
    borderRadius: 9999,
  },
});
