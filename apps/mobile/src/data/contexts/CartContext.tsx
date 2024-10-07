import {
  CalculateInstallment,
  Cart,
  CartItem,
  Installment,
  Product,
} from "@gstore/core";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export interface CartContextProps {
  items: CartItem[];
  itemsQuantity: number;
  fullTotalAmount: number;
  totalAmount: number;
  installment: Installment;
  addItemToCart: (product: Product) => void;
  removeItem: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps>({} as any);

export function CartProvider(props: any) {
  const { saveItem, getItem } = useLocalStorage();
  const [cart, setCart] = useState<Cart>(new Cart());

  function addItemToCart(product: Product) {
    handleCart(cart.addItemToCart(product));
  }

  function removeItem(product: Product) {
    handleCart(cart.decreaseItemQuantity(product));
  }

  function removeProduct(product: Product) {
    handleCart(cart.removeProductFromCart(product));
  }

  function clearCart() {
    handleCart(cart.clearCart());
  }

  function handleCart(cart: Cart) {
    saveItem("cart", cart.items);
    setCart(cart);
  }

  useEffect(() => {
    getItem("cart").then((savedItems: CartItem[]) => {
      if (savedItems) setCart(new Cart(savedItems));
    });
  }, [getItem]);

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        itemsQuantity: cart.itemsQuantity,
        totalAmount: cart.totalAmount,
        fullTotalAmount: cart.fullTotalAmount,
        installment: new CalculateInstallment().execute(cart.totalAmount),
        addItemToCart,
        removeItem,
        removeProduct,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
