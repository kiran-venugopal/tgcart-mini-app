const API_URL = "https://dummyjson.com";

export async function getProducts({ category, ...params }) {
  const search = new URLSearchParams(params);

  const reqUrl =
    category && category !== "all"
      ? `${API_URL}/products/category/${category}?${search.toString()}`
      : `${API_URL}/products?${search.toString()}`;

  const response = await fetch(reqUrl);
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/products/categories`);
  const data = await response.json();
  return ["all", ...data.splice(0, 10)];
}
