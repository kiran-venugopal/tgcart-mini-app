import { useEffect } from "react";
import getFinalPrice from "../utils/getFinalPrice";
import { onMainButtonClick } from "../API/app-events";
import { getInvoiceLink } from "../API/payment";

export default function Checkout({ product, count }) {
  const price = (getFinalPrice(product) * count).toFixed(2);
  const savedAmount = (product.price * count - price).toFixed(2);

  useEffect(() => {
    onMainButtonClick(async () => {
      const body = {
        title: product.title,
        description: product.description,
        amount: parseInt((getFinalPrice(product) * count).toFixed(2)),
      };
      const data = await getInvoiceLink({ body });
      Telegram.WebApp.openInvoice(data.url);
    });
  }, []);

  return (
    <section className="p-4 gap-4 text-center">
      <div className="text-base font-medium">Order Checkout</div>
      <img
        className=" w-40 h-40 block rounded object-cover m-auto my-4"
        src={product.thumbnail}
      />
      <div>{product.title}</div>
      <span className="text-sm text-[var(--tg-theme-hint-color)]">
        {count} item(s)
      </span>

      <div className="my-2">
        <span className="font-medium">
          $ {(getFinalPrice(product) * count).toFixed(2)}
        </span>
        {savedAmount && (
          <div className="text-[var(--tg-theme-button-color)] text-xs p-1">
            You will be saving ${savedAmount} on this order!
          </div>
        )}
      </div>
    </section>
  );
}
