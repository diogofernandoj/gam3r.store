import { useContext } from "react";
import ContextoProdutos from "../contexts/ProductsContext";

const useProducts = () => useContext(ContextoProdutos);
export default useProducts;
