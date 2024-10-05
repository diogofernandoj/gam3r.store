import Product from "./Product";

export default class FilterProducts {
  execute(search: string, products: Product[]): Product[] {
    const words = search.toLowerCase().split(" ");
    return products.filter((product) => {
      const text = `
                ${product.name}
                ${product.description}
                ${Object.values(product.specifications).join(" ")}
                ${product.brand}
            `.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }
}
