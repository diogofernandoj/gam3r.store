import { Product } from "../product";
import CartItem from "./CartItem";

export default class Cart {
  constructor(readonly items: CartItem[] = []) {}

  addItemToCart(product: Product): Cart {
    const alreadyInCart = this.findProductItem(product);
    if (alreadyInCart) {
      return new Cart(this.updateItemQuantity(this.items, product, 1));
    } else {
      return new Cart([...this.items, { product, quantity: 1 }]);
    }
  }

  decreaseItemQuantity(product: Product) {
    const item = this.findProductItem(product);
    if (!item) return this;

    return new Cart(this.updateItemQuantity(this.items, product, -1));
  }

  removeProductFromCart(product: Product) {
    const item = this.findProductItem(product);
    if (!item) return this;

    return new Cart(
      this.items.filter((item) => item.product.id !== product.id)
    );
  }

  clearCart() {
    return new Cart();
  }

  get itemsQuantity() {
    return this.items.map((item) => item.quantity).reduce((a, b) => a + b, 0);
  }

  get totalAmount() {
    return this.items
      .map((item) => item.product.promotional_price * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  get fullTotalAmount() {
    return this.items
      .map((item) => item.product.base_price * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  private findProductItem(product: Product): CartItem | undefined {
    return this.items.find((item) => item.product.id === product.id);
  }

  private updateItemQuantity(
    items: CartItem[],
    product: Product,
    difference: number
  ): CartItem[] {
    return items
      .map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + difference }
          : i
      )
      .filter((i) => i.quantity > 0);
  }
}
