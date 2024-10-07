import {
  PaymentMethod,
  Status,
  DeliveryOrder,
  Order,
  OrderItem,
} from "@gstore/core";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useCart from "../hooks/useCart";
import useAPI from "../hooks/useAPI";

export interface PaymentContextProps {
  paymentMethod: PaymentMethod;
  delivery: Partial<DeliveryOrder>;
  changePaymentMethod: (paymentMethod: PaymentMethod) => void;
  changeDelivery: (delivery: Partial<DeliveryOrder>) => void;
  finishPurchase: () => void;
}

const PaymentContext = createContext<PaymentContextProps>({} as any);

export function PaymentProvider(props: any) {
  const { httpPost } = useAPI();
  const { items, totalAmount, clearCart } = useCart();
  const { saveItem, getItem } = useLocalStorage();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.PIX
  );
  const [delivery, setDelivery] = useState<Partial<DeliveryOrder>>({});

  function changePaymentMethod(paymentMethod: PaymentMethod) {
    saveItem("paymentMethod", paymentMethod);
    setPaymentMethod(paymentMethod);
  }

  function changeDelivery(delivery: Partial<DeliveryOrder>) {
    saveItem("delivery", delivery);
    setDelivery(delivery);
  }

  async function finishPurchase() {
    const order: Partial<Order> = {
      date: new Date(),
      payment_method: paymentMethod,
      total_amount: totalAmount,
      delivery: delivery as DeliveryOrder,
      status: Status.RECEIVED,
      items: items.map(
        (item) =>
          ({
            product: item.product,
            quantity: item.quantity,
            unit_price: item.product.promotional_price,
          }) as OrderItem
      ),
    };

    await httpPost("/orders", order);
    clearCart();
  }

  useEffect(() => {
    getItem("delivery").then((delivery) => {
      setDelivery(delivery ?? {});
    });
    getItem("payment").then((paymentMethod) => {
      setPaymentMethod(paymentMethod ?? PaymentMethod.PIX);
    });
  }, [getItem]);

  return (
    <PaymentContext.Provider
      value={{
        delivery,
        paymentMethod,
        changeDelivery,
        changePaymentMethod,
        finishPurchase,
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
}

export default PaymentContext;
