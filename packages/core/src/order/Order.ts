import { Status } from "./Status";
import { PaymentMethod } from "./PaymentMethod";
import OrderItem from "./OrderItem";
import DeliveryOrder from "./DeliveryOrder";

export default interface Order {
  id: number;
  date: Date;
  items: OrderItem[];
  total_amount: number;
  status: Status;
  payment_method: PaymentMethod;
  delivery: DeliveryOrder;
}
