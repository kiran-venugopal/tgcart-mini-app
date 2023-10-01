import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../API/products";
import getFinalPrice from "../utils/getFinalPrice";
import Checkout from "./Checkout";

const initialState = {
  isLoading: true,
  product: {},
  count: 1,
  showCheckout: false,
};

export default function ProductView() {
  const { productId } = useParams();
  const [state, setState] = useState(initialState);
  const { isLoading, product, count, showCheckout } = state;
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(productId).then((res) => {
      setState((prev) => ({ ...prev, product: res, isLoading: false }));
    });
    Telegram.WebApp.BackButton.onClick(() => {
      setState((prev) => {
        Telegram.WebApp.MainButton.hide();

        if (prev.showCheckout) {
          return { ...prev, showCheckout: false };
        } else {
          navigate("/");
          Telegram.WebApp.BackButton.hide();
        }
        return prev;
      });
    });
  }, []);

  const images = product.images;

  const addToCount = (value = 1) => {
    setState((prev) => ({
      ...prev,
      count: prev.count + value < 1 ? 1 : prev.count + value,
    }));
    Telegram?.WebApp.HapticFeedback.impactOccurred("medium");
  };

  const handleBuy = () => {
    setState((prev) => ({ ...prev, showCheckout: true }));
    Telegram.WebApp.MainButton.setParams({
      text: `Pay $ ${getFinalPrice(product, count)}`,
    }).show();
    Telegram.WebApp.HapticFeedback.impactOccurred("medium");
  };

  if (isLoading)
    return (
      <div className="fadeIn h-screen w-screen flex items-center justify-center">
        <span className="block animate-pulse material-symbols-outlined text-[var(--tg-theme-hint-color)] text-6xl">
          shopping_bag
        </span>
      </div>
    );

  if (showCheckout) {
    return <Checkout product={product} count={count} />;
  }

  return (
    <div className="m-4">
      <section
        className="carousel relative h-[200px] rounded overflow-hidden"
        aria-label="Gallery"
      >
        <ol className="carousel__viewport overflow-hidden">
          {product.images.map((image, index) => (
            <li
              id={`carousel__slide${index + 1}`}
              tabindex="0"
              style={{ background: `url(${image})` }}
              className="carousel__slide"
            >
              <div className="carousel__snapper"></div>
              <a
                href={`#carousel__slide${index < 1 ? images.length : index}`}
                className="carousel__prev"
              >
                Go to previous slide
              </a>
              <a
                href={`#carousel__slide${
                  index + 2 > images.length ? 1 : index + 2
                }`}
                className="carousel__next"
              >
                Go to next slide
              </a>
            </li>
          ))}
        </ol>
      </section>
      <div className="mt-4 font-medium">{product.title}</div>
      <p className="font-normal text-sm text-[var(--tg-theme-hint-color)] line-clamp-3 mt-1">
        {product.description}
      </p>
      <div className="text-sm flex gap-2 items-center my-2">
        <span className=" opacity-50 line-through">${product.price}</span>
        <span className="text-md">${getFinalPrice(product)}</span>
        <span className=" text-[var(--tg-theme-link-color)] text-xs">
          {Math.ceil(product.discountPercentage)}% off
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex max-w-[100px] flex-row h-10 w-full rounded-lg relative bg-transparent">
          <button
            onClick={() => addToCount(-1)}
            data-action="decrement"
            className=" bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-hint-color) hover:bg-[rgba(255,255,255,0.1)] h-full w-16 rounded-l cursor-pointer outline-none"
          >
            <span className="m-auto text-2xl font-thin">{"-"}</span>
          </button>
          <input
            type="number"
            className="focus:outline-none text-center w-full bg-[var(--tg-theme-secondary-bg-color)] font-semibold text-md  md:text-basecursor-default flex items-cente  outline-none"
            value={count}
          />
          <button
            onClick={() => addToCount(1)}
            data-action="increment"
            className="bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-hint-color) hover:bg-[rgba(255,255,255,0.1)] h-full w-16 rounded-r cursor-pointer"
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>

        <button
          onClick={handleBuy}
          className="text-[var(--tg-theme-button-text-color)] flex items-center gap-2 bg-[var(--tg-theme-button-color)] p-2 px-4 rounded-md font-medium my-2"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
