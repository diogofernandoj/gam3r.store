import { DeliveryOrder } from "@gstore/core";
import { TextInput, StyleSheet, View } from "react-native";
import React from "react";

export interface DeliveryFormProps {
  delivery: Partial<DeliveryOrder>;
  deliveryChanged: (delivery: Partial<DeliveryOrder>) => void;
  className?: string;
}

export default function DeliveryForm(props: DeliveryFormProps) {
  const { delivery, deliveryChanged } = props;

  function changeAttribute(attribute: string) {
    return (value: any) => {
      deliveryChanged({ ...delivery, [attribute]: value });
    };
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={delivery.name}
        onChangeText={changeAttribute("name")}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={delivery.email}
        onChangeText={changeAttribute("email")}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={delivery.document}
        onChangeText={changeAttribute("document")}
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Logradouro"
        value={delivery.street_address}
        onChangeText={changeAttribute("street_address")}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Complemento"
        value={delivery.complement}
        onChangeText={changeAttribute("complement")}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={delivery.city}
        onChangeText={changeAttribute("city")}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={delivery.state}
        onChangeText={changeAttribute("state")}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  input: {
    height: 40,
    width: 300,
    color: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#241440",
  },
});
