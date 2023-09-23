import useProducts from "../hooks/useProducts";
import Categories from "./Categories";
import "./products-style.css";

export default function Products() {
  const { activeCategory, products, categories, getFinalPrice, setCategory } =
    useProducts();

  const shareLink = (product) => {
    Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?text=Hey! Check this incredible deal for ${product.title} at TCart&url=https://dummyjson.com/products/${product.id}`
    );
  };

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
              <div class="dropdown">
                <button className="p-2 dropbtn">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>

                <div class="dropdown-content text-sm">
                  <button className="w-full gap-2 flex items-center justify-start">
                    <span class="material-symbols-outlined text-[var(--tg-theme-hint-color)]">
                      shopping_bag
                    </span>
                    <span>Buy</span>{" "}
                  </button>

                  <button
                    onClick={() => shareLink(product)}
                    className="w-full gap-2 flex items-center justify-start"
                  >
                    <span class="material-symbols-outlined text-[var(--tg-theme-hint-color)]">
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
