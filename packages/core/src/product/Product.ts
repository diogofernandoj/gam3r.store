import Pricing from "./Pricing";
import Specifications from "./Specifications";

export default interface Product extends Pricing {
  id: number;
  name: string;
  description: string;
  brand: string;
  model: string;
  image: string;
  rating: number;
  review_video: string;
  tags: string[];
  specifications: Specifications;
}
