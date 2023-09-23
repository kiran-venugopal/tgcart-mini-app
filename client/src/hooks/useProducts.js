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
    getProducts({ limit: 20 }).then((result) => {
      setState((prev) => ({ ...prev, products: result.products }));
    });
    getCategories().then((result) => {
      setState((prev) => ({ ...prev, categories: result }));
    });
  }, []);

  useEffect(() => {
    getProducts({ category: activeCategory }).then((result) => {
      setState((prev) => ({ ...prev, products: result.products }));
    });
  }, [activeCategory]);

  const setCategory = (category) => {
    setState((prev) => ({ ...prev, activeCategory: category }));
  };

  const getFinalPrice = (product) => {
    const { price, discountPercentage } = product;
    const discount = (price / 100) * discountPercentage;
    return (price - discount).toFixed(2);
  };

  return {
    getFinalPrice,
    setCategory,
    products,
    categories,
    activeCategory,
  };
};

export default useProducts;
