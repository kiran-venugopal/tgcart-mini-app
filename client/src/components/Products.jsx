import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import Categories from "./Categories";
import "./products-style.css";
import getFinalPrice from "../utils/getFinalPrice";

export default function Products() {
  const { activeCategory, products, categories, setCategory } =
    useProducts();

  const navigate = useNavigate();

  const shareLink = (product) => {
    Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?text=Hey! Check this incredible deal for ${product.title} at TCart&url=https://dummyjson.com/products/${product.id}`
    );
  };

  const goToProductView = (product) => {
    navigate(`/product/${product.id}`);
    Telegram?.WebApp.HapticFeedback.impactOccurred("medium");
    Telegram.WebApp.BackButton.show();
  };

  return (
    <div className="px-2 fadeIn">
      {import.meta.env.REACT_APP_BACKEND_URL}
      <Categories
        items={categories}
        active={activeCategory}
        onCategoryClick={setCategory}
      />
      <section className="products">
        {products.map((product) => (
          <div key={product.id} className="product-item ">
            <button onClick={() => goToProductView(product)}>
              <img
                className="w-16 h-14 object-cover rounded"
                src={product.thumbnail}
              />
            </button>
            <section className="flex-1">
              <div className="font-medium truncate text-sm">
                {product.title}
              </div>
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
            <section className="w-5">
              <div className="dropdown">
                <button className="p-2 dropbtn">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>

                <div className="dropdown-content text-sm">
                  <button
                    onClick={() => goToProductView(product)}
                    className="w-full gap-2 flex items-center justify-start"
                  >
                    <span className="material-symbols-outlined text-[var(--tg-theme-hint-color)]">
                      shopping_bag
                    </span>
                    <span>Buy</span>{" "}
                  </button>

                  <button
                    onClick={() => shareLink(product)}
                    className="w-full gap-2 flex items-center justify-start"
                  >
                    <span className="material-symbols-outlined text-[var(--tg-theme-hint-color)]">
                      send
                    </span>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}
