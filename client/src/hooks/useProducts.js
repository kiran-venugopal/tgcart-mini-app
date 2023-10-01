import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../API/products";

const initialState = {
  products: [],
  categories: [],
  activeCategory: "all",
};

const useProducts = () => {
  const [state, setState] = useState(initialState);
  const { products, categories, activeCategory } = state;

  useEffect(() => {
    getCategories().then((result) => {
      setState((prev) => ({ ...prev, categories: result }));
    });
  }, []);

  useEffect(() => {
    getProducts({ category: activeCategory, limit: 20 }).then((result) => {
      setState((prev) => ({ ...prev, products: result.products }));
    });
  }, [activeCategory]);

  const setCategory = (category) => {
    setState((prev) => ({ ...prev, activeCategory: category }));
  };

  return {
    setCategory,
    products,
    categories,
    activeCategory,
  };
};

export default useProducts;
