import useProducts from "../hooks/useProducts";
import Categories from "./Categories";
import "./products-style.css";

export default function Products() {
  const { activeCategory, products, categories, getFinalPrice, setCategory } =
    useProducts();

  return (
    <div className="px-2 ">
      <Categories
        items={categories}
        active={activeCategory}
        onCategoryClick={setCategory}
      />
      <section className="products">
        {products.map((product) => (
          <div key={product.id} className="product-item ">
            <img
              className="w-16 h-14 object-cover rounded"
              src={product.thumbnail}
            />
            <section>
              <div className="font-medium truncate">{product.title}</div>
              <div className="text-sm flex gap-2 items-center">
                <span className=" opacity-50 line-through">
                  ${product.price}
                </span>
                <span>${getFinalPrice(product)}</span>
                <span className=" text-[var(--tg-theme-link-color)] text-xs">
                  {Math.ceil(product.discountPercentage)}% off
                </span>
              </div>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}
