import { StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import CheckoutHeader from "@/src/components/checkout/CheckoutHeader";
import useCart from "@/src/data/hooks/useCart";
import usePayment from "@/src/data/hooks/usePayment";
import DeliveryForm from "@/src/components/checkout/payment/DeliveryForm";
import PaymentOverview from "@/src/components/checkout/payment/PaymentOverview";
import PaymentMethodSelect from "@/src/components/checkout/payment/PaymentMethodSelect";

export default function Payment() {
  const { installment, itemsQuantity, totalAmount, fullTotalAmount } =
    useCart();
  const {
    delivery,
    paymentMethod,
    changeDelivery,
    changePaymentMethod,
    finishPurchase,
  } = usePayment();

  return (
    <SafeAreaView style={styles.container}>
      <CheckoutHeader step="payment" />
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Text style={styles.titulo}>Forma de Payment</Text>
        <PaymentMethodSelect
          paymentMethod={paymentMethod}
          paymentMethodChanged={changePaymentMethod}
        />

        <Text style={styles.titulo}>Dados da Entrega</Text>
        <DeliveryForm delivery={delivery} deliveryChanged={changeDelivery} />
      </ScrollView>

      <PaymentOverview
        itemsQuantity={itemsQuantity}
        totalAmount={totalAmount}
        fullTotalAmount={fullTotalAmount}
        installment={installment}
        finishPurchase={finishPurchase}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E001D",
  },
  containerScroll: {
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});
