import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CheckoutHeaderProps {
  step: "cart" | "payment";
}

export default function CheckoutHeader(props: CheckoutHeaderProps) {
  function renderItem(step: "cart" | "payment", index: number, title: string) {
    return (
      <View style={styles.containerEtapa}>
        <View
          style={
            props.step === step ? styles.circuloAtivo : styles.circuloInativo
          }
        >
          <Text
            style={
              props.step === step
                ? styles.circuloAtivoTexto
                : styles.circuloInativoTexto
            }
          >
            {index}
          </Text>
        </View>
        <Text
          style={props.step === step ? styles.textoAtivo : styles.textoInativo}
        >
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderItem("cart", 1, "Carrinho")}
      <View style={styles.separador} />
      {renderItem("payment", 2, "Pagamento")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  containerEtapa: {
    flexDirection: "row",
    alignItems: "center",
  },
  circuloAtivo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF57A0",
    justifyContent: "center",
    alignItems: "center",
  },
  circuloInativo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  circuloAtivoTexto: {
    color: "white",
    fontSize: 12,
  },
  circuloInativoTexto: {
    color: "#000",
    fontSize: 12,
  },
  textoAtivo: {
    color: "#FF57A0",
    marginLeft: 10,
    fontWeight: "400",
  },
  textoInativo: {
    color: "#888",
    marginLeft: 10,
    fontWeight: "400",
  },
  separador: {
    width: 40,
    height: 1,
    backgroundColor: "#888",
    marginHorizontal: 15,
  },
});
