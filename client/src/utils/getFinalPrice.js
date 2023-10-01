export default function getFinalPrice(product, count = 1) {
  const { price, discountPercentage } = product;
  const discount = (price / 100) * discountPercentage;
  return ((price - discount) * count).toFixed(2);
}
