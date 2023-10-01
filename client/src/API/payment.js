const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const getInvoiceLink = async ({ body }) => {
  const response = await fetch(`${BACKEND_URL}/invoice-link`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
