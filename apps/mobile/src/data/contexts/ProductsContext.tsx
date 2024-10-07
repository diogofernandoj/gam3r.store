import { createContext, useCallback, useEffect, useState } from "react";
import { FilterProducts, Product } from "@gstore/core";
import useAPI from "../hooks/useAPI";

export interface ProductsContextProps {
  products: Product[];
  search: string;
  setSearch: (search: string) => void;
  productById: (id: number) => Product | null;
}

const ProductsContext = createContext<ProductsContextProps>({} as any);

export function ProductsProvider(props: any) {
  const { httpGet } = useAPI();
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = useCallback(async () => {
    const products = await httpGet("/products");
    setProducts(Array.isArray(products) ? products : []);
  }, [httpGet]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <ProductsContext.Provider
      value={{
        search,
        get products() {
          if (!search) return products;
          return new FilterProducts().execute(search, products);
        },
        setSearch,
        productById: (id: number) =>
          products.find((product) => product.id === id) ?? null,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}

export default ProductsContext;
